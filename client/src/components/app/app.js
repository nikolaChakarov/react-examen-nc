import './app.css';
import { Fragment, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../header';
import Home from '../home';
import Footer from '../footer';
import Register from '../register';
import Login from '../login';


import { setLocalStorage, getLocalStorage } from '../../services/auth';


const App = () => {

    const [user, setUser] = useState({ ...getLocalStorage() });

    const setUserData = (user) => {

        setLocalStorage(user);
        setUser(user);
    }

    return (
        <Fragment>
            <Header username={user.username} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register">
                    <Register setUserData={setUserData} />
                </Route>
                <Route path="/login">
                    <Login setUserData={setUserData} />
                </Route>

            </Switch>
            <Footer />
        </Fragment>
    )
}

export default App;