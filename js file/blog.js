const cardData = [
    {
        heading: 'close reading',
        body: 'overview on data visualisation',
        link: 'blogs/blogone.html'
    },
    {
        heading: 'critical reflection',
        body: 'on ui and ux',
        link: 'blogs/blogtwo.html'
    },

]

{/* <div class="card">
         <h1 class="card-head">card heading</h1>
         <p class="card-body">
           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
           architecto fugiat ex ea aspernatur officia vitae, aperiam porro
           aliquam minus provident. Temporibus nisi veniam nihil ut vel sed
           provident quae.
        </p>
        <a href="#"></a>
</div> */}

const postContainer = document.querySelector('.blog-card-con');

const postMethods = ()=>{
    cardData.map((postData)=>{
        const postElement = document.createElement('div');
        postElement.classList.add('card');
        postElement.innerHTML = `
        <h3 class = "card-head">${postData.heading}</h3>
        <p class="card-body">${postData.body}</p>
        <a href="${postData.link}" target="_self">read more...</a>
        `
        postContainer.appendChild(postElement)
    })
}
postMethods()