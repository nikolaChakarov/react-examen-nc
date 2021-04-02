import './register.css';
import { Link } from 'react-router-dom';


const Register = () => {
    return (
        <>
            <section className="register-section">
                <div className="register-intro">
                    <h3>Register Form</h3>
                    <p>Please, Register here, or if you have an account<br /> feel free to <Link to="/login">Login</Link></p>
                </div>
                <form className="register-form">
                    <div>
                        <label for="username">User name</label><br />
                        <input type="text" name="username" id="username" />
                    </div>
                    <div>
                        <label for="password">Password</label><br />
                        <input type="text" name="password" id="password" />
                    </div>
                    <div>
                        <label for="repeat-password">Repeat password</label><br />
                        <input type="text" name="repeatPasword" id="repeat-password" />
                    </div>
                    <button>Register</button>
                </form>

            </section>
        </>
    )
}

export default Register;