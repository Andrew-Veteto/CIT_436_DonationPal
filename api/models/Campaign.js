const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    goal: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_dat: {
        type: Date,
        required: true
    }
});

mongoose.model('campaign', CampaignSchema);