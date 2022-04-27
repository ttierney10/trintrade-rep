import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { Input, Button } from 'antd';
import { input_container } from './Elements/CreateSaleElements.js';
import { input_style, button_style } from './Elements/RegisterElements.js';

export default function Login() {

    const [trinEmail, setTrinEmail] = useState('')
    const [password, setPassword] = useState('')

    const onTrinEmailChange = (event) => setTrinEmail(event.target.value)
    const onPasswordChange = (event) => setPassword(event.target.value)

    return (
        <div className="Login_container">
            <Link to="/register">Sign Up</Link>
            <div classname="register_input_container" style={input_container}>
                <div classname="register_input_email" style={input_style}>
                    <Input placeholder="Trinity E-mail" value={trinEmail} onChange={onTrinEmailChange} />
                </div>
            </div>
            <div classname="register_input_container" style={input_container}>
                <div classname="register_input_password" style={input_style}>
                    <Input.Password placeholder="Password" value={password} onChange={onPasswordChange} />
                </div>
            </div>
        </div>
    );
}