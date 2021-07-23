import { all_the_coins } from "./cc.js";

//console.log(all_the_coins)

// Fetch url
const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200 || !res.ok) {
    throw new Error();
  }
  let fullName = all_the_coins.Data[symbol.value].CoinName;
  let description = all_the_coins.Data[symbol.value].Description;

  document.getElementById("fullName").innerHTML = fullName;
  document.getElementById("description").innerHTML = description;
  return chart(data);
};

//Prepare data and render the chart
const chart = (data) => {
  let arr = [];
  // Prepare Data
  for (const key of data.Data.Data) {
    let data = [key.time * 1000, key.close];
    arr.push(data);
  }

  // Get current price and image
  let priceUrl =
    "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
    `${symbol.value}` +
    "&tsyms=USD";

  fetch(priceUrl)
    .then((response) => response.json())
    .then((data) => {
      let price = data.DISPLAY[symbol.value].USD.PRICE;
      let img =
        "https://www.cryptocompare.com" +
        data.DISPLAY[symbol.value].USD.IMAGEURL;

      document.querySelector("img").src = img;
      document.querySelector("img").alt = fullName;

      // Create the line chart
      Highcharts.stockChart("container", {
        chart: {
          backgroundColor: "white",
          type: "area",
        },
        title: {
          text: `<h1 id="chart-title">${symbol.value}/USD  ${price}</h1>`,
          align: "left",
        },
        plotOptions: {
          series: {
            fillColor: {
              linearGradient: [0, 0, 0, 300],
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [
                  1,
                  Highcharts.color(Highcharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get("rgba"),
                ],
              ],
            },
          },
        },
        series: [
          {
            name: symbol.value,
            data: arr,
            tooltip: {
              valueDecimals: 2,
            },
          },
        ],
      });
    })
    .catch((err) => console.log(err.message));
};

export default fetchData;
