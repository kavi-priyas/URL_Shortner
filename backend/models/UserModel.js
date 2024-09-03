const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    links: [{
        type: Schema.Types.ObjectId,
        ref: 'Link'
    }]
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
