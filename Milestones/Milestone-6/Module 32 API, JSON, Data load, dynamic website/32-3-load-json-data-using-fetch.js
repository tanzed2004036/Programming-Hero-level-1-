// ==========================
// 1. FETCH JSON DATA
// ==========================

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json()) // JSON convert
  .then(data => console.log(data))   // data use  👉 data হবে একটা array of objects (100টা post)
  .catch(error => console.log(error));


// ==========================
// 2. FUNCTION STYLE
// ==========================

function loadData() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => console.log(data));
}

loadData();


// ==========================
// 3. USING ASYNC/AWAIT (BEST 🔥)
// ==========================

async function loadUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

loadUsers();






// 🌐 fetch() কি?

// 👉 API থেকে data আনার function  👉 fetch() হলো JavaScript এর built-in function, যেটা server/API থেকে data আনে 🌐

// 🔄 Steps:
// fetch(url) → request পাঠায়
// .json() → JSON → object বানায়
// .then(data) → data ব্যবহার




// 🔥 Important:

// 👉 fetch() always promise return করে
// 👉 তাই .then() বা async/await লাগে



// 🔄 ভিতরে কী হয়?
// 🥇 Step 1: Request পাঠায়
// fetch(url)
// ➡️ server এ request পাঠায়
// 🥈 Step 2: Promise return করে
// 👉 fetch() সাথে সাথে data দেয় না
// 👉 এটা Promise return করে
// 🥉 Step 3: Response আসে
// 👉 server response দেয়
// 👉 কিন্তু এটা raw format (readable না)
// 🏅 Step 4: JSON এ convert
// res.json()
// 👉 JSON → JavaScript object বানায়
// 🎯 Step 5: Data use
// .then(data => console.log(data))
// 👉 এখন usable data পাওয়া যায়