import React from "react";
import {Link} from 'react-router-dom';

export default function Login() {
    return (
        <div className="Login_container">
            <Link to="/register">Sign Up</Link>
        </div>
    );
}