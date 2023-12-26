const apiKey = "9b0cd9f8ad3cec05dbb8693f283b80bb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";

    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const status = data.weather[0].main;

    if (status == "Clouds") {
      weatherIcon.src = "../assets/images/clouds.png";
    } else if (status == "Rain") {
      weatherIcon.src = "../assets/images/rain.png";
    } else if (status == "Clear") {
      weatherIcon.src = "../assets/images/clear.png";
    } else if (status == "Drizzle") {
      weatherIcon.src = "../assets/images/drizzle.png";
    } else if (status == "Mist") {
      weatherIcon.src = "../assets/images/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
