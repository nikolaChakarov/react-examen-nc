import './app.css';
import { Fragment } from 'react';
import Header from '../header';
import Home from '../home';
import Footer from '../footer';

const App = () => {
    return (
        <Fragment>
            <Header />
            <Home />
            <Footer />
        </Fragment>
    )
}

export default App;