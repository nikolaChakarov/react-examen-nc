import './app.css';
import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../header';
import Home from '../home';
import Footer from '../footer';
import Register from '../register';
import Login from '../login';


import { getUserData } from '../../services/auth';


const App = () => {


    return (
        <Fragment>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />

            </Switch>
            <Footer />
        </Fragment>
    )
}

export default App;