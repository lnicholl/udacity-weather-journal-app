/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=5ab7ee7d6d6bf96d60e6508a81178c3e';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add event listener to generate button + callback function
document.getElementById('generate').addEventListener('click', generateResults);

function generateResults(e){
    const zip =  document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeatherData(baseURL, zip, apiKey)
    .then(function (data){
        postData('/addData', {temperature: data.main.temp, date: newDate, userResponse: feelings})
        .then(function() {
            updateUI()
        })
    })
}

// Function to make GET request to API
const getWeatherData = async (baseURL, zip, apiKey) => {

  const res = await fetch(baseURL + zip + apiKey + '&units=metric');
  try {
    const data = await res.json();
    console.log(data)
    return data;
  } catch(error) {
    console.log('error', error);
  }
}

  // POST promise request

const postData = async (url = '', data = {}) => {

    const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch(error) {
    console.log('error', error);
  }
}

// Update UI

const updateUI = async () => {
  const req = await fetch('http://localhost:8000/all');
  try {
      const allData = await req.json();
      document.getElementById('temp').innerHTML = allData.temperature;
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('content').innerHTML = allData.userResponse;
  }
  catch (error) {
      console.log('error', error);
  }
}