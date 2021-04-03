import './app.css';
import { Fragment, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../header';
import Home from '../home';
import Footer from '../footer';
import Register from '../register';
import Login from '../login';
import Logout from '../logout';

import Create from '../create';
import Catalog from '../catalog';
import Details from '../details';

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
                <Route exact path="/">
                    <Home username={user.username} />
                </Route>

                <Route path="/register">
                    <Register setUserData={setUserData} />
                </Route>

                <Route path="/login">
                    <Login setUserData={setUserData} />
                </Route>

                <Route path="/logout">
                    <Logout setUserData={setUserData} />
                </Route>

                <Route path="/create">
                    <Create />
                </Route>

                <Route path="/catalog">
                    <Catalog />
                </Route>

                <Route path="/details/:movie_id" component={Details} />


            </Switch>
            <Footer />
        </Fragment>
    )
}

export default App;