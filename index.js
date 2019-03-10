const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    next();
});

app.use(bodyParser.json());

const mongoose = require('mongoose');
const Item = require('./item');


app.listen(PORT, () => {
    mongoose.connect('mongodb://localhost/mariogamedb');
});

app.get('/items', (req, res) => {
    Item.find().then(items => {
        res.send({items});
    }).catch(err => {
        res.send({err})
    })
})

app.post('/item', (req, res) => {
    let date = new Date();
    let item = new Item({
        mail: req.body.mail,
        date
    });
    item.save().then(item => {
        res.send({item})
    }).catch(err => {
        res.send({err})
    })
})

app.put('/item', (req, res) => {
    let id = req.body._id;
    let updateMail = req.body.mail;
    let updateDate = new Date();
    Item.findOneAndUpdate({_id: id}, {mail: updateMail, date: updateDate} )
        .then(data => res.send({data}))
})

app.delete('/item', (req, res) => {
    res.send(req.body._id);
    Item.findOneAndRemove({
        _id: req.body._id
    }).then(data => res.send({data}))
})


