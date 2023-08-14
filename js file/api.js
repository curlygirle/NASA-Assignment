const url = `https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=GoeMBuuZBNwxjErw8AJfbweuUpRIxqesP2PevTZu`;


async function getAsteroid(){
    try{
        const response = await fetch(url);
        if(!response.ok) {
            throw Error();
        }

        const data = await response.json();
        console.log(data);}
        catch (error){
            console.warn(error);
        }
    }

getAsteroid();