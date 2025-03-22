const mongoose = require('mongoose');
const habitSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    lastUpdate:{
        type: Date,
        default: Date.now
    },
    lastDone:{
        type: Date,
        default: Date.now
    },
    days:{
        type: Number,
        default: 1
    },
    startedAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('habit', habitSchema);