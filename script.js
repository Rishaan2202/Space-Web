const background = document.getElementById('background');

async function getBackground() { 
    const url = 'https://api.nasa.gov/planetary/apod?api_key=EblNHd3g4XPgItOg5cI3HzeouDxopd3nZcqfRMPT';
    
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

function millisInDay() {
    return (unixTime % (24 * 60 * 60 * 1000))+timeZoneOffset;
}

function secondsInDay() {
    return (millisInDay() / 1000);
}

function minutesInDay() {
    return (millisInDay() / 1000 / 60);
}

function hoursInDay() {
    return (millisInDay() / 1000 / 60 / 60);
}

millisInDay();
console.log(millisInDay());

secondsInDay();
console.log(secondsInDay());

minutesInDay();
console.log(minutesInDay());

hoursInDay();
console.log(hoursInDay());

}, 1000);
