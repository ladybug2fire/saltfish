var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String },
    userpwd: { type: String },
    userage: { type: Number },
    phone: {type: Number },
});

module.exports = mongoose.model('User',UserSchema);