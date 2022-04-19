const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");

const app = express();
const port = 4000;

const routes = require('./src/index');
const connection = require('./src/dbconnect');

app.use(routes); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.listen(port, ()=>{
        console.log(`Listening on port ${port}`);
    });