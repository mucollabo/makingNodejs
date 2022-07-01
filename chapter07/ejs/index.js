const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        "People":
            [
                {
                    "name": "Gildong",
                    "age" : "15"
                },
                {
                    "name": "Charles",
                    "age": "47"
                },
                {
                    "name": "Hyena",
                    "age": "25"
                }
            ]
        , title: "Express"
    });
});

app.listen(app.get('port'), () => {
    console.log('running at', app.get('port'), 'port')
});
