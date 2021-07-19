import fetchData from "./chart.js";

const key = [
  "BTC",
  "ETH",
  "USDT",
  "BNB",
  "ADA",
  "XRP",
  "DOGE",
  "USDC",
  "DOT",
  "UNI",
  "BUSD",
  "BCH",
  "SOL",
  "LTC",
  "LINK",
];

// Render chart on page load
window.onload = () => {
  document.body.style.opacity = 1;
  let symbol = key[0];
  let dataUrl =
    "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" +
    symbol +
    "&tsym=USD&limit=400";

  fetchData(dataUrl).catch((err) => {
    console.log("Error!", err.message);
    document.getElementById("app").innerHTML = "Error!: " + err.message;
  });
};

// Update drop down list with symbol keys
for (let index of key) {
  let ds = document.querySelector("#symbol");
  let op = document.createElement("option");
  op.innerHTML = `<option value="${index}">${index}</option>`;
  ds.append(op);
}

// Render new chart with dropdown selection button click
const btn = document.querySelector("#btn");
const sb = document.querySelector("#symbol");

btn.onclick = (event) => {
  event.preventDefault();
  let symbol = key[sb.selectedIndex];
  let dataUrl =
    "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" +
    symbol +
    "&tsym=USD&limit=400";

  fetchData(dataUrl).catch((err) => {
    console.log("Error!", err.message);
    document.getElementById("app").innerHTML = "Error!: " + err.message;
  });
};
