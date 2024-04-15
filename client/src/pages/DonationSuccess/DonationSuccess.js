import useDataGetter from "../../hooks/useDataGetter";
import { useSearchParams } from 'react-router-dom';
import Header from "../../components/Header/Header";

function DonationSuccess() {

    // Get the campiagn ID from the querystring
    const [searchParams, setSearchParams] = useSearchParams();
    const campaignID = searchParams.get('campaign_id');
    const donationAmount = searchParams.get('donation_amount')

    console.log(campaignID)

    // Set up state
    const [loading, data] = useDataGetter(`campaigns/one`, 1, campaignID);

    console.log(data)

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                {loading && <div>Loading...</div>}
                {!loading && data && data[0] && (
                    <div>
                        Donation success! You donated ${donationAmount} to the campaign <strong>{data[0].name}</strong>
                    </div>
                )}
            </div>
        </div>
    )

}

export default DonationSuccess