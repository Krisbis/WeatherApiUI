const API =
  "https://api.open-meteo.com/v1/metno?latitude=61.50&longitude=23.79&hourly=temperature_2m,relativehumidity_2m,weathercode,cloudcover,windspeed_10m&current_weather=true&timezone=auto";

let tl = gsap.timeline({ repeat: -1 });
tl.to("h1", 30, { backgroundPosition: "-960px 0" });


var today = new Date();
var time = today.getHours();

async function fetchData() {
  try {
    const response = await fetch(API);
    const data = await response.json();
    console.table([
      data.current_weather.temperature,
      data.current_weather.windspeed,
      data.current_weather.weathercode,
      data.current_weather.time,
      data.hourly.cloudcover,
      data.hourly.relativehumidity_2m,
      data.hourly.weathercode,
    ]);
    document.getElementById("current_temp").innerText =
      `${data.current_weather.temperature}` + "°C";
    const weatherCode = data.current_weather.weathercode;
    const weatherDescription = weatherDescriptions[weatherCode];
    document.getElementById("weather_desc").innerText = `${weatherDescription}`;
    document.getElementById("current_wind_speed").innerText = `${data.current_weather.windspeed}` + " km/h";
    document.getElementById("current_cloud_coverage").innerText = `${data.hourly.cloudcover[time]}` + " %";
    document.getElementById("relative_humidity").innerText = `${data.hourly.relativehumidity_2m[time]}` + " %";
    document.getElementById("time1").innerText = `${time+1}` + ".00";
    document.getElementById("time2").innerText = `${time+2}` + ".00";
    document.getElementById("time3").innerText = `${time+3}` + ".00";
    document.getElementById("time4").innerText = `${time+4}` + ".00";
    document.getElementById("time5").innerText = `${time+5}` + ".00";
    document.getElementById("temp1").innerText = `${data.hourly.temperature_2m[time+1]}` + " °C";
    document.getElementById("temp2").innerText = `${data.hourly.temperature_2m[time+2]}` + " °C";
    document.getElementById("temp3").innerText = `${data.hourly.temperature_2m[time+3]}` + " °C";
    document.getElementById("temp4").innerText = `${data.hourly.temperature_2m[time+4]}` + " °C";
    document.getElementById("temp5").innerText = `${data.hourly.temperature_2m[time+5]}` + " °C";
    
    const weatherForecast1 = data.hourly.weathercode[time+1]
    const weatherForecast2 = data.hourly.weathercode[time+2]
    const weatherForecast3 = data.hourly.weathercode[time+3]
    const weatherForecast4 = data.hourly.weathercode[time+4]
    const weatherForecast5 = data.hourly.weathercode[time+5]
    
    document.getElementById("desc1").innerText = `${weatherDescriptions[weatherForecast1]}`;
    document.getElementById("desc2").innerText = `${weatherDescriptions[weatherForecast2]}`;
    document.getElementById("desc3").innerText = `${weatherDescriptions[weatherForecast3]}`;
    document.getElementById("desc4").innerText = `${weatherDescriptions[weatherForecast4]}`;
    document.getElementById("desc5").innerText = `${weatherDescriptions[weatherForecast5]}`;
  } catch (error) {
    console.error(error);
  }
}
fetchData();

const weatherDescriptions = {
  0: "Clear sky",
  1: "Clear sky",
  2: "Few clouds",
  3: "Scattered clouds",
  4: "Broken clouds",
  5: "Rain showers",
  6: "Rain showers",
  7: "Rain",
  8: "Rain and snow showers",
  9: "Snow showers",
  10: "Rain and hail showers",
  11: "Hail showers",
  12: "Light rain",
  13: "Rain and snow",
  14: "Light snow",
  15: "Heavy snow",
  16: "Thunderstorm",
  17: "Thunderstorm and rain",
  18: "Thunderstorm and snow",
  19: "Thunderstorm and hail",
  20: "Mist",
  21: "Fog",
  22: "Snow",
  23: "Rain and sleet",
  24: "Sleet",
  25: "Freezing rain",
  26: "Freezing drizzle",
  27: "Freezing fog",
  28: "Patches of fog",
  29: "Shallow fog",
  30: "Partial fog",
  31: "Overcast",
  32: "Cloudy",
  33: "Mostly cloudy",
  34: "Scattered clouds",
  35: "Few clouds",
  36: "Partly cloudy",
  37: "Mostly clear",
  38: "Clear",
  39: "Blowing snow",
  40: "Rain and thunderstorm",
  41: "Snow and thunderstorm",
  42: "Hail and thunderstorm",
  43: "Rain, snow, and thunderstorm",
  44: "Snow and fog",
  45: "Hail",
  46: "Snow and sleet",
  47: "Rain, snow, and sleet",
  48: "Light drizzle",
  49: "Drizzle",
  50: "Heavy drizzle",
  51: "Light rain and snow",
  52: "Rain and snow",
  53: "Light snow showers",
  54: "Snow showers",
  55: "Heavy snow showers",
  56: "Light snow blowing",
  57: "Snow blowing",
  58: "Heavy snow blowing",
  59: "Hail showers",
  60: "Light rain showers",
  61: "Moderate rain showers",
  62: "Heavy rain showers",
  63: "Light rain and hail",
  64: "Moderate rain and hail",
  65: "Heavy rain and hail",
  66: "Light rain and snow",
  67: "Moderate rain and snow",
  68: "Heavy rain and snow",
  69: "Light snow and rain",
  70: "Moderate snow and rain",
  71: "Heavy snow and rain",
  72: "Light sleet showers",
  73: "Moderate sleet showers",
  74: "Heavy sleet showers",
  75: "Light snow and hail",
  76: "Moderate snow and hail",
  77: "Heavy snow and hail",
  78: "Light sleet and snow",
  79: "Moderate sleet and snow",
  80: "Heavy sleet and snow",
  81: "Light snow and sleet",
  82: "Moderate snow and sleet",
  83: "Heavy snow and sleet",
  84: "Light rain and drizzle",
  85: "Moderate rain and drizzle",
  86: "Heavy rain and drizzle",
  87: "Light rain and freezing rain",
  88: "Moderate rain and freezing rain",
  89: "Heavy rain and freezing rain",
  90: "Light freezing rain",
  91: "Moderate freezing rain",
  92: "Heavy freezing rain",
  93: "Light drizzle and freezing rain",
  94: "Moderate drizzle and freezing rain",
  95: "Heavy drizzle and freezing rain",
  96: "Light snow and freezing rain",
  97: "Moderate snow and freezing rain",
  98: "Heavy snow and freezing rain",
  99: "Light freezing rain and snow",
  100: "Moderate or heavy freezing rain and snow",
};

function autoRefresh() {
  window.location = window.location.href;
}
setInterval('autoRefresh()', 500000);