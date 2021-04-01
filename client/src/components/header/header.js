import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="home-nav">
                <h2>Movies Catalog</h2>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/create">Create</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;