import React, { useContext } from 'react';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import DataStore from "../../dataStore/dataStore";
import { useNavigate } from "react-router-dom";


function Header() {

    //CALL THE DATASTORE GLOBAL VARIABLE FROM STORE
    const { user } = useContext(DataStore);

    const navigate = useNavigate();

    return (
        <Navbar bg="dark" sticky="top">
            <Navbar.Collapse>
                <Container fluid className="headertext">
                    <Row>
                        <Col></Col>
                        <Col xs={4}>
                            {user ? <h4>Welcome, {user.firstname}</h4> : <h4>Welcome</h4>}
                        </Col>
                        <Col></Col>
                        <Col className="right-align">
                            <button className="search-icon" onClick={() => { navigate('/searchResults') }}>
                                <img src="../../../images/mg-white.svg" className="icon" alt="search" />
                            </button>
                        </Col>
                    </Row>
                </Container>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;