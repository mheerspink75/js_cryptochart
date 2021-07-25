//Prepare data and render the chart
const chart = (symbol, price) => {
  fetch(
    "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" +
      symbol +
      "&tsym=USD&limit=400"
  )
    .then((res) => res.json())
    .then((data) => {
      let arr = [];
      // Prepare Data
      for (const key of data.Data.Data) {
        let data = [key.time * 1000, key.close];
        arr.push(data);
      }
      // Create the line chart
      Highcharts.stockChart("container", {
        chart: {
          backgroundColor: "white",
          type: "area",
        },
        title: {
          text: `<h1 id="chart-title">${symbol}/USD  ${price}</h1>`,
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
            name: symbol,
            data: arr,
            tooltip: {
              valueDecimals: 2,
            },
          },
        ],
      });
    }).catch(err => console.log("Error!", err))
};

export default chart