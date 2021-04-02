import { Fragment } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

import img from '../../img/pexels-pixabay-265144.jpg';

const Home = ({ username }) => {

    const currentUserState = username ? <LoggedInLayout username={username} /> : <NotLoggedInLayout />;

    return (
        <Fragment>
            {currentUserState}
            <section className="intro">
                <div className="intro-img">
                    <img src={img} alt="pc" className="intro-pc" />
                </div>
                <div className="intro-text">
                    <h3>Hello, my name is Nikola Chakarov.</h3>
                    <p>So happy to share my first React procect with you.</p>
                </div>
            </section>
        </Fragment>
    )
}

const NotLoggedInLayout = () => {
    return (
        <section className="first-look">
            <h1>Welcome! To see our catalog, please:</h1>
            <div className="first-look-btn">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </section>
    )
}

const LoggedInLayout = ({ username }) => {
    return (
        <section className="first-look">
            <h1>Welcome {username}!</h1>
            <div className="first-look-btn">
                <Link to="/catalog">Catalog</Link>
            </div>
        </section>
    )
}

export default Home;