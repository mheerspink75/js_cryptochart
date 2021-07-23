
// Fetch url
const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200 || !res.ok) {
    throw new Error();
  }
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

  // Create the line chart
  Highcharts.stockChart("container", {
    chart: {
      backgroundColor: "white",
      type: "area",
    },
    title: {
      text: `<h1 id="chart-title">${symbol.value}/USD</h1>`,
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
  })
};

export default fetchData;
