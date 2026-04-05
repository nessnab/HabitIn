const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    goal: {
        type: String,
        required: true,
        trim: true
    },
    schedule: {
        type: String,
        enum: ['Daily', 'Weekly', 'Custom'],
        required: true
    },
    weeklyDay: {
        type: String,
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    customDays: {
        type: [String],
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: function() {return this.schedule === 'Custom';}
    },
    time: {
        type: String,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        required: true
    },
    elapsedTime: {
        type: Number,
        default: 0
    },
    isRunning: {
        type: Boolean,
        default: false
    },
    lastStartedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }
});

const Habit = mongoose.models.Habit || mongoose.model('Habit', habitSchema);
module.exports = Habit;