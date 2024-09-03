const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    title:{
        type:String,
        required:false
    },
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    password: {
        type: String,
        required: false
    },
    viewerCount: {
        type: Number,
        default: 0
    }
});

const LinkModel = mongoose.model('links', LinkSchema);

module.exports = LinkModel;
