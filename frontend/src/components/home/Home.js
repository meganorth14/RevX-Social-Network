import React, {useState, useContext} from 'react';
import Main from "./Main";
import Footer from "./Footer";
import Navbar from "../navbar/Navbar";
import Login from '../users-comps/Login';
import Signup from '../users-comps/Signup';
import DataStore from "../../dataStore/dataStore";

const Home = () => {

    const { user } = useContext(DataStore);

    const [showLogin, setShowLogin] = useState(!user);
    const [showSignup, setShowSignup] = useState(false);

    return (
        <>

            <Login 
                showLogin={showLogin} 
                setShowLogin={setShowLogin}
                setShowSignup={setShowSignup}
            />
            <Signup 
                showSignup={showSignup}
                setShowSignup={setShowSignup}
                setShowLogin={setShowLogin}
            />
            <Navbar setShowLogin={setShowLogin}/>
            <Main/>
            <Footer/>


        </>
    );
};

export default Home;
