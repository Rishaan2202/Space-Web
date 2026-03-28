const background = document.getElementById('background');

async function getBackground() { 
    const url = 'https://dog.ceo/api/breeds/image/random';
    
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response Status: ${response.status}');
        }   

        const result = await response.json();
        console.log(result);    

        return result.message;
    }

    catch (error) {
        console.error('Error fetching background image:', error);
        return null;
    }
    
}

window.onload = function () {
        getBackground().then(function(imageUrl) {
        if (!imageUrl) return;

        console.log(imageUrl);

        if (background) {
            background.style.backgroundImage = `url(${imageUrl})`;
        }
    });
}

let dateObject = new Date();

setInterval(function() {
    
 dateObject = new Date();

let unixTime = dateObject.getTime();
let timeZoneOffset = dateObject.getTimezoneOffset();

console.log(timeZoneOffset);

function millisInDay() {
    return unixTime % (24 * 60 * 60 * 1000);
}

function secondsInDay() {
    return ((Math.floor(millisInDay() / 1000))%(24*60*60))%60;
}

function minutesInDay() {
    return ((Math.floor(millisInDay() / 1000 / 60))%60)+timeZoneOffset%60;
}   

function hoursInDay() {
    return Math.floor(millisInDay() / 1000 / 60 / 60) + Math.floor(timeZoneOffset/60);
}

millisInDay();
console.log(millisInDay());

secondsInDay();
console.log(secondsInDay());

minutesInDay();
console.log(minutesInDay());

hoursInDay();
console.log(hoursInDay());

let currentHours = hoursInDay();
let currentMinutes = minutesInDay();
let currentSeconds = secondsInDay();  

if (hoursInDay() < 10 && hoursInDay() >= 0) {
    currentHours = "0" + hoursInDay();
}

if (hoursInDay() >= 10 && hoursInDay() < 24) {
    currentHours = hoursInDay();
}

if (hoursInDay() < 0) {
    currentHours = 24 + hoursInDay();
}

if (minutesInDay() < 10 && minutesInDay() >= 0) {
    currentMinutes = "0" + minutesInDay();
}

if (minutesInDay() < 0) {
    currentMinutes = 60 + minutesInDay();
}

if (minutesInDay() > 30) {
    currentHours--;
}

if (secondsInDay() < 10) {
    currentSeconds = "0" + secondsInDay();
}

const timeDiv = document.getElementById('time');
timeDiv.innerText = currentHours + ":" + currentMinutes + ":" + currentSeconds;

}, 1000);

navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('Latitude: ' + latitude + ', Longitude: ' + longitude);
    }

    function error() {
        console.error('Unable to retrieve your location');
        getElementById('whether').innerText = 'Unable to retrieve your location';
    }

async function getWeather(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&current_weather=true&temperature_unit=celcius&wind_speed_unit=kmh`;
    whetherDiv = document.getElementById('whether');
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response Status: ${response.status}');
        }
        const result = await response.json();
        console.log(result);
        console.log(result.current_weather.precipitation);
        console.log(result.current_weather.temperature);
        console.log(result.current_weather.wind_speed); 

        let precipitation = result.current_weather.precipitation;
        let temperature = result.current_weather.temperature;
        let windSpeed = result.current_weather.wind_speed;

        whetherDiv.innerText = `${precipitation}% ${temperature}°C ${windSpeed} KMH`; 
        
        return result;
    }
    
    catch (error) {
        console.error('Error fetching weather data:', error);
        whetherDiv.innerText = 'Error fetching weather data';
        return null; 
    }
}