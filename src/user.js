const mongoose = require("mongoose");
const URL = "mongodb://localhost:27017/userdata";
mongoose.connect(URL);
const validate = require('mongoose-validator');


// const phoneSchema = mongoose.Schema({
//     type: String,
//     match: [/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'Enter a valid phone number']
// })

// const emailSchema = new Schema({
//     type: String,
//     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address']
// })

// const minimumLimit = val => {
//     return val.length >= 1;
// }

// const contactSchema = new Schema({
//     name: {type: String, required: true},
//     birthDate: Date,
//     phone: {
//         type: [phoneSchema], index: true, unique: true,
//         validate: [minimumLimit, 'Enter at least one phone number']
//     },
//     email: {type: [emailSchema]}
// });

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 30],
        message: 'Name should be between 3 and 30 characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only'
    })
];

const userSchema = mongoose.Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    fatherName: {type: String, required: true},
    codeMeli: {type: Number, unique: true, required: true},
    // email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    cellphone: [{
        type: Number,
        index: true,
        // minLength: 11,
        // maxLength: 11,
    }],
    telephone: [{
        type: Number,
        index: true,
        // minLength: 11,
        // maxLength: 11,
    }],
});

module.exports = mongoose.model('User', userSchema);