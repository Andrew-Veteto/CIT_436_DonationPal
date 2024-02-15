import React from "react";
import { Link } from 'react-router-dom';
import '../Campaigns/Campaigns.css'

function Campaigns(props) {
    return (
        <div>
            <Link to={`/details/${props._id}`}>
                <div className="card standard-cards" style={{ "width": "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <hr />
                        <p className="card-text">{props.description}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Campaigns;