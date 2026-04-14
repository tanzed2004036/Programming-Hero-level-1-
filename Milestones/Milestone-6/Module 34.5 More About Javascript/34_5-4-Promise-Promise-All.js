// ## Promise এর কাজ কী?

// Promise হলো JavaScript এ **asynchronous কাজ** handle করার একটি উপায়।

// ---

// ### সহজ ভাষায় বলতে গেলে:

// > ধরো তুমি একটা **দোকানে অর্ডার** দিলে। দোকানদার বললো —
// > *"এখন দিতে পারবো না, একটু পরে দেবো।"*
// > এই **"একটু পরে দেবো"** কথাটাই হলো Promise! ✅

// ---

// ### Promise এর ৩টি অবস্থা:

// | অবস্থা | মানে |
// |--------|------|
// | `Pending` | কাজ এখনো চলছে ⏳ |
// | `Fulfilled` | কাজ সফল হয়েছে ✅ |
// | `Rejected` | কাজ ব্যর্থ হয়েছে ❌ |

// ---

// ### Promise কেন দরকার?

// - **Server থেকে data আনতে** (API call)
// - **File পড়তে বা লিখতে**
// - **Database এ query করতে**
// - **Timer বা delay** দিতে






const getData1 = new Promise((resolve, reject) => {
  const random = Math.random() * 10;

  if (random > 5) {
    resolve(`✅ Resolved! Value: ${random}`);
  } else {
    reject(`❌ Rejected! Value: ${random}`);
  }
});

getData1
  .then((result) => console.log(result))
  .catch((error) => console.log(error));


// Multiple Promise Handle করার উপায়

// ১. Promise.all() — সবগুলো একসাথে চালাও
const p1 = new Promise((resolve) => setTimeout(() => resolve("Data 1"), 1000));
const p2 = new Promise((resolve) => setTimeout(() => resolve("Data 2"), 2000));
const p3 = new Promise((resolve) => setTimeout(() => resolve("Data 3"), 3000));

Promise.all([p1, p2, p3])
  .then((results) => console.log(results)) // ["Data 1", "Data 2", "Data 3"]
  .catch((error) => console.log(error));   // যেকোনো একটা fail হলে catch এ যাবে
//   ⚠️ যদি একটাও fail হয় → সাথে সাথে catch এ চলে যাবে

// ২. Promise.allSettled() — সবার result পাও
const pp1 = Promise.resolve("✅ Success");
const pp2 = Promise.reject("❌ Failed");
const pp3 = Promise.resolve("✅ Success 2");

Promise.allSettled([pp1, pp2, pp3])
  .then((results) => {
    results.forEach((result) => console.log(result));
  });

// ✅ কেউ fail হলেও সবার result পাবে
// Output:
// { status: "fulfilled", value: "✅ Success" }
// { status: "rejected", reason: "❌ Failed" }
// { status: "fulfilled", value: "✅ Success 2" }




// ### তুলনা এক নজরে:

// | Method | কাজ | একটা fail হলে |
// |--------|-----|---------------|
// | `Promise.all()` | সবার result একসাথে | সাথে সাথে fail |
// | `Promise.allSettled()` | সবার result পাও | তবুও চলবে |
// | `Promise.race()` | সবার আগে যে শেষ হয় | fail হলেও |
// | `Promise.any()` | সবার আগে যে success হয় | ignore করে |
