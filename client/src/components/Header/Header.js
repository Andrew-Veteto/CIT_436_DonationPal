import { Navigate, Link as RouterLink } from 'react-router-dom';
import '../Header/Header.css';
import useToken from '../../hooks/useToken';

function Header() {

    const {token, setToken} = useToken();

    const handleLogout = () => {
        setToken(null);
        return <Navigate to="/logout" replace/>;
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <div className="container-fluid">
                    <a className='navbar-brand'>Donation Pal</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <RouterLink to='/' className='Header-link'>Home</RouterLink>
                            </li>
                            <li className='nav-item'>
                                <RouterLink to='/profile' className='Header-link'>Profile</RouterLink>
                            </li>
                            <li className='nav-item'>
                                {token ? (
                                    <RouterLink to='/logout' onClick={handleLogout} className='Header-link'>Logout</RouterLink>
                                ) : (
                                    <RouterLink to='/login' className='Header-link'>Login</RouterLink>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
