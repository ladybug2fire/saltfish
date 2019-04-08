var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    userid: String,
    username: String,
    goodname: { type: String },
    goodid: String,
    addTime: {type: String},
    desc: {type: String},
});

module.exports = mongoose.model('Review',ReviewSchema);