require('dotenv').config();
const apiKey= process.env.apiKey;
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`; 

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            console.log("Weather data fetched:", data);  // Log the fetched data
            backgroundChange(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function backgroundChange(data) {
    const weatherCondition = data.weather[0].main;
    console.log("Current weather condition:", weatherCondition);  // Log the weather condition

    if (weatherCondition === 'Clouds') {
        document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/41/4f/60/414f60aad193d61c656ed52f2989366a.gif')";
    } else if (weatherCondition === 'Clear') {
        document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/c8/ba/30/c8ba30ee61944cc26dbde4022a0a4b72.gif')";
    } else if (weatherCondition === 'Mist') {
        document.body.style.backgroundImage = "url('https://media0.giphy.com/media/9GIEZ60FUeeSAPyltp/200w_s.gif?cid=8d8c03589tdj28ynras6erqwstl5s5fddcg9qn702cud5z42&ep=v1_gifs_search&rid=200w_s.gif&ct=g')";
    } else if (weatherCondition === 'Rain') {
        document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/8c/5f/c8/8c5fc8c3d0e4489df302db0c52be218e.gif')";
    } else {
        document.body.style.backgroundImage = "";
    }

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}
