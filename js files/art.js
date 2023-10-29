const width = 800;
const height = 800;
let orbits = null; // Declare orbits with let

const svg = d3.select("#orbit-map")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`);

// Add a tooltip element to the document
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Define a color scale for the orbits
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// Add event listener to the "Load Asteroids Art" button
const loadDataButton = document.getElementById("loadData");
loadDataButton.addEventListener("click", loadAsteroidsArt);

function loadAsteroidsArt() {
    const dateInput = document.getElementById('dateInput').value;
    const apiKey = "GoeMBuuZBNwxjErw8AJfbweuUpRIxqesP2PevTZu";
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}&date=${dateInput}`;

    // Fetch asteroid data for the selected date
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const asteroids = data.near_earth_objects;
            renderAsteroidOrbits(asteroids);
        })
        .catch(error => console.error("Error fetching data:", error.message)); // Log the error message
}

function renderAsteroidOrbits(asteroids) {
    if (!orbits) {
        // If the "orbits" group doesn't exist, create it
        orbits = svg.append("g").attr("class", "orbits");
    } else {
        // If it already exists, remove previous orbits
        orbits.selectAll("circle").remove();
    }

    // Define a scale for mapping close approach distances to the size of the orbits
    const scale = d3.scaleLinear()
        .domain([0, d3.max(asteroids, d => d.close_approach_data[0].miss_distance.kilometers)])
        .range([10, width / 2]);

    const asteroidOrbits = orbits.selectAll("circle")
        .data(asteroids)
        .enter()
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", d => scale(d.close_approach_data[0].miss_distance.kilometers))
        .attr("fill", "none")
        .attr("stroke", (d, i) => colorScale(i)) // Assign different colors based on index
        .attr("stroke-opacity", 0.3)
        .attr("stroke-width", 4) // Adjust the stroke width here
        .on("mouseover", function (event, d) {
            // Display the tooltip with asteroid information
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html(
                "Name: " + d.name + "<br>" +
                "Diameter: " + d.estimated_diameter.kilometers.estimated_diameter_max + " kilometers<br>" +
                "Distance from Earth: " + d.close_approach_data[0].miss_distance.kilometers + " kilometers"
            )
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            // Hide the tooltip when not hovering
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
}

// Add your CSS styling for the tooltip in your HTML and CSS files.

