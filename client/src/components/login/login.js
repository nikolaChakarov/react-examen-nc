import './login.css';
import { Link } from 'react-router-dom';

import { useState } from 'react';

const Login = () => {

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const onInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    return (
        <>
            <section className="login-section">
                <div className="login-intro">
                    <h3>Login Form</h3>
                    <p>Please, Login here, or if you do not have an account<br /> feel free to <Link to="/register">Register</Link></p>
                </div>
                <form className="login-form">
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