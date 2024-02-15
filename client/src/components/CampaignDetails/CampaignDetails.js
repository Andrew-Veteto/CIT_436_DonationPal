import '../CampaignDetails/CampaignDetails.css'

function CampaignDetails( props ){
    return(
        <div className="info-wrapper">
            <br />
            <h5>Name: {props.name}</h5><br />
            <h5>Description: {props.description}</h5><br />
            <h5>Goal: {props.goal}</h5><br />
            <p>Start Date: {props.start_date}</p>
            <p>End Date: {props.end_date}</p><br />
            <p>ID: {props._id}</p>
        </div>
    )
}

export default CampaignDetails;