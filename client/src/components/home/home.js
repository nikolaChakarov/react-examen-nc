import { Fragment } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

import img from '../../img/pexels-pixabay-265144.jpg';

const Home = () => {
    return (
        <Fragment>
            <section className="first-look">
                <h1>Welcome! To see our catalog, please:</h1>
                <div className="first-look-btn">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </section>

            <section className="intro">
                <div className="intro-img">
                    <img src={img} alt="pc photo" className="intro-pc" />
                </div>
                <div className="intro-text">
                    <h3>Hello, my name is Nikola Chakarov.</h3>
                    <p>So happy to share my first React procect with you.</p>
                </div>
            </section>
        </Fragment>
    )
}

export default Home;