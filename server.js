const express = require('express');
const app = express();
const port = 3000;
const { google } = require('googleapis');
const request = require('request');
const cors = require('cors');
const urlParse = require('url-parse');
const queryString = require('query-string');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get("/getURLTing", (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        // Client Id
        process.env.CLIENT_ID,
        // client secret
        process.env.CLIENT_SECRET,
        // link to redirect
        "http://localhost:3000",
    )

        const scopes = ['https://www.googleapis.com/auth/adwords']

        const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes,
            state: JSON.stringify({
                callbackUrl: req.body.callbackUrl,
                userID: req.body.userid
            })
        });

        request(url, (err, response, body) => {
            console.log("error", err);
            console.log("statusCode: ", response && response.statusCode)
            res.send({ url })
        });
});

app.get("/", async (req, res) => {
    const queryURL = new urlParse(req.url);
    const code = queryString.parse(queryURL.query).code;
    const oauth2Client = new google.auth.OAuth2(
        // Client Id
        process.env.CLIENT_ID,
        // client secret
        process.env.CLIENT_SECRET,
        // link to redirect
        "http://localhost:3000",
    )

    const tokens = await oauth2Client.getToken(code);
 
    let leadDataList = [];

    try {

        const result = await axios({
            method: "GET",
            headers: {
                authorization: "Bearer" + tokens.tokens.access_token
            },
            "Content-Type": "application/json",
            url: `https://localservices.googleapis.com/v1/detailedLeadReports:search?query=manager_customer_id:197-383-537`
           
        })

        console.log(result);


    } catch (err) {

    }
     
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});