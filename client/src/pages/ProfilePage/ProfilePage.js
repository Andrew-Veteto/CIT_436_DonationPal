import { Navigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { nanoid } from 'nanoid';
import UserDonations from '../../components/UserDonations/UserDonations';
import Header from '../../components/Header/Header';
import useDataGetter from '../../hooks/useDataGetter';

export default function ProfilePage() {
    const { token, setToken } = useToken();
    const [ loading, data, data2 ] = useDataGetter('donations', 1, JSON.parse(localStorage.getItem('local_ID')));
    const [ loading2, data3, data4 ] = useDataGetter('users', 1, JSON.parse(localStorage.getItem('local_ID')));

    if (!token) {
        return <Navigate replace to='/login' />
    }

    const donationDetails = data
        .map((donation) => (
            <UserDonations
                key={nanoid()}
                _id={donation._id}
                campaign_id = {donation.campaign_id}
                amount={donation.amount}
                message={donation.message}
                date={donation.date}
            />
        ))

    return (
        <div>
            <div>
                <Header />
            </div>
            <h1>My Profile</h1>
            {data3.length > 0 ? (
                <>
                    <h3>Hello, {data3[0].name.first}</h3>
                    <h5>Email: {data3[0].email}</h5>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
            <hr />
            <div>
                <h2>Your Donations:</h2>
            </div>
            <div className='donationList'>
                <div className="donation_table">
                    <table>
                        <thead>
                            <tr>
                                <th>Campaign</th>
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
    );

}