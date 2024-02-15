import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import '../Board/Board.css'
import Campaigns from '../../components/Campaigns/Campaigns';

function Board(props) {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
      const loadCampaigns = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/campaigns');
          setCampaigns(() => [...response.data])
        }
        catch (error) {
          console.log(error);
        }
      }
  
      loadCampaigns();
  
    }, [props.campaigns]);
  
    const campaignList = campaigns
      .map((campaign) => (
        <Campaigns
          key={nanoid()}
          _id={campaign._id}
          name={campaign.name}
          description={campaign.description}
        />));


    return (
      <div className='main-body'>
        <div className='campaignList'>{campaignList}</div>
      </div>
    )
}
export default Board;