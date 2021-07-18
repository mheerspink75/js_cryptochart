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
let symbol = key[0];
let dataUrl =
  "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" +
  symbol +
  "&tsym=USD&limit=400";
fetchData(dataUrl);

// Create drop down list
let dd = `<div id="dropdown">
            <select id="symbol"></select>
            <button id="btn">Submit</button>
        </div>`;

let app = document.querySelector("#app");
let div = document.createElement("div");
div.innerHTML = dd;
app.append(div);

// Update drop down list with symbol keys
for (let index of key) {
let ds = document.querySelector("#symbol");
let op = document.createElement('option')
op.innerHTML =  `<option value="${index}">${index}</option>`;
ds.append(op);
};

// Render new chart with list selection button click
const btn = document.querySelector("#btn");
const sb = document.querySelector("#symbol");

btn.onclick = (event) => {
  event.preventDefault();
  let symbol = key[sb.selectedIndex];
  let dataUrl =
    "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" +
    symbol +
    "&tsym=USD&limit=400";
  fetchData(dataUrl);
};