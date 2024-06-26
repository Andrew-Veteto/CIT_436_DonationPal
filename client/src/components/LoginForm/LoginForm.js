import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIURLContext } from '../../contexts/APIURLContext';
import axios from 'axios';
import useToken from '../../hooks/useToken';
import { Navigate } from 'react-router-dom';

export default function LoginForm() {
    const [inputs, setInputs] = useState({});
    const apiURL = useContext(APIURLContext);
    const {token, setToken} = useToken();
    const navigate = useNavigate();

    if (token) {
        return <Navigate replace to='/profile'/>
    }

    async function loginUser(credentials) {
        try{
            let res = await axios.post(apiURL + '/users/login', credentials);
            localStorage.setItem('local_ID', JSON.stringify(res.data._id));
            return res.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setInputs(values => ({...values, [fieldName]: fieldValue}));
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        let loginCredentials = {};
        loginCredentials.email = inputs.email;
        loginCredentials.password = inputs.password;
        const loginResponse = await loginUser(loginCredentials);
        if (loginCredentials == null) {
            alert('Check Input!');
        } else {
            try{
                setToken(loginResponse.accessToken);
                navigate('/profile');
            } catch (err) {
                alert('Check Input!');
            }
        }
    }

    return (
        <div>
            <form action="post" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="text" value={inputs.email || ""} name="email" onChange={handleChange}/>
                <br />
                <label>Password:</label>
                <input type="password" value={inputs.password} name="password" onChange={handleChange} />
                <br />
                <input type="submit" value="Log In"/>
            </form>
        </div>
    )
}