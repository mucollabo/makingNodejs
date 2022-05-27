const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// setting port
app.set('port', process.env.PORT || 8080);

// common middle ware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser('secret@1234'));    // sending text for using encryptive cookies
app.use(session({
    secret: 'secret@1234',      // encryption
    resave: false,              // when there is new request, though there is no difference in the session, setting resave again.
    saveUninitialized: true,    // though no save-content in the session, setting save.
    cookie: {
        // setting session cookie option httpOnly, expires, domain, path, secure, sameSite
        httpOnly: true,         // essentially adjustment when implement a login, function to prevent access by javascript
    },
    // name: 'connect.sid'      // 세션 쿠키의 Name 지정 default가 connect.sid
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting routing
app.get('/', (req, res) => {
    if (req.session.name) {
        const output = `
                <h2>로그인한 사용자님</h2><br>
                <p>${req.session.name}님 안녕하세요.</p><br>
            `
        res.send(output);
    } else {
        const output = `
                <h2>로그인하지 않은 사용자입니다.</h2><br>
                <p>로그인 해주세요.</p><br>
            `
        res.send(output);
    }
});

app.get('/login', (req, res) => {  // 실제 구현시 post
    console.log(req.session);
    // 쿠키를 사용할 경우 쿠키에 값 설정
    // res.cookie(name, value, options)
    // 세션 쿠키를 사용할 경우
    req.session.name = '로드북';
    res.end('Login OK')
});

app.get('/logout', (req, res) => {
    res.clearCookie('connect.sid');  // 세션 쿠키 삭제
    res.end('Logout OK');
});

// connect between server and port
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..')
});
