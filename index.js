const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5000;
const clientId = '357248077317-2mg4tk3clq5vgpcuvrim414vlu2ovo9t.apps.googleusercontent.com';
const clientSecret = 'f8Qz9SQJhO2lwWNIJrbtU1JI';
const auth = '4/CQGhWvuIHO1lIXEox1eSrTgtOlHV-dsLuSncb5zPKphxoxsdaUZ7xDI';

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    next();
});

app.use(bodyParser.json());

const mongoose = require('mongoose');
const Item = require('./item');
const Message = require('./message');

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
    Item.findOneAndUpdate({_id: id}, {mail: updateMail, date: updateDate})
        .then(data => res.send({data}))
})

app.delete('/item/:id', (req, res) => {
    Item.findOneAndRemove({
        _id: req.params.id
    }).then(data => res.send({data}))
})

app.get('/sync', (req, res) => {
    Item.find().then(data => {
        const list = data.map(elm => elm.mail);
        res.send({list})
    }).catch(err => {
        res.send({err})
    })
})

app.get('/messages', (req, res) => {
    Message.find().then(messagses => {
        res.send({messagses});
    }).catch(err => {
        res.send({err})
    })
})

app.post('/message', (req, res) => {
    let date = new Date();
    let message = new Message({
        mail: req.body.mail,
        date,
        message: req.body.message
    });
    console.log(message);
    message.save().then(message => {
        res.send({msg:"ok right"});
        res.send({message})
    }).catch(err => {
        res.send({err})
    })
})
