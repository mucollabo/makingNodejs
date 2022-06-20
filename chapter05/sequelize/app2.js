const morgan = require('morgan');
const models = require('./models');

const express = require('express');
const app = express();

// setting port
app.set('port', process.env.PORT || 8080);

// common middle ware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {   // READ
    models.newCustomer.findAll()
        .then((customers) => {
            res.send(customers);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

app.get('/customer', (req, res) => {
    res.sendFile(__dirname + '/customer.html');
});

app.post('/customer', (req, res) => {   // CREATE
    let body = req.body;

    models.newCustomer.create({
        name: body.name,
        age: body.age,
        sex: body.sex,
    }).then(result => {
        console.log('customer created..!');
        res.redirect('/customer');
    }).catch(err => {
        console.log(err);
    })
});

// connecting between server and port
app.listen(app.get('port'), () => {
    console.log('running server at ', app.get('port'), 'port')
});
