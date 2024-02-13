const apiKey = '0d117102d31b2aa81036426e06ddf111';

function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;
    cityInput.value = "";

    if (cityName) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                displayError();
            });
    } else {
        alert('Please enter a city name.');
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');

    if (data.cod === '404') {
        weatherInfo.innerHTML = '<div class="alert alert-danger">City not found. Please try again.</div>';
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp);
        const weatherDescription = data.weather[0].description;
        const weatherCode = data.weather[0].icon
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;

        const weatherIcons = {
            '01d': 'clear.png',
            '01n': 'clear.png',
            '02d': 'clouds.png',
            '02n': 'clouds.png',
            '03d': 'clouds.png',
            '03n': 'clouds.png',
            '04d': 'clouds.png',
            '04n': 'clouds.png',
            '09d': 'rain.png',
            '09n': 'rain.png',
            '10d': 'rain.png',
            '10n': 'rain.png',
            '11d': 'rain.png',
            '11n': 'rain.png',
            '13d': 'snow.png',
            '13n': 'snow.png',
            '50d': 'mist.png',
            '50n': 'mist.png'
        };

        const weatherIconPath = `images/${weatherIcons[weatherCode] || 'question.png'}`;

        const weatherHtml = `
            <div class="weather-card">
                <h2>${cityName}</h2>
                <img class="weather-icon" src="${weatherIconPath}" alt="Weather Icon" height="150px">
                <p class="temperature">${temperature} °C</p>
                <p class="weather-description">${weatherDescription}</p>
                <div class="weather-condition">
                    <i class="weather-icons-wind fas fa-wind"></i> Wind Speed: ${windSpeed} m/s
                </div>
                <div class="weather-condition">
                    <i class="weather-icons fas fa-tint"></i> Humidity: ${humidity}%
                </div>
            </div>
        `;

        weatherInfo.innerHTML = weatherHtml;
    }
}

function displayError() {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '<div class="alert alert-danger">Error fetching weather data. Please try again later.</div>';
}