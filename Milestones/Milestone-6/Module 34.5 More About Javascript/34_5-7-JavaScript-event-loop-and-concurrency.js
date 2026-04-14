// ## JavaScript Event Loop & Concurrency


// ### আগে জানো — JS কেমন?

// > JavaScript হলো **Single Threaded** — মানে একসাথে **একটাই কাজ** করতে পারে!
// > কিন্তু তবুও অনেক কাজ একসাথে হয় — এটা সম্ভব হয় **Event Loop** এর কারণে! 🔄


// ### JS Engine এর ৪টি অংশ:

// ┌─────────────────────────────────────┐
// │           Call Stack                │  ← কোড এখানে চলে
// ├─────────────────────────────────────┤
// │           Web APIs                  │  ← setTimeout, fetch এখানে যায়
// ├─────────────────────────────────────┤
// │           Callback Queue            │  ← কাজ শেষে এখানে অপেক্ষা করে
// ├─────────────────────────────────────┤
// │           Event Loop                │  ← Stack খালি হলে Queue থেকে আনে
// └─────────────────────────────────────┘
// ```


// ### উদাহরণ দিয়ে বুঝি:

console.log("1️⃣ শুরু");

setTimeout(() => {
  console.log("3️⃣ setTimeout");
}, 0);

console.log("2️⃣ শেষ");

// Output:
// 1️⃣ শুরু
// 2️⃣ শেষ
// 3️⃣ setTimeout   ← 0 সেকেন্ড হলেও সবার পরে!


// > ⚠️ `setTimeout(0)` দিলেও সবার **পরে** চলে — কারণ এটা Web API তে যায়!

// ---

// ### ধাপে ধাপে কী হয়:

// ```
// ১. console.log("শুরু")     → Call Stack এ যায়, print হয়, বের হয়
// ২. setTimeout(fn, 0)       → Web API তে যায়
// ３. console.log("শেষ")     → Call Stack এ যায়, print হয়, বের হয়
// ৪. Call Stack এখন খালি    → Event Loop দেখে
// ৫. Callback Queue থেকে fn → Call Stack এ আসে, print হয়


// ### Microtask vs Macrotask:

console.log("1️⃣ Start");

setTimeout(() => {
  console.log("4️⃣ setTimeout"); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log("3️⃣ Promise");    // Microtask
});

console.log("2️⃣ End");

// Output:
// 1️⃣ Start
// 2️⃣ End
// 3️⃣ Promise      ← আগে! (Microtask)
// 4️⃣ setTimeout   ← পরে! (Macrotask)
// ```

// ---

// ### Priority Order:

// ```
// ১ম → Call Stack       (সাধারণ কোড)
// ২য় → Microtask Queue  (Promise, queueMicrotask)
// ৩য় → Macrotask Queue  (setTimeout, setInterval, fetch)
// ```

// ---

// ### Real Life তুলনা:

// | JS অংশ | Real Life |
// |--------|-----------|
// | Call Stack | রেস্তোরাঁর রান্নাঘর — একটা একটা করে রান্না |
// | Web APIs | ওয়েটার — অর্ডার নিয়ে অপেক্ষা করে |
// | Callback Queue | অর্ডার ready হলে লাইনে দাঁড়ায় |
// | Event Loop | ম্যানেজার — রান্নাঘর ফাঁকা হলে পরের অর্ডার পাঠায় |

// ---

// ### Concurrency মানে কী?


// একসাথে অনেক কাজ চলছে মনে হয়!
async function main() {
  const [users, products, orders] = await Promise.all([
    fetch("/api/users"),      // একসাথে শুরু ✅
    fetch("/api/products"),   // একসাথে শুরু ✅
    fetch("/api/orders"),     // একসাথে শুরু ✅
  ]);

  console.log("সব data পাওয়া গেছে!");
}


// > 💡 JS আসলে একটাই কাজ করে, কিন্তু **Event Loop** এর কারণে মনে হয় সব একসাথে চলছে!

// ---

// ### মূল কথা:

// | বিষয় | মানে |
// |-------|------|
// | Single Threaded | একসাথে একটাই কাজ |
// | Event Loop | Call Stack খালি হলে Queue থেকে কাজ আনে |
// | Microtask | Promise → সবার আগে চলে |
// | Macrotask | setTimeout → সবার পরে চলে |
// | Concurrency | Event Loop এর কারণে একসাথে মনে হয় |

