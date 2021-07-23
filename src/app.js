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
  let key1 = [];
  let key2 = [];
  let key3 = [];

  // Push symbols, fullName and imageurl to arrays
  for (let n of data.Data) {
    let coinName = n.CoinInfo.Name;
    let fullName = n.CoinInfo.FullName;
    let imageUrl = n.DISPLAY.USD.IMAGEURL;
    let price = n.DISPLAY.USD.PRICE;
    key.push(coinName);
    key1.push(fullName);
    key2.push(imageUrl);
    key3.push(price);
  }

  // console.log(key, key1, key2, key3)

  // Default key[0] onload
  if (btn.event === "click") {
    const sb = document.querySelector("#symbol");
    var symbol = key[sb.selectedIndex];
    var fullName = key1[sb.selectedIndex];
    var img = "https://www.cryptocompare.com" + key2[sb.selectedIndex];
    var price = key3[sb.selectedIndex];
  } else {
    var symbol = key[0];
    var fullName = key1[0];
    var img = "https://www.cryptocompare.com" + key2[0];
    var price = key3[0]
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

  document.getElementById("price").innerHTML = price;
  document.getElementById("fullName").innerHTML = fullName;
  document.querySelector("img").alt = fullName;
  document.querySelector("img").src = img;
  console.log(symbol + price)
};

// Button
const btn = document.querySelector("#btn");
btn.onclick = (event) => {
  event.preventDefault();
  btn.event = "click";
  return request();
};
