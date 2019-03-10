const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    mail: String,
    date: Date
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;
