import React, { useState } from "react";
import {Link} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword, setPersistence} from 'firebase/auth';
import { Input, Button } from 'antd';
import { input_container } from '../css/CreateSaleElements.js';
import { input_style, button_style } from '../css/RegisterElements.js';
import bg2 from '../images/bg-2.jpg';
import '../css/textAnimation.css';
import '../css/login.css';
//import '../css/style.css';
//include loading screen type things
//need to make it so you can scroll when using on a mobile device
export default function Login() {

    const auth = getAuth()

    const [trinEmail, setTrinEmail] = useState('')
    const [password, setPassword] = useState('')

    const onTrinEmailChange = (event) => setTrinEmail(event.target.value)
    const onPasswordChange = (event) => setPassword(event.target.value)

    const onLogin = () => {

        setPersistence(auth.Auth.Persistence.SESSION).then(() => {
            signInWithEmailAndPassword(trinEmail, password)
            .then(function (result) {
                //setSignedIn(auth.currentUser.emailVerified)
                //window.location.replace("/home")
                console.log("logged in ya bomba")
            });
        })
        

        setTrinEmail('')
        setPassword('')
    }

    return (
        <div className="page_container">
            <div class="content">
                <h2 class="text_shadows">trin trade</h2>
            </div>
            <div className="login_container" >
                <img className="image" src={bg2} />
                <form className="login_form">
                    <div className="ugh">
                        <h3 className="login_title">Sign In</h3>
                    </div>
                    <div className="input_container">
                        <label className="label" htmlFor="name">Username</label>
                        <input type="text" className="username_input" placeholder="Username" required onChange={onTrinEmailChange}/>
                    </div>
                    <div className="input_container">
                        <label className="label" htmlFor="name">Password</label>
                        <input type="text" className="password_input" placeholder="Password" required onChange={onPasswordChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit_button" onClick={onLogin}>Sign In</button>
                    </div>
                    <div className="form-group d-md-flex">
                        <div className="w-50 text-left">
                            <label className="checkbox-wrap checkbox-primary mb-0">Remember Me
                            <input type="checkbox" checked/>
                            <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="w-50 text-md-right">
                            <a href="#">Forgot Password</a>
                        </div>
                    </div>
                    <p className="text-center">Not a member? <Link to="/register">Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
}