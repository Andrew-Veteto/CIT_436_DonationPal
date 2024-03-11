const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

require('models/Campaign');
const Campaign = mongoose.model('campaign');

require('models/Donation');
const Donation = mongoose.model('donation');

// Root route
router.get('/', (req, res) => {
    res.send('HELLO');
});

// Get all Campaigns
router.get('/campaigns', async (req, res) => {
    const filter = {};
    const campaigns = await Campaign.find();
    res.json(campaigns);
});

// Get all Donations
router.get('/donations', async (req, res) => {
    const donations = await Donation.find();
    res.json(donations);
});

// Get all Donations related to a user
router.get('/donations/:id', async (req, res) => {
    const user_id = req.params.id;
    const donations = await Donation.find({ user_id: new ObjectId(user_id) });
    res.json(donations);
});

// Gets a Campaign based on ID then gets all donations for that campaign
router.get('/campaigns/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const campaignQuery = Campaign.find().where('_id').equals(id);
        const donationQuery = Donation.find({ campaign_id: new ObjectId(id) });
        const [campaigns, donations] = await Promise.all([campaignQuery, donationQuery]);
        res.json({ campaigns, donations });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;