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
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';                              // clear the list before adding new items nahole duplicate hoye jabe
    for(let i=0 ; i<posts.length; i++) {

        const li = document.createElement('li');
        li.innerText = posts[i].title;
        postList.appendChild(li);
        
        console.log(posts[i].title);
    }
}