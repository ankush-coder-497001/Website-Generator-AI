// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, 
    picture:{type:String},
    createdAt: { type: Date, default: Date.now },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GeneratedWebsite' }], 
});

module.exports = mongoose.model('User', userSchema);
