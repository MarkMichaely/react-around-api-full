import React from "react";
import { Link } from "react-router-dom";


function Register({ isLoggedIn, children, ...props }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister({ password, email })

    }

    return (
        <div className={"auth"}>
            <h2 className="auth__title">Sign up</h2>
            <form
                onSubmit={handleSubmit}
                className={`auth__form`}
            >
                <fieldset className="auth__fieldset">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="auth__input"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                </fieldset>
                <fieldset className="auth__fieldset">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="auth__input"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </fieldset>
                <fieldset className="auth__fieldset auth__fieldset_type_submit">
                    <button className="auth__button" type="submit">
                        Sign up
                    </button>
                </fieldset>
            </form>
            <p className="auth__footer">
                <Link to='/signin' className="auth__link">  Already a member? Log in here!
                </Link>
            </p>
        </div>
    );
}

export default Register;