/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=d447d3d87b60bb09c3b42f23c3d2d799&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const countryCode = ',de';


//Declare Variable
let d = new Date();

// Event listener for generate
document.getElementById('generate').addEventListener('click', performAction);

// Callback function performAction
function performAction(event){
    // get entered zip code
    const zip = document.getElementById('zip').value;
    // get entered user response
    const userResponse = document.getElementById('feelings').value;
    // Create a new date instance dynamically with JS
    let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
    // call OpenWeatherMap
    getWeatherData(baseURL+zip+countryCode+apiKey)
    .then(function(temperatureC){
        // Add data to POST requrest
        postData('/addData',{temperature: temperatureC, date: newDate, userResponse: userResponse});
        // Update website!
        updateUI();
    })
}

// Function to ask for data from OpenWeatherMap
const getWeatherData = async (url) => {
    const res = await fetch(url);
    try{
        const data = await res.json();
        // Kelvin to Celsius
        let temperatureC = data.main.temp;
        temperatureC = temperatureC.toFixed(2);
        return temperatureC;
    } catch(error){
        console.log("error", error);
    }
}

const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" of headers
    });
    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        const lastIndex = allData.length - 1;
        document.getElementById('date').innerHTML = allData[lastIndex].date;
        document.getElementById('temp').innerHTML = allData [lastIndex].temperature + ' °F';
        document.getElementById('content').innerHTML = allData[lastIndex].userResponse;
    } catch(error) {
        console.log("error", error);
    }
}