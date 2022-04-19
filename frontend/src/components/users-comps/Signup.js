import React, {useContext, useState} from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import DataStore from "../../dataStore/dataStore";
import "./forms.css";

const Signup = (props) => {

    //CALL THE DATASTORE GLOBAL VARIABLE FROM STORE
    const { user, setUser } = useContext(DataStore);

    //potential error messages when validating form
    const [errorMessages, setErrorMessages] = useState({});
    const errors = {
        fullname: "please enter your name",
        uname: "invalid username",
        unameused: "username taken",
        email: "invalid email format",
        state: "please choose a state"
    };

    //POST AXIOS & EMAIL AND VALIDATION
    function handleSubmit(e){
        e.preventDefault();

        const regForm = document.getElementById("regform");
        const { first, last, username, password, city, state, email, account } = regForm;

        const emailFormat =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        //VALIDATOR & CHECK ALL FIELDS FILLED
        //check that username is not only whitespace
        if (!username.value.trim()) {

            setErrorMessages({ name: "uname", message: errors.uname });

        } else if (!email.value.trim() || !email.value.match(emailFormat)){

            setErrorMessages({ name: "email", message: errors.email });

        } else if (state.value === "unselected") {

            setErrorMessages({ name: "state", message: errors.state });
     
        } else {

            //check if username is in database
            axios.get(`http://localhost:4000/users/userByName/${username.value}`).then((res)=>{

                const existingUser = res.data;

                if (existingUser) {
                    //username in system - check if returning user
                    if (existingUser.password === password.value) {

                        props.setShowSignup(false);

                        //PASS DATA RECIEVED FROM AXIOS CALL TO SETUSER
                        setUser(existingUser);

                        setErrorMessages({});

                    } else {
                        //username taken
                        setErrorMessages({ name: "unameused", message: errors.unameused });

                    }
                } else {
                    // new user
                    const newUser = {
                        userid:null,
                        firstname:first.value,
                        lastname:last.value,
                        username:username.value,
                        password:password.value,
                        city:city.value,
                        state:state.value,
                        email:email.value,
                        account:account.value
                    }
                    axios.post(`http://localhost:4000/users/newUser`,newUser).then((res)=>{

                        props.setShowSignup(false);
                        newUser.userid = res.data.userid;
                        setUser(newUser);
                        localStorage.setItem("user", JSON.stringify(newUser));
                        setErrorMessages({});
                    });
                }
            })
        }
    }

    function renderErrorMessage(name) {
        if (name === errorMessages.name) {
            return (<div className="error">{errorMessages.message}</div>);
        }
    }

    function changeForm() {
        props.setShowLogin(true);
        props.setShowSignup(false);
    }

    const renderForm = (
        <Modal
            show={props.showSignup}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            contentClassName="form-dark"
        >
            <Form id="regform" onSubmit={handleSubmit}>
                <Modal.Header bsPrefix="formheading-dark">
                    <h3>Sign Up</h3>
                    <div className="formbuttons">
                        <button className="unselectedbutton-dark" onClick={changeForm}>
                            Sign In
                        </button>
                        <button className="selectedbutton" disabled>
                            Sign Up
                        </button>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">Enter first name: </Form.Label>
                        <Form.Control bsPrefix="form-control form-dark" type="text" name="first" placeholder="first name" required />
                        {renderErrorMessage("fullname")}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">Enter last name: </Form.Label>
                        <Form.Control bsPrefix="form-control form-dark" type="text" name="last" placeholder="last name" required />
                        {renderErrorMessage("fullname")}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">Enter username: </Form.Label>
                        <Form.Control bsPrefix="form-control form-dark" type="text" name="username" placeholder="username" required />
                        {renderErrorMessage("unameused")}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">Enter password: </Form.Label>
                        <Form.Control bsPrefix="form-control form-dark" type="password" name="password" placeholder="password" required />
                        {renderErrorMessage("pass")}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">Enter city: </Form.Label>
                        <Form.Control bsPrefix="form-control form-dark" type="text" name="city" placeholder="city" required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">Enter state: </Form.Label>
                        <Form.Select bsPrefix="form-select form-dark" aria-label="Choose state" name="state">
                            <option value="unselected">Select state</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CN">Connecticut</option>
                            <option value="DE">Deleware</option>
                            <option value="FL">Florida</option>
                            <option value="GE">Georgia</option>
                            <option value="HA">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KT">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NB">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PE">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </Form.Select>
                        {renderErrorMessage("state")}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">Enter email: </Form.Label>
                        <Form.Control bsPrefix="form-control form-dark" type="email" name="email" placeholder="email" required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label bsPrefix="form-dark">Position: </Form.Label>
                        <Form.Select bsPrefix="form-select form-dark" aria-label="Choose position" name="account" defaultValue={"associate"}>
                            <option disabled>Select position</option>
                            <option value="associate">Associate</option>
                            <option value="alumni">Alumni</option>
                            <option value="trainer">Trainer</option>
                        </Form.Select>
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

    return (user ? "" : renderForm);
};

export default Signup;