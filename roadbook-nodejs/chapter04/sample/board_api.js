const morgan = require('morgan');

// express app generate
const express = require('express');
const app = express();

// setting port
app.set('port', process.env.PORT || 8080);

// common middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// comments data for test
let boardList = [];
let nomOfBoard = 0;

// setting routing
app.get('/', (req, res) => {
    res.send('This is api.js');
});

// comments API
app.get('/board', (req, res) => {
    res.send(boardList);
});

app.post('/board', (req, res) => {
    const board = {
        "id": ++numOfBoard,
        "user_id": req.body.user_id,
        "date": new Date(),
        "title": req.body.title,
        "content": req.body.content
    };
    boardList.push(board);

    res.redirect('/board');
});

app.put('/board/:id', (req, res) => {
    // req.params.id 값 찾아 리스트에서 삭제
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id
    });

    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    // add new component to list
    const board = {
        "id": +req.params.id,
        "user_id": req.params.user_id,
        "date": new Date(),
        "title": req.body.title,
        "content": req.body.content
    };
    boardList.push(board);

    res.redirect('/board');
});

app.delete('/board/:id', (req, res) => {
    // req.params.id  find value and delete from list
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id
    });
    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    res.redirect('/board');
});

// connect between server and port
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..')
});
