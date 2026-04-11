const loadData = () => {
    const URL = 'https://jsonplaceholder.typicode.com/posts';
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        displayData(data);    // receive a array of objects
    })  
}



const displayData = (posts) => {
    // posts.forEach((data)=> {
    //     console.log(data);
    // })


    // get the pot list ul
    const postList = document.getElementById('post-container');
    postList.innerHTML = '';                              // clear the list before adding new items nahole duplicate hoye jabe
    for(let i=0 ; i<posts.length; i++) {

        const postCard = document.createElement('div');
        // postCard.innerHTML = `
        //     <h3 class="text-lg font-bold text-red-500">${posts[i].title}</h3>
        //     <p>${posts[i].body}</p>
        // `
        // postCard.classList.add('post-card', 'max-w-[450px]', 'border', 'mx-auto', 'p-4', 'rounded-lg', 'shadow-md');

        postCard.innerHTML = `
        <div class="post-card max-w-[450px] border mx-auto p-4 rounded-lg shadow-md">
                <h1 class="text-lg font-bold text-red-500">${posts[i].title}</h1>
                <p>${posts[i].body}</p>
        </div>
        `
        postList.appendChild(postCard);
        
        console.log(posts[i].title);
    }
}