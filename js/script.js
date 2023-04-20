console.log("javascript filepath succesful");

// const API = "http://webapi19sa-1.course.tamk.cloud/v1/weather";
const lastFiftyAPI =
  "http://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50";
const tempTwentyAPI =
  "http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature";
const winSpdTwentyAPI =
  "http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed";

// async function fetchAPI() {
//   try {
//     const response = await fetch(API);
//     const apiData = await response.json();
//     console.log(apiData);
//   } catch (error) {
//     console.log(error);
//   }
// }

async function fetchLastfifty(table) {
  try {
    const response = await fetch(lastFiftyAPI);
    const apiData = await response.json();

    // Extract the types, values and time from API
    // Types and values were in nested object, unlike the individual
    // value holders, like temperature or windspeed
    // so i iterated through all of the objects called "data"
    // and pushed them to an array created outside of the function scope
    const times = apiData.slice(-50).map((data) => data.date_time);
    const dataArr = [];
    apiData.forEach(function (obj) {
      for ([type, value] of Object.entries(obj.data)) {
        dataArr.push({ type, value });
      }
    });

    // Create the table of information
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    tableHead.innerHTML =
      '<tr><th scope="col">#</th><th scope="col">Time & Date</th><th scope="col">Type</th><th scope="col">Value</th></tr>';
    tableBody.innerHTML = "";
    for (let i = 1; i < times.length; i++) {
      const t = times[i];
      const type = dataArr[i].type;
      const value = dataArr[i].value;
      const cellElement = document.createElement("tr");
      cellElement.innerHTML =
        '<td scope="row">' +
        i +
        "</td><td>" +
        convertTime(t) +
        "</td><td>" +
        type +
        "</td><td>" +
        value +
        "</td>";
      tableBody.appendChild(cellElement);
    }
  } catch (error) {
    console.log(error);
  }
}
// Conditional call for the function - event listener calls
// function directly if the filepath returns true
if (window.location.href.endsWith("/last50readings.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    fetchLastfifty(document.querySelector("table"));
  });
}

async function fetchTempTwenty(table) {
  try {
    const response = await fetch(tempTwentyAPI);
    const apiData = await response.json();

    // Extract the temperature values from the API data
    const temperatures = apiData.slice(-20).map((data) => data.temperature);
    const times = apiData.slice(-20).map((data) => data.date_time);

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
      '<tr><th scope="col">#</th><th scope="col">Time & Date</th><th scope="col">Temperature</th></tr>';
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

    // Statistic- variables to point html elements,
    // then assigning values to them by external function
    // Would have done other js- file specifically for statistics,
    // but these are easy to implement so i will keep them in main script
    const temperaturesArr = roundToOneDecimal(temperatures);
    const meanElement = document.getElementById("mean");
    const modeElement = document.getElementById("mode");
    const medianElement = document.getElementById("median");
    meanElement.innerHTML = getMean(temperaturesArr) + "°C";
    modeElement.innerHTML = getMode(temperaturesArr) + "°C";
    medianElement.innerHTML = getMedian(temperaturesArr) + "°C";
  } catch (error) {
    console.log(error);
  }
}
// Conditional call for the function - could've done it inside
// the code block, but this seemed to bring more clarity to code
if (window.location.href.endsWith("/temperature.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    fetchTempTwenty(document.querySelector("table"));
  });
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
      '<tr><th scope="col">#</th><th scope="col">Time & Date</th><th scope="col">Windspeed</th></tr>';
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

    // Statistic- variables to point html elements,
    // then assigning values to them by external function
    // Would have done other js- file specifically for statistics,
    // but these are easy to implement so i will keep them in main script
    const windspeedsArr = roundToOneDecimal(windspeeds);
    const meanElement = document.getElementById("mean");
    const modeElement = document.getElementById("mode");
    const medianElement = document.getElementById("median");
    meanElement.innerHTML = getMean(windspeedsArr) + " m/s";
    modeElement.innerHTML = getMode(windspeedsArr) + " m/s";
    medianElement.innerHTML = getMedian(windspeedsArr) + " m/s";
  } catch (error) {
    console.log(error);
  }
}
if (window.location.href.endsWith("/windspeed.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    fetchWinSpdTwenty(document.querySelector("table"));
  });
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

// Median- function
function getMedian(arr) {
  const sortedArr = arr.sort((a, b) => a - b);
  const mid = Math.floor(sortedArr.length / 2);

  if (sortedArr.length % 2 === 0) {
    outcome = (sortedArr[mid - 1] + sortedArr[mid]) / 2
    return outcome.toFixed(1);
  } else {
    return sortedArr[mid].toFixed(1);
  }
}

// Mode- function
function getMode(arr) {
  let mode = 0;
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    let currentCount = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === arr[i]) {
        currentCount++;
      }
    }
    if (currentCount > count) {
      mode = arr[i];
      count = currentCount;
    }
  }

  return mode.toFixed(1);
}

// Mean- function
function getMean(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  let outcome = sum / arr.length;
  return outcome.toFixed(1);
}

// Function that converts string objects to numbers, and
// also rounds them for statistical calculations
function roundToOneDecimal(numbers) {
  const roundedNumbers = [];
  for (let i = 0; i < numbers.length; i++) {
    const number = parseFloat(numbers[i]);
    const rounded = number.toFixed(1);
    roundedNumbers.push(parseFloat(rounded));
  }
  return roundedNumbers;
}

// Refresh- function for the website
function autoRefresh() {
  window.location = window.location.href;
}
setInterval("autoRefresh()", 500000);

// Function for gsap text animation - windspeed, temperature.html
function animatedText() {
  let tl = gsap.timeline({ repeat: -1 });
  tl.to("h1", 30, { backgroundPosition: "-960px 0" });
}
document.addEventListener("DOMContentLoaded", function () {
  animatedText();
});

