import { Navigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { APIURLContext } from '../../contexts/APIURLContext';
import DonationDetails from '../../components/DonationsDetails/DonationsDetails'

export default function ProfilePage() {
    const { token, setToken } = useToken();
    const apiURL = useContext(APIURLContext);
    const [donations, setDonations] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const loadDonations = async () => {
            if (localStorage.getItem('local_ID') != null) {
                try {
                    const response = await axios.get(apiURL + '/donations/' + JSON.parse(localStorage.getItem('local_ID')));
                    setDonations(() => [...response.data]);
                    // console.log(apiURL + '/donations/' + JSON.parse(localStorage.getItem('local_ID')))
                } catch (err) {
                    console.log(err);
                }
            }
        }

        loadDonations();

    }, []);

    useEffect(() => {
        const loadUsers = async () => {
            if (localStorage.getItem('local_ID') != null) {
                try {
                    const response = await axios.get(apiURL + '/users/' + JSON.parse(localStorage.getItem('local_ID')));
                    setUserData(() => [...response.data]);
                } catch (err) {
                    console.log(err);
                }
            }
        }

        loadUsers();

    }, []);

    if (!token) {
        return <Navigate replace to='/login' />
    }

    const donationDetails = donations
        .map((donation) => (
            <DonationDetails
                key={nanoid()}
                _id={donation._id}
                amount={donation.amount}
                message={donation.message}
                date={donation.date}
            />
        ))

        return (
            <div>
                <h1>My Profile</h1>
                {userData.length > 0 ? (
                    <>
                        <h3>Hello, {userData[0].name.first}</h3>
                        <h5>Email: {userData[0].email}</h5>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
                <hr />
                <div>
                    <h2>Your Donations:</h2>
                </div>
                <div className='donationList'>
                    {donationDetails}
                </div>
            </div>
        );
        
}