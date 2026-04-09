// login button event handler
document.getElementById("btn-login").addEventListener("click", function (e) {
  e.preventDefault();
  // console.log('login button clicked');

  const mobileNumber = 12345678910; // num can't start with 0
  const pinNumber = 1234;

  const mobileNumField = document.getElementById("mobile-num").value;
  const pinNumField = document.getElementById("pin-num").value;

  const mobileNumConverted = parseInt(mobileNumField);
  const pinNumConverted = parseInt(pinNumField);

  if (mobileNumConverted === mobileNumber && pinNumConverted === pinNumber) {
    console.log("login successful");
    window.location.href = "home.html";
  } else {
    console.log("invalid user");
  }
});
