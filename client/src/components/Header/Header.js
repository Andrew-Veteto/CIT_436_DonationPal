import { Link as RouterLink } from 'react-router-dom';
import '../Header/Header.css'

function Header() {
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
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

//<RouterLink to='/' className='Header-link'>Home</RouterLink>

export default Header;