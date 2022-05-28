var searchBtn = document.getElementById("searchBtn");
var cityEl = document.getElementById("city");
var cityHistoryEl = document.getElementById("cityHistory");
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
var renderCity = function () {
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
	renderCity();
	getCoordinates();
});

// to locate the city, we need longitude and latitute
var getCoordinates = function (cityName) {
	var coordinates =
		"http://api.openweathermap.org/geo/1.0/direct?q=" +
		cityName +
		"&limit={limit}&appid=72089c6cb9be7989ea34e3e3aad0d5ed";

	fetch(coordinates).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				getWeather(data);
			});
		} else {
			location.reload();
		}
	});
};

// order matters when rendering history values

// with the longitute and latitute, we can pinpoint the city and the name will appear along with the date (maybe use moment to show current date)

var apiUrl =
	"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=72089c6cb9be7989ea34e3e3aad0d5ed";

// data that we will need to show is are the temerature, wind, humidity and UV index:

//as for the forecast, we will use the long and lat to pin point the city and create the forecast based on today's date
// same thing for the temp, wind, and humidity

// upon typing the city name, we will need to save the city name up to the local storage and call it down as a button
// set it so that upon clicking the button, the value or text on the button will trigger the search function and pinpoint again
