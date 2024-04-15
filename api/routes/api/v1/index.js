const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Helper function to get prod/dev client/api URL
const getURL = (app) => {
    if (process.env.NODE_ENV === 'production'){
        if(app === 'client') {
            return process.env.PROD_CLIENT_URL;
        } else {
            return process.env.PROD_API_URL;
        }
    } else {
        if(app === 'client') {
            return process.env.DEV_CLIENT_URL;
        } else {
            return process.env.DEV_API_URL;
        }
    }
};

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

// Gets one Campaign based on its id
router.get('/campaigns/one/:id', async (req, res) => {
    const campaignID = req.params.id;
    const campaigns = await Campaign.find().where('_id').equals(campaignID);
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

router.post('/donations/create_checkout', async (req, res) => {
    // console.log(req.body);
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: req.body.campaign_name
                    },
                    unit_amount: req.body.donation_amount
                },
                quantity: 1
            },
        ],
        mode: 'payment',
        success_url: `${getURL('api')}/donation_success?success=true&session_id={CHECKOUT_SESSION_ID}`, /*&campaign_id=${req.body.campaign_id}*/
        cancel_url: `${getURL('client')}`,
        metadata: {
            campaign_id: req.body.campaign_id
        }
    });
    // console.log(session);
    res.redirect(303, session.url);
});

router.get('/donation_success', async (req, res) => {
    // View the entire querystring
    // console.log(req.query);

    // Retrieve the checkout session from the Stripe API
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    // View the entire session object returned by Stripe
    // console.log(session);

    // Retrieve the campaign_id (metadata or querystring)
    // console.log(session.metadata.campaign_id);
    // console.log(req.query.campaign_id);

    // TODO: Add a donation record to the database
    // (REMEMBER) the amount_total is in CENTS and not DOLLARS
    const donation_amount = session.amount_total/100;
    

    // Construct a URL to the front end to deliver the user
    const clientURL = `${getURL('client')}/donation_success?campaign_id=${session.metadata.campaign_id}&donation_amount=${donation_amount}`;

    // Redirect the user
    res.redirect(303, clientURL);
})

module.exports = router;