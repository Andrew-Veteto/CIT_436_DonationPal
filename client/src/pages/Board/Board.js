import { nanoid } from 'nanoid';
import '../Board/Board.css'
import Campaigns from '../../components/Campaigns/Campaigns';
import Header from '../../components/Header/Header';
import Splash from '../../components/Splash/Splash';
import useDataGetter from '../../hooks/useDataGetter';

function Board() {

  const [loading ,data] = useDataGetter('campaigns', 1, "");

  const campaignList = data
    .map((campaign) => (
      <Campaigns
        key={nanoid()}
        _id={campaign._id}
        name={campaign.name}
        description={campaign.description}
      />));

    console.log(data);

  return (
    <div>
      <div>
        <Header/>
      </div>
      <div>
        <Splash/>
      </div>
      <div className='main-body'>
        <div className='campaignList'>{campaignList}</div>
      </div>
    </div>
  )
}
export default Board;