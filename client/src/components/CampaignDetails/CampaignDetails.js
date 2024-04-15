import '../CampaignDetails/CampaignDetails.css'
import { useContext } from 'react'
import { APIURLContext } from '../../contexts/APIURLContext'

function CampaignDetails(props) {

    const APIURL = useContext(APIURLContext);

    return (
        <div>
            <div className="info-wrapper">
                <br />
                <h5>Name: {props.name}</h5><br />
                <h5>Description: {props.description}</h5><br />
                <h5>Goal: {props.goal}</h5><br />
                <p>Start Date: {props.start_date}</p>
                <p>End Date: {props.end_date}</p><br />
                <p>ID: {props._id}</p>
            </div>
            <div className='info-wrapper'>
                <form action={APIURL + '/donations/create_checkout'} method='POST'>
                    <input type="hidden" name='campaign_id' value={props._id}/>
                    <input type="hidden" name="campaign_name" value={props.name} />
                    <input type="hidden" name='donation_amount' value='2500'/>
                    <button type='submit'>
                        Donate $25 Today!
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CampaignDetails;