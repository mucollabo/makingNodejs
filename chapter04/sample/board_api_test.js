const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

app.set('port', 3000);

// common middle ware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// call axios
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/board_api_test.html");
});

// connecting between server and port
app.listen(app.get('port'), () => {
    console.log('running on ', app.get('port'), ' port')
});
