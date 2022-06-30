const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const Localstrategy = require('passport-local').Strategy;

const app = express();

// setting port
app.set('port', process.env.PORT || 8080);

// virtual data
let fakeUser = {
    username: 'test@test.com',
    password: '4321'
}

// common middle ware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('passportExample'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'passportExample',
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

// passport middle ware
app.use(passport.initialize());   // initialize passport
app.use(passport.session());      // connect passport session

// process the session - when the login is complete, only once called and save user's identification on the session 
passport.serializeUser(function (user, done) {
    console.log('serializeUser', user);
    done(null, user.username);
});

// processing the session - after the login, when visit the page, insert the user's real data
passport.deserializeUser(function (id, done) {
    console.log('deserializeUser', id);
    done(null, fakeUser);   // pass to req.user
});

passport.use(new Localstrategy(
    function (username, password, done) {
        if (username === fakeUser.username) {
            if (password === fakeUser.password) {
                return done(null, fakeUser);
            } else {
                return done(null, false, { message: "password incorrect" });
            }
        } else {
            return done(null, false, { message: "username incorrect" });
        }
    }
));

// setting routing
app.get('/', (req, res) => {
    if (!req.user) {   // when 
        res.sendFile(__dirname + '/index.html');
    } else {
        const user = req.user.username;
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <p>${user} hello!</p>
            <button type="button" onclick="location.href='/logout'">Log Out</button>
        </body>
        </html>
        `
        res.send(html);
    }
});

// passport Login : stategy-Local
// Authenticate Requests
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/' }),
    function (req, res) {
        res.send('Login seccess..!')
    });

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// processing 404 error
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} there is no address.`);
    error.status = 404;
    next(error);
});

// processing error middle ware
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'development' ? err : {};
    res.status(err.status || 500);
    res.send('error Occurred');
});

// connecting between server and port
app.listen(app.get('port'), () => {
    console.log('running server at', app.get('port'), 'port')
});
