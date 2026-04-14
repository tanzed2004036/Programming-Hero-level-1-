  console.log(1);
  console.log(2);
  
 setTimeout(()=>{
      console.log(3);
 }, 2000);
  

  console.log(4);
  console.log(5);


// setInterval কী?
// নির্দিষ্ট সময় পরপর বারবার কোনো কাজ করে! 🔄

//   clearInterval কী?
// setInterval কে থামিয়ে দেয়! 🛑




  // প্রতি 1 সেকেন্ডে একবার চলবে
const intervalId = setInterval(() => {
  console.log("I am running! 🔄");
}, 1000);

// 5 সেকেন্ড পরে interval থামিয়ে দাও
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Stopped! 🛑");
}, 5000);





// Real Life example countdown

let seconds = 10;

console.log("⏳ Countdown start!");

const timer = setInterval(() => {
  console.log(`${seconds} second remain...`);
  seconds--;

  if (seconds < 0) {
    clearInterval(timer);
    console.log("🚀 Time out!");
  }
}, 1000);

// Output:
// ⏳ Countdown শুরু!
// 10 সেকেন্ড বাকি...
// 9 সেকেন্ড বাকি...
// ...
// 0 সেকেন্ড বাকি...
// 🚀 সময় শেষ!