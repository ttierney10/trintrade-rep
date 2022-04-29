import React, { useState } from "react";
import {title_box, page_title, input_container} from './Elements/CreateSaleElements.js';
import {input_style, button_style, header_style, header_title_style, error_style, footer_style, 
        thanks_text, check_style, verify_text, signin_button} from './Elements/RegisterElements.js';
import {Input, Button} from 'antd';
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {getFirestore, collection, addDoc} from 'firebase/firestore';
import {app} from "../firebase.js";

export default function Register() {

    const auth = getAuth(app)
    const db = getFirestore(app)

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [username, setUsername] = useState('')
    const [trinEmail, setTrinEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cfmPassword, setCfmPassword] = useState('')
    const [PWDError, setPWDError] = useState(false)
    const [fnameInput, setFnameInput] = useState(false)
    const [lnameInput, setLnameInput] = useState(false)
    const [usernameInput, setusernameInput] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [emailInUse, setEmailInUse] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const email_check = "trincoll.edu"

    const onFNameChange = (event) => {
        setFname(event.target.value)
        setFnameInput(true)
    }
    const onLNameChange = (event) => {
        setLname(event.target.value)
        setLnameInput(true)
    }
    const onUsernameChange = (event) => {
        setUsername(event.target.value)
        setusernameInput(true)
    }
    const onTrinEmailChange = (event) => setTrinEmail(event.target.value)
    const onCfmPasswordChange = (event) => setCfmPassword(event.target.value)
    const onPasswordChange = (event) => setPassword(event.target.value)
    
    /*
        discuss with ben how we want to do the error protocols. 
        alternatively we could have simultaneous errors next to each incorrectly
        filled out field instead of a message at the end about the first
        error found
    */
    function userErrorCheck(){
        var ret = false
        if(!fnameInput){
            setErrorMessage("please enter a first name")
            ret = true
        }
        else if(!lnameInput){
            setErrorMessage("please enter a last name")
            ret = true
        }//add function to ensure username is unique!!!!!!!!!!!!!!!!
        else if(!usernameInput){
            setErrorMessage("please enter a username")
            ret = true
        }
        else if(password != cfmPassword || password.length < 6){
            setErrorMessage("please enter two matching passwords at least 6 letters")
            ret = true
        }/*
        else if(trinEmail.includes(email_check)){
            setErrorMessage("please enter a valid trinity email address")
            ret = true
        }*/
        return ret
    }

    const onRegister = () => {
        setEmailInUse(false)
        setInvalidEmail(false)
        const userError = userErrorCheck();
        if(!userError){
            createUserWithEmailAndPassword(auth, trinEmail, password)
                .then((userCredential) => {
                    var user = userCredential.user
                    var uid = user.uid
                    let payload = {fname, lname, username, trinEmail, uid}
                    addDoc(collection(db, "users"),{payload})
                    sendEmailVerification(auth.currentUser);
                })
                .catch(function(error){
                    if(error.code == "auth/email-already-in-use"){
                        setEmailInUse(true)
                    }
                    if(error.code == "auth/invalid-email"){
                        setInvalidEmail(true)
                    }
                })
        }
    }

    return(
        <div className={"register_container"}>
            Register biotch
            <div classname="register_inputs_container">
                <div classname="register_input_container">
                    <div classname="register_input_fname" style={input_style}>
                        <Input placeholder="First Name" value={fname} onChange={onFNameChange} required/>
                    </div>
                </div>
                <div classname="register_input_container" style={input_container}>
                    <div classname="register_input_lname" style={input_style}>
                        <Input placeholder="Last Name" value={lname} onChange={onLNameChange} />
                    </div>
                </div>
                <div classname="register_input_container" style={input_container}>
                    <div classname="register_input_username" style={input_style}>
                        <Input placeholder="Username" value={username} onChange={onUsernameChange} />
                    </div>
                </div>
                <div classname="register_input_container" style={input_container}>
                    <div classname="register_input_email">
                        <Input placeholder="Trinity Email" value={trinEmail} onChange={onTrinEmailChange} style={{display: "inline-block", width: "40%", marginLeft: "30%"}}/>
                    </div>
                </div>
                <div classname="register_input_container" style={input_container}>
                <h7 style={{marginLeft: "30%"}}>password must be 6 characters.</h7>
                    <div classname="register_input_password" style={input_style}>
                        <Input.Password placeholder="Password" value={password} onChange={onPasswordChange} />
                    </div>
                </div>
                <div classname="register_input_container" style={input_container}>
                        <div classname="register_input_cfmPassword">
                            <Input.Password placeholder="Confirm Password" value={cfmPassword} onChange={onCfmPasswordChange} style={{display: "inline-block", width: "40%", marginLeft: "30%"}}/>
                            {PWDError
                                ?
                                <p style={{display: "inline-block", wordWrap: "normal", fontSize: "small", color: "red", marginLeft: "5px"}}>passwords must match.</p>
                                :
                                <p></p>
                            }
                        </div>
                    </div>
                <div classname="register_input_button" style={button_style}>
                    <Button type="primary" onClick={onRegister} style={{marginBottom: "100px"}}>
                        Register
                    </Button>
                </div>
                
            </div>
        </div>
    );
}