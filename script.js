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

if (secondsInDay() < 10) {
    currentSeconds = "0" + secondsInDay();
}

const timeDiv = document.getElementById('time');
timeDiv.innerText = currentHours + ":" + currentMinutes + ":" + currentSeconds;

}, 1000);
