const API = "http://webapi19sa-1.course.tamk.cloud/v1/weather";
const lastFiftyAPI =
  "http://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50";
const tempTwentyAPI =
  "http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature";
const winSpdTwentyAPI =
  "http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed";

  console.log("Toimii");
async function fetchAPI() {
  try {
    const response = await fetch(API);
    const apiData = await response.json();
    console.log(apiData);
  } catch (error) {
    console.log(error);
  }
}

async function fetchLastfifty() {
  try {
    const response = await fetch(lastFiftyAPI);
    const apiData = await response.json();
    console.log(apiData);
  } catch (error) {
    console.log(error);
  }
}

async function fetchTempTwenty(table) {
  try {
    const response = await fetch(tempTwentyAPI);
    const apiData = await response.json();

    // Extract the temperature values from the API data
    const temperatures = apiData.slice(-20).map((data) => data.temperature);
    const times = apiData.slice(-20).map((data) => data.date_time);
    console.log(temperatures);

    // Create the Chart.js chart
    const canvas = document.getElementById("myChart");
    const chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: [...Array(20).keys()].map((i) => `Reading ${i + 1}`),
        datasets: [
          {
            label: "Temperature",
            data: temperatures,
            backgroundColor: "cyan",
            borderColor: "cyan",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    // Create the table of information
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    tableHead.innerHTML =
      '<tr><th scope="col">#</th><th scope="col">Time</th><th scope="col">Temperature</th></tr>';
    tableBody.innerHTML = "";
    for (let i = 1; i < times.length; i++) {
      const t = times[i];
      const c = temperatures[i];
      const cellElement = document.createElement("tr");
      cellElement.innerHTML =
        '<td scope="row">' +
        i +
        "</td><td>" +
        convertTime(t) +
        "</td><td>" +
        c +
        " °C" +
        "</td>";
      tableBody.appendChild(cellElement);
    }
  } catch (error) {
    console.log(error);
  }
}
// Conditional call for the function - could've done it inside
// the code block, but this seemed to bring more clarity to code
if (window.location.pathname === "/temperature.html") {
  window.addEventListener(
    "load",
    fetchTempTwenty(document.querySelector("table"))
  );
}

async function fetchWinSpdTwenty(table) {
  try {
    const response = await fetch(winSpdTwentyAPI);
    const apiData = await response.json();

    // Extract the temperature values from the API data
    const windspeeds = apiData.slice(-20).map((data) => data.wind_speed);
    const times = apiData.slice(-20).map((data) => data.date_time);

    // Create the Chart.js chart
    const canvas = document.getElementById("myChart");
    const chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: [...Array(20).keys()].map((i) => `Reading ${i + 1}`),
        datasets: [
          {
            label: "Windspeed",
            data: windspeeds,
            backgroundColor: "cyan",
            borderColor: "cyan",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    // Create the table of information
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    tableHead.innerHTML =
      '<tr><th scope="col">#</th><th scope="col">Time</th><th scope="col">Windspeed</th></tr>';
    tableBody.innerHTML = "";
    for (let i = 1; i < times.length; i++) {
      const t = times[i];
      const c = windspeeds[i];
      const cellElement = document.createElement("tr");
      cellElement.innerHTML =
        '<td scope="row">' +
        i +
        "</td><td>" +
        convertTime(t) +
        "</td><td>" +
        c +
        " m/s" +
        "</td>";
      tableBody.appendChild(cellElement);
    }
  } catch (error) {
    console.log(error);
  }
}
if (window.location.pathname === "/windspeed.html") {
  window.addEventListener(
    "load",
    fetchWinSpdTwenty(document.querySelector("table"))
  );
}

// This was formulated by chatGPT,
// however i took the time to somewhat understand
// what this function stands for.
function convertTime(time) {
  const date = new Date(time);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}  /  ${day}.${month}.${year}  `;
  return formattedTime;
}

function autoRefresh() {
  window.location = window.location.href;
}
setInterval("autoRefresh()", 500000);
