import './login.css';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import User from '../../services/User';
import ErrorMessage from '../error-message';


const Login = ({ setUserData }) => {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const [errorMsg, setErrorMsg] = useState('');

    const history = useHistory();

    const onInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const hideErrorBox = () => {
        setErrorMsg('');
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = inputs;

        if (password.length < 3) {
            setErrorMsg('Please, provide password 3 characters long or more.')
            throw (errorMsg);
        }

        try {
            const res = await User.login({ username, password });

            if (res.msg) {
                throw (res.msg)
            }

            setUserData(res);

            history.push('/');

        } catch (err) {
            setErrorMsg(err);
            console.error(err);
        }
    }

    return (
        <>
            <ErrorMessage
                err={errorMsg}
                hideErrorBox={hideErrorBox}
            />
            <section className="login-section">
                <div className="login-intro">
                    <h3>Login Form</h3>
                    <p>Please, Login here, or if you do not have an account<br /> feel free to <Link to="/register">Register</Link></p>
                </div>

                <form
                    className="login-form"
                    onSubmit={onFormSubmit}
                >
                    <div>
                        <label htmlFor="username">User name</label><br />
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onChange={onInputChange}
                            value={inputs.username}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br />
                        <input
                            type="text"
                            name="password"
                            id="password"
                            onChange={onInputChange}
                            value={inputs.password}
                        />
                    </div>
                    <button>Login</button>
                </form>

            </section>
        </>
    )
}

export default Login;