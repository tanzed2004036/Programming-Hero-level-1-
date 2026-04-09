console.log("Hello from home.js");

// transaction history data
// const transactions = [];


// store transactions data in localStorage and get it from there
const storedData = localStorage.getItem("transactions");
const transactions = storedData ? JSON.parse(storedData) : [];

// function to get number value
function getNumberValue(id) {
  const value = document.getElementById(id).value;
  const valueConverted = parseInt(value);
  return valueConverted;
}

// add money button event handler
document
  .getElementById("add-money-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    console.log("add money button clicked");

    const selectedBank = document.getElementById("selected-bank").value; // <option value="">BRAC Bank</option> ❌  👉 এটা দিলে .value নিলে empty আসবে
    const bankAccNum = document.getElementById("bank-acc").value;
    const amountToAdd = document.getElementById("amount").value;
    const pinNum = parseInt(document.getElementById("pin").value);

    const ammountToAddConverted = parseInt(amountToAdd);

    console.log(selectedBank, bankAccNum, amountToAdd, pinNum);

    if (bankAccNum.length !== 11) {
      alert("Bank account number must be 11 digit");
      return;
    }
    if (pinNum !== 1234) {
      alert("Invalid pin number");
      return;
    }
    if (isNaN(ammountToAddConverted) || ammountToAddConverted <= 0) {
      alert("Please enter a valid amount to add");
      return;
    }
    if (selectedBank === "Select A Bank") {
      alert("Please select a bank");
      return;
    }
    const availableBalance = parseInt(
      document.getElementById("main-balance").innerText,
    );
    const TotalBalance = availableBalance + ammountToAddConverted;
    document.getElementById("main-balance").innerText = TotalBalance;

    const transaction = {
      type: "Add Money",
      date: new Date().toLocaleString(),
    };
    transactions.push(transaction);

    console.log(transactions);
    alert("Money added successfully!");

    // save to localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));
  });

// cashout button event handler
document.getElementById("cashout-btn").addEventListener("click", function (e) {
  e.preventDefault();
  console.log("cashout button clicked");
  const cashoutAmount = getNumberValue("cashout-amount");
  const cashoutPin = parseInt(document.getElementById("cashout-pin").value);
  const availableBalance = parseInt(
    document.getElementById("main-balance").innerText,
  );
  if (cashoutPin !== 1234) {
    alert("Invalid pin number");
    return;
  }

  if (isNaN(cashoutAmount) || cashoutAmount <= 0) {
    alert("Please enter a valid amount to cashout");
    return;
  }
  if (cashoutAmount > availableBalance) {
    alert("Insufficient balance");
    return;
  }
  const remainingBalance = availableBalance - cashoutAmount;
  document.getElementById("main-balance").innerText = remainingBalance;

  const transaction = {
    type: "Cashout",
    date: new Date().toLocaleString(),
  };
  transactions.push(transaction);

  console.log(transactions);

  alert("Cashout successful!");

  // save to localStorage
localStorage.setItem("transactions", JSON.stringify(transactions));
});

// transfer money button event handler
document
  .getElementById("transfer-money-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    console.log("transfer money button clicked");

    const bankAccNum = document.getElementById("transfer-bank-acc").value;
    const amountToTransfer = document.getElementById("transfer-amount").value;
    const pinNum = parseInt(document.getElementById("transfer-pin").value);

    const amountToTransferConverted = parseInt(amountToTransfer);

    if (bankAccNum.length !== 11) {
      alert("Bank account number must be 11 digit");
      return;
    }
    if (pinNum !== 1234) {
      alert("Invalid pin number");
      return;
    }
    if (isNaN(amountToTransferConverted) || amountToTransferConverted <= 0) {
      alert("Please enter a valid amount to transfer");
      return;
    }

    const availableBalance = parseInt(
      document.getElementById("main-balance").innerText,
    );
    const TotalBalance = availableBalance - amountToTransferConverted;
    document.getElementById("main-balance").innerText = TotalBalance;

    const transaction = {
      type: "Transfer Money",
      date: new Date().toLocaleString(),
    };
    transactions.push(transaction);
    console.log(transactions);
    alert("Money transferred successfully!");

    // save to localStorage
localStorage.setItem("transactions", JSON.stringify(transactions));
  });

// get bonus button event handler
document
  .getElementById("get-bonus-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    console.log("get bonus button clicked");

    const bonusCoupon = document.getElementById("bonus-coupon").value;

    if (bonusCoupon === "tanzed") {
      const availableBalance = parseInt(
        document.getElementById("main-balance").innerText,
      );
      const TotalBalance = availableBalance + 100;
      document.getElementById("main-balance").innerText = TotalBalance;
      alert("Congratulations! You have received 100 BDT as bonus.");

      const transaction = {
        type: "Get Bonus",
        date: new Date().toLocaleString(),
      };
      transactions.push(transaction);
    } else {
      alert("Invalid bonus coupon");
    }

    // save to localStorage
localStorage.setItem("transactions", JSON.stringify(transactions));
  });

// pay bill button event handler

document.getElementById("pay-bill-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const selectedBank = document.getElementById("pay-bill-bank").value; // <option value="">BRAC Bank</option> ❌  👉 এটা দিলে .value নিলে empty আসবে
  const bankAccNum = document.getElementById("pay-bill-acc").value;
  console.log("pay bill button clicked");
  const payBillAmount = getNumberValue("pay-bill-amount");
  const payBillPin = parseInt(document.getElementById("pay-bill-pin").value);
  const availableBalance = parseInt(
    document.getElementById("main-balance").innerText,
  );
  if (payBillPin !== 1234) {
    alert("Invalid pin number");
    return;
  }

  if (isNaN(payBillAmount) || payBillAmount <= 0) {
    alert("Please enter a valid amount to pay bill");
    return;
  }
  if (payBillAmount > availableBalance) {
    alert("Insufficient balance");
    return;
  }
  if (bankAccNum.length !== 11) {
    alert("Bank account number must be 11 digit");
    return;
  }
  if (selectedBank === "Select A Bank") {
    alert("Please select a bank");
    return;
  }
  const remainingBalance = availableBalance - payBillAmount;
  document.getElementById("main-balance").innerText = remainingBalance;

  const transaction = {
    type: "Pay Bill",
    date: new Date().toLocaleString(),
  };
  transactions.push(transaction);
  alert("Bill paid successfully!");

  console.log(transactions);

  // save to localStorage
localStorage.setItem("transactions", JSON.stringify(transactions));
});

// transactions list event handler
document
  .getElementById("transactions-grid")
  .addEventListener("click", function (e) {
    const transactionsList = document.getElementById("transactions-list");
    transactionsList.innerHTML = "";                                        // nahole click korle duplicate hoye jabe karon protibar click korle transactions array er data gula abar abar loop hobe and div create hobe

    for (transaction of transactions) {
      const div = document.createElement("div");
      div.innerHTML = ` 
          <div class="flex justify-between items-center bg-white rounded-md p-3 ">
            <div class="flex items-center">
              <div class="border p-2 rounded-full bg-gray-200 ml-2">
                <img src="payoo-resources/assets/opt-1.png" alt="" />
              </div>
              <div class="ml-3">
                <h2 class="text-xs font-bold">${transaction.type}</h2>
                <p class="text-xs text-gray-600">${transaction.date}</p>
              </div>
            </div>
             <i class="fa-solid fa-ellipsis rotate-90"></i>
          </div>` 
          ;
      transactionsList.appendChild(div);
    }
  });


// recent transactions list event handler
function renderTransactions() {
    const transactionsList = document.getElementById("recent-transactions-list");
    transactionsList.innerHTML = "";                                     // nahole click korle duplicate hoye jabe karon protibar click korle transactions array er data gula abar abar loop hobe and div create hobe

    const lastFive = transactions.slice(-5).reverse();

    for (transaction of lastFive) {
      const div = document.createElement("div");
      div.innerHTML = ` 
          <div class="flex justify-between items-center bg-white rounded-md p-3 ">
            <div class="flex items-center">
              <div class="border p-2 rounded-full bg-gray-200 ml-2">
                <img src="payoo-resources/assets/opt-1.png" alt="" />
              </div>
              <div class="ml-3">
                <h2 class="text-xs font-bold">${transaction.type}</h2>
                <p class="text-xs text-gray-600">${transaction.date}</p>
              </div>
            </div>
             <i class="fa-solid fa-ellipsis rotate-90"></i>
          </div>` 
          ;
      transactionsList.appendChild(div);
    }
  };

renderTransactions();    // call the function to render transactions on page load











// ---------------------------   grid button toggle event handler        ----------------------------------

function toggleSection(sectionId) {
  const formBtns = document.getElementsByClassName("form-btn");
  for (formBtn of formBtns) {
    formBtn.classList.remove("bg-blue-100", "border-red-500");
    formBtn.classList.add("border-gray-400");
  }
  document.getElementById(sectionId).classList.remove("border-gray-400");
  document
    .getElementById(sectionId)
    .classList.add("bg-blue-100", "border-red-500");
}

function hideAllSections() {
  document.getElementById("add-money-div").style.display = "none";
  document.getElementById("cashout-div").style.display = "none";
  document.getElementById("transfer-money-div").style.display = "none";
  document.getElementById("get-bonus-div").style.display = "none";
  document.getElementById("pay-bill-div").style.display = "none";
  document.getElementById("transactions-div").style.display = "none";
  document.getElementById("recent-transactions-div").style.display = "none";
}

document
  .getElementById("add-money-grid")
  .addEventListener("click", function (e) {
    // e.preventDefault(); lagbe na karon div er click event e default behavior nei

    // method -1
    console.log("add money grid button clicked");
    document.getElementById("add-money-div").style.display = "block";
    document.getElementById("cashout-div").style.display = "none";
    document.getElementById("transfer-money-div").style.display = "none";
    document.getElementById("get-bonus-div").style.display = "none";
    document.getElementById("pay-bill-div").style.display = "none";
    document.getElementById("transactions-div").style.display = "none";
    document.getElementById("recent-transactions-div").style.display = "none";

    toggleSection("add-money-grid");
  });

document.getElementById("cashout-grid").addEventListener("click", function (e) {
  console.log("cashout grid button clicked");

  // method-2
  const forms = document.getElementsByClassName("form");

  for (form of forms) {
    form.style.display = "none";
  }
  document.getElementById("cashout-div").style.display = "block";

  toggleSection("cashout-grid");
});

document
  .getElementById("transfer-money-grid")
  .addEventListener("click", function (e) {
    console.log("transfer money grid button clicked");

    // method-3
    hideAllSections();
    document.getElementById("transfer-money-div").style.display = "block";

    toggleSection("transfer-money-grid");
  });

document
  .getElementById("get-bonus-grid")
  .addEventListener("click", function (e) {
    console.log("get bonus grid button clicked");
    const forms = document.getElementsByClassName("form");

    for (form of forms) {
      form.style.display = "none";
    }
    document.getElementById("get-bonus-div").style.display = "block";

    toggleSection("get-bonus-grid");
  });

document
  .getElementById("pay-bill-grid")
  .addEventListener("click", function (e) {
    console.log("pay bill grid button clicked");
    hideAllSections();
    document.getElementById("pay-bill-div").style.display = "block";

    toggleSection("pay-bill-grid");
  });

document
  .getElementById("transactions-grid")
  .addEventListener("click", function (e) {
    console.log("transactions grid button clicked");
    hideAllSections();
    document.getElementById("transactions-div").style.display = "block";

    toggleSection("transactions-grid");
  });

  document
  .getElementById("recent-transactions-grid")
  .addEventListener("click", function (e) {
    console.log("recent transactions grid button clicked");
    hideAllSections();
    document.getElementById("recent-transactions-div").style.display = "block";

    toggleSection("recent-transactions-grid");
  });