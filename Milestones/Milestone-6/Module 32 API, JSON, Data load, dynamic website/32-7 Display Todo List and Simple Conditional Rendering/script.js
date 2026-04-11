   const loadData = () => {
    const URL = 'https://jsonplaceholder.typicode.com/todos';
    fetch(URL)      
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        displayData(data);    // receive a array of objects
    })  
}

const displayData = (posts) => {


    // get todo section
    const todolist = document.getElementById('todo-section');
    todolist.innerHTML = '';                              // clear the list before adding new items nahole duplicate hoye jabe
    posts.forEach((data)=> {
        const todocard = document.createElement('div');
        todocard.innerHTML = `
            <div class="post-card max-w-[450px] border mx-auto p-4 rounded-lg shadow-md">
            <h3 class="text-lg font-bold text-red-500">${data.title}</h3>
            <p>${data.completed ? `'Completed <i class="fa-solid fa-square-check"></i>'` : `'Not Completed'<i class="fa-regular fa-square"></i>`}</p>
            </div>
            `
        todolist.appendChild(todocard);
        console.log(data);
    })       
}