import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { nanoid } from "nanoid";
import CampaignDetails from '../CampaignDetails/CampaignDetails';
import DonationDetails from '../DonationsDetails/DonationsDetails';
import '../CampaignDetailPage/CampaignDetailPage.css'

function CampaignDetailPage() {

    const [campaigns, setCampaign] = useState([]);
    const [donations, setDonations] = useState([]);
    const params = useParams();

    useEffect(() => {
        const loadCampaigns = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/campaigns/${params.id}`);
                setCampaign(() => [...response.data.campaigns])
                setDonations(() => [...response.data.donations])
            }
            catch (error) {
                console.log(error);
            }
        }

        loadCampaigns();

    }, [params.id]);

    const campaignDetails = campaigns
        .map((campaign) => (
            <CampaignDetails
                key={nanoid()}
                _id={campaign._id}
                name={campaign.name}
                description={campaign.description}
                goal={campaign.goal}
                end_date={campaign.end_date}
                start_date={campaign.start_date}
            />
        ));

    const donationDetails = donations
        .map((donation) => (
            <DonationDetails
                key={nanoid()}
                _id={donation._id}
                amount={donation.amount}
                date={donation.date}
                message={donation.message}
                user_id={donation.user_id}
                campaign_id={donation.campaign_id}
            />
        ))

    return (
        <div>
            <br />
            <h1 className="text-stlying">Campaign Details</h1>
            <div>
                {campaignDetails}
            </div>
            <br />
            <hr />
            <br />
            <h1 className="text-stlying">Donations</h1>
            <div className="donationList">
                {donationDetails}
            </div>
        </div>
    )
}

export default CampaignDetailPage;