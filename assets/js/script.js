var searchBtn = document.getElementById("searchBtn");
var cityEl = document.getElementById("city");
var cityHistoryEl = document.getElementById("cityHistory");
var locationEl = document.getElementById("location");
var cityArray = [];

var getCityName = function () {
	cityArray = JSON.parse(localStorage.getItem("cityList")) || [];
};
var setCityName = function () {
	localStorage.setItem("cityList", JSON.stringify(cityArray));
};

// when click on search button, it pushes city name onto localstorage
// in local storage, call the city back into buttons
//include rendering the buttons
var limit;

var renderCityHistory = function () {
	cityHistoryEl.textContent = "";

	if (cityArray.length < 10) {
		limit = cityArray.length;
	} else {
		limit = 10;
	}

	// for (i = 0; i < limit; i++) {
	// 	vyar btnEl = document.createElement("button");
	// 	btnEl.textContent = cityArra[i];
	// 	btnEl.setAttribute("class", "cityHistoryBtn");
	// 	cityHistoryEl.appendChild(btnEl);
	// }

	// have to target the key (cityList) to get the value in a loop
	if (cityArray.length <= limit) {
		cityArray.forEach(function (city) {
			var btnEl = document.createElement("button");
			btnEl.textContent = city;
			btnEl.setAttribute("class", "cityHistoryBtn");
			cityHistoryEl.appendChild(btnEl);

			btnEl.addEventListener("click", function (event) {
				event.preventDefault();
				getCityName(getCoordinates(this.textContent));
			});
		});
	}
	// if history button is pressed, then get the city name and run the getCoordinates function
	// 	var btnEl = document.createElement("button");
	// 	btnEl.textContent = `${item}`;
	// 	btnEl.setAttribute("class", "child");
	// 	cityHistoryEl.appendChild(btnEl);
};

// by entering the city name, the city data and the forecast will appear
searchBtn.addEventListener("click", function (event) {
	event.preventDefault();

	var cityValue = cityEl.value;

	if (!cityValue) {
		return;
	}
	if (!cityArray.includes(cityValue)) {
		cityArray.push(cityValue);
		setCityName();
	}
	console.log(cityValue);

	getCityName();
	renderCityHistory();
	getCoordinates(cityValue);
});

// to locate the city, we need longitude and latitute
var getCoordinates = function (cityName) {
	locationEl.textContent = "";
	var coordinates =
		"http://api.openweathermap.org/geo/1.0/direct?q=" +
		cityName +
		"&appid=72089c6cb9be7989ea34e3e3aad0d5ed";

	fetch(coordinates).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				var cityNameEl = document.createElement("h3");
				cityNameEl.textContent = data[0].name;
				locationEl.appendChild(cityNameEl);
				console.log(data);
				getCityWeather(data[0].lat, data[0].lon);
			});
		}
		//  else {
		// 	location.reload();
		// }
	});
};

// order matters when rendering history values
// data that we will need to show is are the temerature, wind, humidity and UV index:
var showCityWeather = function (placeholder) {
	var imgEl = document.createElement("img");
	imgEl.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${placeholder.current.weather[0].icon}@2x.png`
	);

	locationEl.appendChild(imgEl);

	var temperatureEl = document.createElement("div");
	temperatureEl.textContent = "Temp: " + placeholder.current.temp + " F";
	locationEl.appendChild(temperatureEl);

	var windSpeedEl = document.createElement("div");
	windSpeedEl.textContent = "Wind: " + placeholder.current.wind_speed;
	locationEl.appendChild(windSpeedEl);

	var humidityEl = document.createElement("div");
	humidityEl.textContent = "Humidity: " + placeholder.current.humidity;
	locationEl.appendChild(humidityEl);

	var uviEl = document.createElement("div");
	uviEl.textContent = "UV Index: " + placeholder.current.uvi;
	locationEl.appendChild(uviEl);
};

//as for the forecast, we will use the lon and lat to pinpoint the city and create the forecast based on today's date
// same thing for the temp, wind, and humidity
var showForecastWeather = function (placeholder) {
	var temperatureEl = document.createElement("div");
	temperatureEl.textContent = "Temp: " + placeholder.current.temp + " F";
	locationEl.appendChild(temperatureEl);

	var windSpeedEl = document.createElement("div");
	windSpeedEl.textContent = "Wind: " + placeholder.current.wind_speed;
	locationEl.appendChild(windSpeedEl);

	var humidityEl = document.createElement("div");
	humidityEl.textContent = "Humidity: " + placeholder.current.humidity;
	locationEl.appendChild(humidityEl);

	var uviEl = document.createElement("div");
	uviEl.textContent = "UV Index: " + placeholder.current.uvi;
	locationEl.appendChild(uviEl);
};

var forecastWeather = function () {
	for (i = 0; i < 40; i += 8) {
		// create each of the containers and assign bootstrap
		// attend all information as child to the container

		var temperatureEl = document.createElement("div");
		temperatureEl.textContent = "Temp: " + placeholder.current.temp + " F";
		locationEl.appendChild(temperatureEl);

		var windSpeedEl = document.createElement("div");
		windSpeedEl.textContent = "Wind: " + placeholder.current.wind_speed;
		locationEl.appendChild(windSpeedEl);

		var humidityEl = document.createElement("div");
		humidityEl.textContent = "Humidity: " + placeholder.current.humidity;
		locationEl.appendChild(humidityEl);

		var uviEl = document.createElement("div");
		uviEl.textContent = "UV Index: " + placeholder.current.uvi;
		locationEl.appendChild(uviEl);
	}
};

// with the longitute and latitute, we can pinpoint the city and the name will appear along with the date (maybe use moment to show current date)
var getCityWeather = function (cityLat, cityLon) {
	var apiUrl =
		"https://api.openweathermap.org/data/2.5/onecall?lat=" +
		cityLat +
		"&lon=" +
		cityLon +
		"&appid=72089c6cb9be7989ea34e3e3aad0d5ed&units=imperial";

	var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=72089c6cb9be7989ea34e3e3aad0d5ed`;

	fetch(apiUrl).then(function (response1) {
		if (response1.ok) {
			response1.json().then(function (weatherDetails) {
				showCityWeather(weatherDetails);
			});
		}
	});

	fetch(forecastUrl).then(function (response2) {
		if (response2.ok) {
			response2.json().then(function (weatherDetails) {
				forecastWeather(weatherDetails);
			});
		}
	});
};

//5 day will basically follow same format as city weather, except we have to create 5 different containers, basically 1 extra step in creating the container for 5 day
getCityName();
renderCityHistory();
