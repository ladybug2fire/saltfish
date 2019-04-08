var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    goodid: String,
    goodname: String,
    seats: [String],
    price: Number,
    addTime: {type: String},
    username: String,
    userid: String,
});

module.exports = mongoose.model('Order',OrderSchema);