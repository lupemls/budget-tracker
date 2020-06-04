let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore("budget", { autoIncrement: true });
};

request.onerror = (event) => {
  console.log(`:( Error ${event.target.errorCode}`);
};

function saveRecord(record) {
  const transaction = db.transaction(["budget"], "readwrite");
  const store = transaction.objectStore("budget");

  store.add(record);
}

request.onsuccess = (event) =>{
  db = event.target.result;

  // if app is online, it will read from database
  if (navigator.onLine) {
    checkDatabase();
  }
};

const checkDatabase = () => {
  const transaction = db.transaction(["budget"], "readwrite");
  const store = transaction.objectStore("budget");
  const getAll = store.getAll();

  getAll.onsuccess = () => {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(() => {
          // clear records if it works
          clear();
        });
    }
  };
}

const clear = () => {
  const transaction = db.transaction(["budget"], "readwrite");
  const store = transaction.objectStore("budget");
  store.clear();
}

// listen for when the app goes back on the line
window.addEventListener("online", checkDatabase);