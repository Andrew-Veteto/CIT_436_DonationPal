import '../DonationsDetails/DonationsDetails.css';
import useDataGetter from '../../hooks/useDataGetter';

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear().toString().substr(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
}

function DonationDetails(props) {

    const [loading, data] = useDataGetter('users', 1, props.user_id);

    let Name = "";
    let Date = formatDate(props.date);

    console.log(props);

    for (let i = 0; i < data.length; i++) {
        if (data[i]._id === props.user_id && props.name !== "") {
            Name = data[i].name.first + " " + data[i].name.last;
        }
    }

    if (Name === "") {
        Name = "Anonymous";
    }

    return (
        <tr>
            <th>{Name}</th>
            {/* <th>{props.user_id}</th> */}
            <th>{`$${props.amount}`}</th>
            <th>{Date}</th>
        </tr>
    );
}

export default DonationDetails;
