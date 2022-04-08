// Create empty Javascript object
DataEndpoint = [];

// Prepare Server
const express = require('express');
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
const cors = require('cors');
app.use(cors());

// Create main project folder
app.use(express.static('website'));


// Create Server
const port = 3000;
// Spin up the server
const server = app.listen(port, listening);
// Callback
function listening(){
    console.log(`Server running on localhost: ${port}`);
}

/* GET route */
app.get('/source', getData);

function getData(req, res){
    res.send(projectData);
}

/* POST route*/
app.post('/addToSource', addWeatherEntry);

function addWeatherEntry(req, res){
    newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    projectData.push(newEntry);
    res.send(projectData);
}