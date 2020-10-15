/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const submitedInfo = document.querySelectorAll('.submited');
const units = '&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=04b529fe911559f19ead8ed192d2fef6';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', subimtWeatherForm);

/* Function called by event listener */
function subimtWeatherForm() {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    getWeatherData(baseURL, zipCode, apiKey, units).then(res => {
        postWeatherData('/postWeather', {
            temp: res.main.temp,
            date: newDate,
            userResponse: feelings,
            name: res.name
        });
    }).then(
        res => {
            updateWeatherUI();
        }
    )
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zipCode, apiKey, units) => {
    const response = await fetch(baseURL + zipCode + apiKey + units);
    console.log(response);

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postWeatherData = async (url = '', weatherObj = '') => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify({
            temp: weatherObj.temp,
            date: weatherObj.date,
            userResponse: weatherObj.userResponse,
            name: weatherObj.name
        }),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */
const updateWeatherUI = async () => {
    const response = await fetch('/getWeather');
    console.log(response);


    try {
        const newData = await response.json();
        console.log(newData);
        submitedInfo.forEach(item => item.style.opacity = '1');
        document.getElementById('date').innerHTML = newData.date;
        document.getElementById('temp').innerHTML = Math.round(newData.temp);
        document.getElementById('content').innerHTML = newData.res;
        document.getElementById('name').innerHTML = newData.name;

        return newData;
    } catch (error) {
        console.log("error", error);
    }
}