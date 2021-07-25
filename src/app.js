import chart from "./chart.js"

const baseurl = "https://www.cryptocompare.com"
const urls = [
  "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD",
];

// Fetch urls
const getData = async () => {
  let arr = [];
  const links = urls.map((url) => fetch(url));
  for await (let request of links) {
    const data = await request.json();
    if (request.status !== 200 || !request.ok) {
      throw new Error();
    }
    arr.push(data);
  }
  let top = arr[0].Data
  request(top)
};

// Request
const request = async (top) => {
  // Prepare data
  let key = [];

  for (let n of top) {
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
      baseurl + c[3],
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
      baseurl + d[3],
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

  // Update Elements
  document.getElementById("price").innerHTML = price;
  document.getElementById("fullName").innerHTML = fullName;
  document.querySelector("img").alt = fullName;
  document.querySelector("img").src = img;
  return chart(symbol, price)
};

// Button
const btn = document.querySelector("#btn");
btn.onclick = (event) => {
  event.preventDefault();
  btn.event = "click";
  return getData().catch((err) => {
    console.log("Error!", err.message);
    document.getElementById("app").innerHTML = "Error!: " + err.message;
  });
};

// Render chart onload
window.onload = () => {
  return getData().catch((err) => {
    console.log("Error!", err.message);
    document.getElementById("app").innerHTML = "Error!: " + err.message;
  });
};