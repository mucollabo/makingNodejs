const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const app = express();

const webSocket = require('./socket.js');

// setting port
app.set('port', process.env.PORT || 8080);

// common middle ware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('wsExample'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'esExample',
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

// setting routing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 404 error processing
app.use((req, res) => {
    const error = new Error(`${req.method} ${req.url} there is no adress.`);
    error.status = 404;
    next(error);
});

// processing middle ware
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send('error Occurred');
})

// connecting between server and port
const server = app.listen(app.get('port'), () => {
    console.log('running at ', app.get('port'))
});

webSocket(server);   // share ws and http port
