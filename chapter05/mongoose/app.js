const mongoose = require('mongoose');

// connecting
mongoose
    .connect("mongodb://127.0.0.1:27017/roadbook", {
        useNewUrlParser: true,
        // useCreateIndex: true,    // unsupported
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

// Defining Schema
const customerSchema = mongoose.Schema({
    name: 'string',
    age: 'number',
    sex: 'string'
},
    {
        collection: 'newCustomer'
    }
);

// Schema -> Model
const Customer = mongoose.model('Schema', customerSchema);

// Generate Instance
const customer1 = new Customer({name: '홍길동', age: 30, sex: '남'});

// Save Data into MongoDB
// customer1.save()
//     .then(() => {
//         console.log(customer1);
//     })
//     .catch((err) => {
//         console.log('Error : ' + err);
//     });


// READ: Model.find()
// Customer.find((err, customer) => {
//     console.log('READ : Model.find()');
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(customer);
//     }
// });

// UPDATE: Model.findByld()
// Customer.findById({ _id: '62b17d01746a24b651e594dd'}, (err, customer) => {
//     console.log('UPDATE : Model.findById()');
//     if (err) {
//         console.log(err);
//     } else {
//         customer.name = 'modified';
//         customer.save((err, modified_customer) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(modified_customer);
//             }
//         });
//     }
// });

// DELETE: Model.remove()
Customer.remove({ _id: '62b17d01746a24b651e594dd' }, (err, output) => {
    console.log('DELETE: Model.remove');
    if (err) {
        console.log(err);
    }
    console.log('Data Deleted')
});
