import fetchData from "./chart.js";

// Render chart onload
window.onload = () => {
  return request();
};

// Request
const request = async () => {
  // Fetch  Top20 Coins by MKTCAP
  let response = await fetch(
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
  );
  let data = await response.json();

  let key = [];

  // Push symbols to key array
  for (let n of data.Data) {
    let coinName = n.CoinInfo.Name;
    key.push(coinName);
  }

  // Default key[0] onload
  if (btn.event === "click") {
    const sb = document.querySelector("#symbol");
    var symbol = key[sb.selectedIndex];
  } else {
    var symbol = key[0];
  }

  // Populate select options
  for (let index of key) {
    if (btn.event !== "click") {
      const ds = document.querySelector("#symbol");
      const op = document.createElement("option");
      op.value = index;
      op.innerHTML = index;
      ds.appendChild(op);
    }
  }

  // Time-Series data
  let dataUrl =
    "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" +
    symbol +
    "&tsym=USD&limit=400";

  // Send Time-Series to chart
  fetchData(dataUrl).catch((err) => {
    console.log("Error!", err.message);
    document.getElementById("app").innerHTML = "Error!: " + err.message;
  });
};

// Button
const btn = document.querySelector("#btn");
btn.onclick = (event) => {
  event.preventDefault();
  btn.event = "click";
  return request();
};