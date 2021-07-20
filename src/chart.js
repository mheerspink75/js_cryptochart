// Fetch url
const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200 || !res.ok) {
    throw new Error();
  }
  chart(data);
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
      type: "line",
      height: "520px"
    },

    title: {
      text: `<h1 id="chart-title">${symbol.value}</h1>`,
      align: "left",
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
};

export default fetchData;
