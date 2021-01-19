var mongoose = require('mongoose');

var user = new mongoose.Schema({

    firstname: String,
    lastname: String,
    email: String,
    imagename: String,

    referral_code: {
        type: String,
        default: `${Date.now().toString().slice(10, 12) + Math.random().toString(36).substr(2, 9)}`
    }

})

var user = mongoose.model('user', user);

module.exports = user;
