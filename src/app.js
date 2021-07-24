import fetchData from "./chart.js";

// Render chart onload
window.onload = () => {
  return request();
};

// Request
const request = async () => {
  // Fetch  Top20 Coins by MKTCAP
  let response = await fetch(
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD"
  );
  let data = await response.json();

  // Prepare data
  let key = [];

  for (let n of data.Data) {
    let [x, y] = [n.CoinInfo, n.DISPLAY.USD];
    let [{ Name, FullName }, { PRICE, IMAGEURL }] = [x, y];
    let z = [Name, FullName, PRICE, IMAGEURL];
    key.push(z);
  }

  // Default key[0] onload || key[sb.selectedIndex] onclick
  if (btn.event === "click") {
    const sb = document.querySelector("#symbol");
    const c = key[sb.selectedIndex];
    var [symbol, fullName, price, img] = [
      c[0],
      c[1],
      c[2],
      "https://www.cryptocompare.com" + c[3],
    ];
    let chars = price.split("");
    if (chars[chars.length - 2] === "." && chars[4] === ",") {
      var price = price + "0";
    }
  } else {
    let d = key[0];
    var [symbol, fullName, price, img] = [
      d[0],
      d[1],
      d[2],
      "https://www.cryptocompare.com" + d[3],
    ];
    let chars = price.split("");
    if (chars[chars.length - 2] === "." && chars[4] === ",") {
      var price = price + "0";
    }
  }

  // Populate select options elements
  for (let i of key) {
    if (btn.event !== "click") {
      const ds = document.querySelector("#symbol");
      const op = document.createElement("option");
      op.value = i[0];
      op.innerHTML = i[0];
      ds.appendChild(op);
    }
  }

  // Time-Series data
  let dataUrl =
    "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" +
    symbol +
    "&tsym=USD&limit=400";

  // Time-Series data to chart.js
  fetchData(dataUrl).catch((err) => {
    console.log("Error!", err.message);
    document.getElementById("app").innerHTML = "Error!: " + err.message;
  });

  // Update Elements
  document.getElementById("price").innerHTML = price;
  document.getElementById("fullName").innerHTML = fullName;
  document.querySelector("img").alt = fullName;
  document.querySelector("img").src = img;
};

// Button
const btn = document.querySelector("#btn");
btn.onclick = (event) => {
  event.preventDefault();
  btn.event = "click";
  return request();
};
