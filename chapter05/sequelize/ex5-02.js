const morgan = require('morgan');
const models = require('./models');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// setting port
app.set('port', process.env.PORT || 8080);

// common middle ware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// read data
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

// update info. for id
app.put('/customer/:id', async (req, res) => {
    const customer = await models.newCustomer.update({
        where: { id: req.params.id },
        name: body.name,
        age: body.age,
        sex: body.sex,
    });
    return res.json(customer);
});

// delete for this id
app.delete('/customer/:id', async (req, res) => {
    const customer = await models.newCustomer.destroy({
        where: { id: req.params.id },
    });
});

// connecting between server and port
app.listen(app.get('port'), () => {
    console.log('running server at ', app.get('port'), 'port')
});
