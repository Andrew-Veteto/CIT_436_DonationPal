import { Navigate } from "react-router-dom";

export default function LogoutPage() {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('local_ID');

    return (
        <div>
            <Navigate replace to='/' />
        </div>
    )
}