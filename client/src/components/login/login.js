import './login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <section className="login-section">
                <div className="login-intro">
                    <h3>Login Form</h3>
                    <p>Please, Login here, or if you do not have an account<br /> feel free to <Link to="/register">Register</Link></p>
                </div>
                <form className="login-form">
                    <div>
                        <label for="username">User name</label><br />
                        <input type="text" name="username" id="username" />
                    </div>
                    <div>
                        <label for="password">Password</label><br />
                        <input type="text" name="password" id="password" />
                    </div>
                    <button>Login</button>
                </form>

            </section>
        </>
    )
}

export default Login;