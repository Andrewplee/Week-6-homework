var searchBtn = document.getElementById("searchBtn");
var cityEl = document.getElementById("city");
var cityHistoryEl = document.getElementById("cityHistory");
var locationEl = document.getElementById("location");
var cityArray = [];

var getCityName = function () {
	JSON.parse(localStorage.getItem("cityList")) || [];
};
var setCityName = function () {
	localStorage.setItem("cityList", JSON.stringify(cityArray));
};

// when click on search button, it pushes city name onto localstorage
// in local storage, call the city back into buttons
//include rendering the buttons
var limit;
var renderCityHistory = function () {
	if (cityArray.length < 10) {
		limit = cityArray.length;
	} else {
		limit = 10;
	}

	for (i = 0; i < limit; i++) {
		var btnEl = document.createElement("button");
		btnEl.textContent = cityArray[i];
		btnEl.setAttribute("class", "cityHistoryBtn");
		cityHistoryEl.appendChild(btnEl);
	}

	// if history button is pressed, then get the city name and run the getCoordinates function
	btnEl.addEventListener("click", function (event) {
		event.preventDefault();
		getCoordinates(cityArray[i]);
	});

	// forEach(function (item) {
	// 	var btnEl = document.createElement("button");
	// 	btnEl.textContent = `${item}`;
	// 	btnEl.setAttribute("class", "child");
	// 	cityHistoryEl.appendChild(btnEl);
	// });
};

// by entering the city name, the city data and the forecast will appear
searchBtn.addEventListener("click", function (event) {
	event.preventDefault();

	if (!this.value) {
		return;
	}
	if (!cityArray.includes(this.value)) {
		this.value.push(cityName);
		setCityName();
	}
	getCityName();
	renderCityHistory();
	getCoordinates();
});

// to locate the city, we need longitude and latitute
var getCoordinates = function (cityCoordinates) {
	var coordinates =
		"http://api.openweathermap.org/geo/1.0/direct?q=" +
		cityCoordinates +
		"&limit={limit}&appid=72089c6cb9be7989ea34e3e3aad0d5ed";

	fetch(coordinates).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				var cityNameEl = document.createElement("h3");
				cityNameEl.textContent = data.name;
				locationEl.appendChild(cityNameEl);

				getCityWeather(data.lat, data.lon);
			});
		} else {
			location.reload();
		}
	});
};

// order matters when rendering history values

// with the longitute and latitute, we can pinpoint the city and the name will appear along with the date (maybe use moment to show current date)
var getCityWeather = function (cityLat, cityLon) {
	var apiUrl =
		"https://api.openweathermap.org/data/2.5/onecall?lat=" +
		cityLat +
		"&lon=" +
		cityLon +
		"&appid=72089c6cb9be7989ea34e3e3aad0d5ed";

	fetch(apiUrl).then(function (response1) {
		if (response1.ok) {
			response1.json().then(function (weatherDetails) {
				showCityweather(weatherDetails);
			});
		}
	});
};

// data that we will need to show is are the temerature, wind, humidity and UV index:
var showCityWeather = function (placeholder) {
	var temperatureEl = locationEl.createElement("span");
	temperatureEl.textContent = "Temp: " + placeholder.current.temp;
	locationEl.appendChild(temperatureEl);

	var windSpeedEl = locationEl.createElement("span");
	windSpeedEl.textContent = "Wind: " + placeholder.current.wind_speed;
	locationEl.appendChild(windSpeedEl);

	var humidityEl = locationEl.createElement("span");
	humidityEl.textContent = "Humidity: " + placeholder.current.temp;
	locationEl.appendChild(humidityEl);

	var uviEl = locationEl.createElement("span");
	uviEl.textContent = "UV Index: " + placeholder.current.temp;
	locationEl.appendChild(uviEl);
};

//as for the forecast, we will use the lon and lat to pin point the city and create the forecast based on today's date
// same thing for the temp, wind, and humidity

//5 day will basically follow same format as city weather, except we have to create 5 different containers, basically 1 extra step in creating the container for 5 day
