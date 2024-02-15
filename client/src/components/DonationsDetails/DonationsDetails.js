function CampaignDetails(props) {
    return (
        <div className="card" style={{ "width": "18rem" }}>
            <div className="card-body">
                <p>User ID: {props.user_id}</p>
                <p>Amount: ${props.amount}</p>
                <p>Message: {props.message}</p>
                <p>Date: {props.date}</p>
                <p>Donation ID: {props._id}</p>
            </div>
        </div>
    )
}

export default CampaignDetails;