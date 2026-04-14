// Generates Math.random() * 100 → ceil → saves to localStorage
function setNumberToLS() {
  const number = Math.ceil(Math.random() * 100); // range: 1–100
  console.log(number);
  localStorage.setItem("vault_number", number);
  return number;
}

// Reads the stored number back from localStorage
function getNumberFromLS() {
  const raw = localStorage.getItem("vault_number");
  console.log(raw);
  return raw !== null ? Number(raw) : null; // returns null if nothing stored yet
}

function setObjectToLS() {
  const obj = {
    id: Math.ceil(Math.random() * 100),
    name: "John Doe",
    age: 25,
  };
  //   localStorage.setItem('vault_object', obj);  // eta dile  	[object Object] hisebe thakbe
  console.log(obj);
  localStorage.setItem('vault_object',JSON.stringify(obj));
  console.log(JSON.stringify(obj));
}


function getObjectFromLS() {
  const value = localStorage.getItem('vault_object');             //RETURN '{"id":42,"name":"John Doe","age":25}'
   console.log(value)
  const obj = JSON.parse(value);
  console.log(obj)
}

// localStorage শুধু string store করতে পারে।
// যখন সরাসরি object দিলে:
// localStorage.setItem('vault_object', obj);
// JavaScript automatically obj.toString() call করে,
// আর যেকোনো plain object এর toString() রিটার্ন করে [object Object]
// এটা actual data না, শুধু একটা default string representation।

// তাই JSON.stringify() ব্যবহার করতে হয়:
// localStorage.setItem('vault_object', JSON.stringify(obj)); // ✅ actual data save হবে

// এটা object কে proper JSON string এ convert করে:
// '{"id":42,"name":"John Doe","age":25}'

// আর পড়ার সময় JSON.parse() দিয়ে আবার object এ ফিরিয়ে আনতে হয়:
// const obj = JSON.parse(localStorage.getItem('vault_object')); // ✅ object ফেরত পাবে

// সহজ মনে রাখার উপায়:
// Object → LS  =  JSON.stringify()
// LS → Object  =  JSON.parse()
