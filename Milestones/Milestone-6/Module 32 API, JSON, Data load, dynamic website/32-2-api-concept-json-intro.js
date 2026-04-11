// 🌐 API কি?

// 👉 API হলো data আনার/নেওয়ার bridge
// 👉 frontend ↔ backend communication

// 📦 JSON কি?

// 👉 data store/transfer করার format
// 👉 string আকারে থাকে

// ==========================
// 1. API CONCEPT
// ==========================

// API = Application Programming Interface
// এক system থেকে অন্য system এ data নেওয়ার মাধ্যম

// Example: fetch দিয়ে API call

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// ==========================
// 2. JSON INTRO
// ==========================

// JSON = JavaScript Object Notation
// data exchange format (string format)

const jsonData = `{
  "name": "Rahim",
  "age": 20,
  "email": "rahim@example.com"
}`;

// JSON → Object
const obj = JSON.parse(jsonData);
console.log(obj)
console.log(obj.name);

const object = {
  name: "Rahim",
  age: 20,
  email: "rahim@example.com",
  CITY: "Dhaka",
  pass: true,
  friends: ["Karim", "Sakib", "Jahid"],
};

// Object → JSON
const newJson = JSON.stringify(object);
console.log(newJson);
