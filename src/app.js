const express = require("express");
const app = express();
const port = 3000;
let userCodeMeli;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require("mongoose");
const URL = "mongodb://localhost:27017/userdata";

const User = require("./user");

function addCellphone(userModel, codemeli, phone) {
    userModel.update(
        {codeMeli: codemeli},
        {$push: {cellphone: phone}},
        done
    );
}

function addTelephone(userModel, codemeli, phone) {
    userModel.update(
        {codeMeli: codemeli},
        {$push: {telephone: phone}},
        done
    );
}

function checkStr(str, min, max) {
    return str.length > min && str.length < max
}

function isFormatted(data) {
    return checkStr(data.firstName, 0, 25) && checkStr(data.lastName, 0, 30) &&
        checkStr(data.fatherName, 0, 25) && checkStr(data.codeMeli, 9, 11) &&
        checkStr(data.password, 0, 20) && checkStr(data.telephone, 10, 12) &&
        checkStr(data.cellphone, 10, 12)
}

app.get("/users", function (req, res) {
    const data = {
        codeMeli: req.body.codeMeli,
        password: req.body.password
    };

    console.log(data);
    const user = new User();


    user.find({codeMeli : data.codeMeli}, function (err, docs) {
        if (docs.length){
            console.log(yes)
            res.status(201);
        }else{
            // data.save(function(err){
            //     cb(err,user);
            // });
            res.status(400)
        }
    });

});

app.post("/users", function (req, res) {

    // console.log(req.body)
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fatherName: req.body.fatherName,
        codeMeli: req.body.codeMeli,
        password: req.body.password,
        cellphone: req.body.cellphone,
        telephone: req.body.telephone,
    };
    // if (!isFormatted(data)) {
    //     console.log("bil")
    // } else {
    const user = new User();
    user.collection.insertOne(data, (err, collection) => {
        if (err) throw console.log(err.message);
        console.log("Record inserted Successfully");
        userCodeMeli = data.codeMeli;

    });

    console.log(data)
    res.status(201).send(data);
    // }
});


app.get("/get-phones", function (req, res) {
    let arr = []
    mongoose.connect(URL, function (err, db) {
        let cursor = db.collection('User').find();
        cursor.forEach((doc, err) => {
            arr.push(doc);
        }, () => {
            db.close();
            res.render('app', {User: arr});
        })
    });

    consloe.log(arr)

});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
