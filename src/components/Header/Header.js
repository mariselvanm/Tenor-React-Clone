import tenorLogo from '../../assests/tenor-logo.svg';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return(
        <nav className="navbar">
            <div className="container">
                <Link to="/">
                    <img src={tenorLogo} alt="Logo" className='logo' />
                </Link>
            </div>
        </nav>
    );
}