import React, { useContext, useState, useEffect } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import ProfilePics from './ProfilePics';
import { useNavigate, useParams } from 'react-router-dom';
import DataContext from "../../dataStore/dataStore";

function AccountForm() {

    const { user } = useContext(DataContext);
    const { accountname } = useParams();
    const [ profile, setProfile ] = useState({});
    const [profilePic, setProfilePic] = useState("user-badge-purple.svg");

    useEffect(() => {
        axios.get(`http://localhost:4000/users/userByName/${accountname}`)
            .then((response) => {

                if (response.data) {

                    setProfile(response.data);
                    if(response.data.pic){
                        setProfilePic(response.data.pic);
                    }
                }
            })
    }, [accountname]);
    

    //potential error messages when validating form
    const [errorMessages, setErrorMessages] = useState({});
    const errors = {
        fullname: "please enter your name",
        uname: "invalid username",
        unameused: "username taken",
        email: "invalid email format"
    };

    const navigate = useNavigate();
    

    //POST AXIOS & EMAIL AND VALIDATION
    function handleSubmit(e) {
        e.preventDefault();

        const regForm = document.getElementById("editaccountform");
        const { profilepic, first, last, username, password, city, state, email, account } = regForm;
        setErrorMessages({});

        const newInfo = {
            userid: profile.userid,
            pic: (profilepic.value ? profilepic.value : "user-badge-purple.svg"),
            firstname: (first.value.trim() ? first.value : profile.firstname),
            lastname: (last.value.trim() ? last.value : profile.lastname),
            username: (username.value.trim() ? username.value : profile.username),
            password: (password.value.trim() ? password.value : profile.password),
            city: (city.value.trim() ? city.value : profile.city),
            state: (state.value.trim() ? state.value : profile.state),
            email: (email.value.trim() ? email.value : profile.email),
            account: (account.value.trim() ? account.value : profile.account)
        }

        //if username is not ""
        if (username.value) {
            if (username.value !== profile.username) {
                //check if username is in database
                axios.get(`http://localhost:4000/users/userByName/${username.value}`).then((res) => {

                    const existingUser = res.data;

                    if (existingUser) {
                        //username taken
                        setErrorMessages({ name: "unameused", message: errors.unameused });

                    } else {
                        axios.put(`http://localhost:4000/users/updateUser/${profile.userid}`, newInfo).then((res) => {

                            setProfile(newInfo);
                        });

                    }
                });
            } else {
                axios.put(`http://localhost:4000/users/updateUser/${profile.userid}`, newInfo).then((res) => {

                    setProfile(newInfo);
                });
            }

        } else {
            axios.put(`http://localhost:4000/users/updateUser/${profile.userid}`, newInfo).then((res) => {

                setProfile(newInfo);
            });
        }

        navigate(`/userprofile/${accountname}`);
    }

    function renderErrorMessage(name) {
        if (name === errorMessages.name) {
            return (<div className="error">{errorMessages.message}</div>);
        }
    }

    function updatePreview(){
        const picOptions = document.querySelectorAll('input[name="profilepic"]');
        for(const option of picOptions){
            if(option.checked){
                setProfilePic(option.value);
                break;
            }
        }
    }

    const renderForm = (

        <Container className="account-page">
            <Form id="editaccountform" onSubmit={handleSubmit}>
                <Row className="justify-content-md-center">
                    <Col xs="auto">
                        <Form.Group>
                            <div className="profile-pic-dropdown">
                                <img src={"../../../images/"+profilePic}
                                    className="profile-pic" alt="User Avatar" />
                                <ProfilePics />
                            </div>
                        </Form.Group>
                        <button type="button" className="previewbtn" onClick={updatePreview}>
                            Preview Changes
                        </button>
                    </Col>

                    <Col md={6}>
                        <Card className="editform">
                            <Card.Header as="h3" bsPrefix='formheading'>
                                <span className="formtext" >Edit Account</span>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-2">
                                    <Form.Label>Enter first name: </Form.Label>
                                    <Form.Control type="text" name="first" placeholder={profile.firstname} />
                                    {renderErrorMessage("fullname")}
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label >Enter last name: </Form.Label>
                                    <Form.Control type="text" name="last" placeholder={profile.lastname} />
                                    {renderErrorMessage("fullname")}
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label >Enter username: </Form.Label>
                                    <Form.Control type="text" name="username" placeholder={profile.username} />
                                    {renderErrorMessage("unameused")}
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label >Enter password: </Form.Label>
                                    <Form.Control type="password" name="password" placeholder={profile.password} />
                                    {renderErrorMessage("pass")}
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label >Enter city: </Form.Label>
                                    <Form.Control type="text" name="city" placeholder={profile.city} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label >Enter state: </Form.Label>
                                    <Form.Select aria-label="Choose state" name="state" value={profile.state} >
                                        <option disabled hidden>Select State</option>
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
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label >Enter email: </Form.Label>
                                    <Form.Control type="email" name="email" placeholder={profile.email} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label >Position: </Form.Label>
                                    <Form.Select aria-label="Choose position" name="account" value={profile.account} >
                                        <option disabled hidden>Select position</option>
                                        <option value="associate">Associate</option>
                                        <option value="alumni">Alumni</option>
                                        <option value="trainer">Trainer</option>
                                        {user.account === 'admin' ?  <option value="admin">Admin</option> : ""}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <button className="loginbtn" variant="none" type="submit">
                                        Submit
                                    </button>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Container>
    );

    return renderForm;
};

export default AccountForm;
