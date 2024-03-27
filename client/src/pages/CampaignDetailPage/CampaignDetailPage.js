import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import CampaignDetails from '../../components/CampaignDetails/CampaignDetails';
import DonationDetails from '../../components/DonationsDetails/DonationsDetails';
import './CampaignDetailPage.css';
import Header from '../../components/Header/Header';
import useDataGetter from "../../hooks/useDataGetter";

function CampaignDetailPage() {

    const params = useParams();
    const [loading, data, data2] = useDataGetter('campaigns', 2, params.id);

    const campaignDetails = data
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

    const donationDetails = data2
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
            <div>
                <Header />
            </div>
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
                <div className="donation_table">
                    <table>
                        <thead>
                            <tr>
                                <th>Donor</th>
                                {/* <th>User ID</th> */}
                                <th>Donation</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {donationDetails}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CampaignDetailPage;