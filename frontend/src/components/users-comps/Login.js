import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useContext, useState } from 'react';
import axios from "axios";

import DataStore from "../../dataStore/dataStore";
import "./forms.css";


function Login(props) {

    //CALL THE DATASTORE GLOBAL VARIABLE FROM STORE
    const { user, setUser } = useContext(DataStore);

    //potential error messages when validating form
    const [errorMessages, setErrorMessages] = useState({});
    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    //validates user information upon submit
    async function handleSubmit(e) {

        e.preventDefault();

        const loginForm = document.getElementById("loginform");
        var { username, password } = loginForm.elements;

        //check that username is not only whitespace
        if(!username.value.trim()){

            setErrorMessages({ name: "uname", message: errors.uname });

        } else {

            //check if username is in database
            const { data } = await axios.get(`http://localhost:4000/users/userByName/${username.value}`);

            if (data) {

                //username in system - check if passwords match
                if (data.password === password.value) {
                    props.setShowLogin(false);

                    //PASS DATA RECIEVED FROM AXIOS CALL TO SETUSER
                    setUser(data);
                    localStorage.setItem("user", JSON.stringify(data));
                    setErrorMessages({});

                } else {
                    // Invalid password
                    setErrorMessages({ name: "pass", message: errors.pass });
                }
            } else {
                // Username not found
                setErrorMessages({ name: "uname", message: errors.uname });
            }
        }
    }

    function renderErrorMessage(name) {
        if (name === errorMessages.name) {
            return (<div className="error">{errorMessages.message}</div>);
        }
    }

    //change which modal is showing on button click
    function changeForm(){
        props.setShowLogin(false);
        props.setShowSignup(true);
    }

    const renderForm = (
        <Modal
            show={props.showLogin}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName="form-dark"
        >
            <Form id="loginform" onSubmit={handleSubmit}>
                <Modal.Header bsPrefix="formheading-dark">
                    {/* <Modal.Header> */}
                    <h3>Sign In</h3>
                    <div className="formbuttons">
                        <button className="selectedbutton" disabled>
                            Sign In
                        </button>
                        <button className="unselectedbutton-dark" onClick={changeForm}>
                            Sign Up
                        </button>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">Enter username: </Form.Label>
                        <Form.Control 
                            bsPrefix="form-control form-dark" 
                            type="text" 
                            name="username" 
                            placeholder="username" 
                            required 
                        />
                        {renderErrorMessage("uname")}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">Enter password: </Form.Label>
                        <Form.Control 
                            bsPrefix="form-control form-dark" 
                            type="password" 
                            name="password" 
                            placeholder="password" 
                            required 
                        />
                        {renderErrorMessage("pass")}
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <button className="loginbtn" variant="none" type="submit">
                        Submit
                    </button>
                </Modal.Footer>
            </Form>
        </Modal>
    );


    //A LITTLE SET
    return ((user !== null) ? "" : renderForm);

}

export default Login;