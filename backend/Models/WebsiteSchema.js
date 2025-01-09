const mongoose = require('mongoose');

const generatedWebsiteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // References the user who generated it
    codeFiles: { 
        type: Map, // This map can hold multiple files (e.g., HTML, CSS, JS) by key-value pairs
        of: String 
    },
    previewUrl: { type: String }, // Optional field for preview URL
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GeneratedWebsite', generatedWebsiteSchema);
