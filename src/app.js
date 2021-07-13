let symbol = "BTC"

let dataUrl =
  "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" + symbol + "&tsym=USD&limit=400";

let arr = [];

const fetchData = async () => {
  const res = await fetch(dataUrl);
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error();
  }
  return data;
};

fetchData().then(data => {
  console.log(data);
  for (const key of data.Data.Data) {
    let data = [key.time *1000, key.close];
    arr.push(data)
  }
  console.log(arr)
  
    // Create the line chart
    Highcharts.stockChart("container", {
      chart: {
        backgroundColor: "white",
        type: "line",
      },

      title: {
        text: symbol,
        align: "left"
      },

      series: [
        {
          name: "BTC",
          data: arr,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    });
})
.catch((err) => {
  console.log("Error!", err.message);
  document.getElementById("app").innerHTML = "Error!: " + err.message;
});