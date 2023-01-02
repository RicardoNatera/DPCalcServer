const express = require('express');
const app = express();
const schedule = require('node-schedule');
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const browserObject = require('./browser');
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

schedule.scheduleJob('6 * * *', function(){
    // Pass the browser instance to the scraper controller
    scraperController(browserInstance)
});

app.get("/", (req, res) => {
    res.send("I will be shown on the Browser");
    console.log("I will be shown on the Terminal");
});

app.get("/actualizacionValores", (req, res) => {

    let rawdata = fs.readFileSync('dolarItems.json');
    let valores = JSON.parse(rawdata);
    console.log(valores);

    res.send(valores);
    console.log("Enviados");
});

app.listen(PORT);