let transactions = [];
let transaction;
let myChart;
const request = window.indexedDB.open("budget", 1);
var offline;
let db;
let pendingStore;
let nameE1;
let amountEl;
//create schema
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  //create object store w/ listID keypath that can be queried on
  pendingStore = db.createObjectStore("pending", { autoIncrement: true });
  // create status index we can query on
  pendingStore.createIndex("statusIndex", "status");
}

request.onsuccess = (event) => {
  db = event.target.result;

}

fetch("/api/transaction")
  .then(response => {
    return response.json();
  })
  .then(data => {
    // save db data on global variable
    transactions = data;

    populateTotal();
    populateTable();
    populateChart();
  });

function populateTotal() {
  // reduce transaction amounts to a single total value
  let total = transactions.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);

  let totalEl = document.querySelector("#total");
  totalEl.textContent = total;
}

function populateTable() {
  let tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";

  transactions.forEach(transaction => {
    // create and populate a table row
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${transaction.name}</td>
      <td>${transaction.value}</td>
    `;

    tbody.appendChild(tr);
  });
}

function populateChart() {
  // copy array and reverse it
  let reversed = transactions.slice().reverse();
  let sum = 0;

  // create date labels for chart
  let labels = reversed.map(t => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });

  // create incremental values for chart
  let data = reversed.map(t => {
    sum += parseInt(t.value);
    return sum;
  });

  // remove old chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  let ctx = document.getElementById("myChart").getContext("2d");

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: "Total Over Time",
        fill: true,
        backgroundColor: "#6666ff",
        data
      }]
    }
  });
}

function isWindowOffline() {
  window.addEventListener('offline', function (e) {

    console.log('Connection is down.');
    offline = true;

    console.log("offline: " + offline);
  }, false);
}

function sendTransaction(isAdding, offline) {
  nameEl = document.querySelector("#t-name");
  amountEl = document.querySelector("#t-amount");
  errorEl = document.querySelector(".form .error");

  // validate form
  if (nameEl.value === "" || amountEl.value === "") {
    errorEl.textContent = "Missing Information";
    return;
  }
  else {
    errorEl.textContent = "";
  }

  // create record
  transaction = {
    name: nameEl.value,
    value: amountEl.value,
    date: new Date().toISOString()
  };

  // if subtracting funds, convert amount to negative number
  if (!isAdding) {
    transaction.value *= -1;
  }
  // add to beginning of current array of data
  transactions.unshift(transaction);

  // re-run logic to populate ui with new record
  populateChart();
  populateTable();
  populateTotal();

  isWindowOffline();
  console.log("offline: " + offline);
  if (offline === false) {
    // also send to server
    fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.errors) {
          errorEl.textContent = "Missing Information";
        }
        else {
          // clear form
          nameEl.value = "";
          amountEl.value = "";
        }
      })
      .catch(err => {
        // fetch failed, so save in indexed db
        saveRecord(transaction);

        // clear form
        nameEl.value = "";
        amountEl.value = "";
      });
  }
}

function saveRecord(X) {
  // open transaction accesses budget objectStore and status index

  console.log("save record function");
  const trans = db.transaction(["pending"], "readwrite");
  const pendingStore = trans.objectStore("pending");
  pendingStore.add(X);

}

function accessData() {
  // open transaction accesses budget objectStore and status index

  const trans = db.transaction(["pending"], "readwrite");
  const pendingStore = trans.objectStore("pending");
  const getRequestAll = pendingStore.getAll();
  getRequestAll.onsuccess = () => {
    const storedValues = getRequestAll.result;
    if (storedValues.length > 0) {
      // send to server
      fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(storedValues),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.errors) {
            errorEl.textContent = "Missing Information";
          }
          else {
            // clear form
            nameEl.value = "";
            amountEl.value = "";
          }
        })
        .catch(err => {
          // fetch failed, so save in indexed db
          saveRecord(transaction);

          // clear form
          nameEl.value = "";
          amountEl.value = "";
        });
    }
    deleteData();
  }

}

function deleteData() {
    console.log("delete function");
    const transactionDB = db.transaction(["pending"], "readwrite");
    const pendingStore = transactionDB.objectStore("pending");
    pendingStore.clear();
    console.log("deleted indexed data");
 
}


window.addEventListener('online', function (e) {
  console.log('And we\'re back :).');
  offline = false;
  console.log("offline: " + offline);
  accessData();
}, false);


document.querySelector("#add-btn").onclick = function () {
  console.log("add button")
  isWindowOffline();
  sendTransaction(true, offline);
  if (offline == true) {
    saveRecord(transaction);
  }
};

document.querySelector("#sub-btn").onclick = function () {
  console.log("sub button")
  isWindowOffline();
  sendTransaction(false, offline);
  if (offline == true) {
    saveRecord(transaction);
  }
};