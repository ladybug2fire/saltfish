var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var MovieSchema = new Schema({
    goodname: { type: String },
    picUrl: { type: String },
    seats: { type: String },
    star: {type: Number },
    addTime: {type: String},
    sales: [String],
    price: Number,
    goodyear: {type: String},
    desc: {type: String},
});

module.exports = mongoose.model('Movie',MovieSchema);