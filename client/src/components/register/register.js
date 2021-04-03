import './register.css';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import User from '../../services/User';
import ErrorMessage from '../error-message';


const Register = ({ setUserData }) => {

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        repeatPassword: ''
    });

    const history = useHistory();

    const [errorMsg, setErrorMsg] = useState('');

    const hideErrorBox = () => {
        setErrorMsg('');
    }

    const onInputChanged = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const { username, password, repeatPassword } = inputs;

        if (password.length < 3) {
            setErrorMsg('Please, provide password 3 characters long or more.')
            throw (errorMsg);
        }

        if (password !== repeatPassword) {
            setErrorMsg('Passwords do not match.')
            throw (errorMsg);
        }

        try {

            const res = await User.register({ username, password, repeatPassword });

            if (res.error) {
                throw (res.error);
            }

            setUserData({ ...res });

            history.push('/');

        } catch (err) {
            setErrorMsg(err.msg);
            console.error(err);
        }

    }

    return (
        <>
            <ErrorMessage
                err={errorMsg}
                hideErrorBox={hideErrorBox}
            />
            <section className="register-section">
                <div className="register-intro">
                    <h3>Register Form</h3>
                    <p>Please, Register here, or if you have an account<br /> feel free to <Link to="/login">Login</Link></p>
                </div>

                <form
                    className="register-form"
                    onSubmit={onFormSubmit}
                >
                    <div>
                        <label htmlFor="username">User name</label><br />
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onChange={onInputChanged}
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
                            onChange={onInputChanged}
                            value={inputs.password}
                        />
                    </div>
                    <div>
                        <label htmlFor="repeat-password">Repeat password</label><br />
                        <input
                            type="text"
                            name="repeatPassword"
                            id="repeat-password"
                            onChange={onInputChanged}
                            value={inputs.repeatPassword}
                        />
                    </div>
                    <button>Register</button>
                </form>

            </section>
        </>
    )
}

export default Register;