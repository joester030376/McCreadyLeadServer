const express = require('express');
const app = express();
const port = 3000;
const { google } = require('googleapis');
const request = require('request');
const cors = require('cors');
const urlParse = require('url-parse');
const queryParse = require('query-string');
const bodyParser = require('body-parser');
const axios = require('axios');
dotenv.config({path: "./config.env"});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.send(
        'Welcome to my server'
    );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});