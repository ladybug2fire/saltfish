var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var GoodSchema = new Schema({
    userid: String,
    username: String,
    goodname: { type: String },
    picUrl: { type: String },
    addTime: {type: String},
    price: Number,
    status: Number,
    desc: {type: String},
});

module.exports = mongoose.model('Good',GoodSchema);