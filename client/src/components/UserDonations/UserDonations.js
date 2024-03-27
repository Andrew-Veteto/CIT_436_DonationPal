import '../DonationsDetails/DonationsDetails.css';
import { Link } from 'react-router-dom';
import useDataGetter from '../../hooks/useDataGetter';

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear().toString().substr(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
}

function UserDonations(props) {

    const [loading, data ] = useDataGetter('campaigns', 1, "");

    let Date = formatDate(props.date);
    let Name = "Loading...";
    let link = "";

    for (let i = 0; i < data.length; i++) {
        if (props.campaign_id === data[i]._id) {
            Name = data[i].name;
            link = data[i]._id;
        }
    }

    return (
        <tr>
            <Link to={`/details/${link}`}>
                <th>{Name}</th>
            </Link>
            <th>{`$${props.amount}`}</th>
            <th>{Date}</th>
        </tr>
    );
}

export default UserDonations;
