const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, "../../../.env")});
const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

// setting port
app.set('port', process.env.PORT);

// common middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting routing
app.get('/airkorea', async(req, res) => {
    const serviceKey = process.env.airServiceKey;   // dotenv 사용
})