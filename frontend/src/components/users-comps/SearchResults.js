import React, {useState} from 'react';
import axios from "axios";
import {FormControl, FormSelect, InputGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";

const SearchResults = () => {

    // TO RETRIEVE SEARCHED CONTENT FROM PERSISTANCE LATER
    const [retrieveInfo, setRetrieveInfo] = useState([]);
    const [search, setSearch] = useState('');
    const [searchCategory, setSearchCategory] = useState('Username')
    const [showNotFound, setShowNotFound] = useState(false)

    const navigate = useNavigate();

    //SEARCHING FOR INPUT WITH SEARCHVALUE
    function searchResultsUsername(searchValue) {

        axios.get(`http://localhost:4000/users/userByNameSearch/${searchValue}`)

            .then((response) => {

                setRetrieveInfo(response.data);

                //ERROR POINT HERE
                if (response.data.length === 0) {
                    setShowNotFound(true)
                } else {
                    setShowNotFound(false)
                }
            })
    }

    //SEARCHING FOR LOCATOIN BASED ON SEARCHVALUE
    function searchResultsLocation(searchValue) {

        axios.get(`http://localhost:4000/users/userByLocation/${searchValue}`)

            .then((response) => {
                setRetrieveInfo(response.data);
                if (response.data.length === 0) {
                    setShowNotFound(true)
                } else {
                    setShowNotFound(false)
                }
            })
    }

    return (
        <>
            <Navbar/>

            <section className="search-page">
                <h1>Search</h1>
                <div className="d-flex">
                    <InputGroup>
                        <FormSelect
                            className="searchPromptField searchField"
                            onChange={(e) => {
                                //BY SELECTED DROP DOWN OPTION, THE VALUE IS SET FOR THE FOLLWING PART
                                setSearchCategory(e.target.value);
                            }}>
                            <option>Username</option>
                            <option>Location</option>
                        </FormSelect>
                        <FormControl
                            placeholder="Search..."
                            className="searchField"
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                        />
                        <button
                            className="searchPromptField searchbutton"
                                onClick={() => {
                                    if (searchCategory === "Username") {
                                        searchResultsUsername(search)

                                    }
                                    if (searchCategory === "Location") {
                                        searchResultsLocation(search)
                                    }
                                }}>
                                Search
                        </button>
                    </InputGroup>
                </div>

                {/*//OUTPUT FOR NO RESULTS*/}
                {showNotFound && (<div className="no-post-message"><p>No results</p></div>)}

                {/*//OUTPUT OF THE REQUESTS*/}
                <div className="result-list">
                    {retrieveInfo.map(user => {
                        return(<div key={user.userid} className="searchresult">
                            <h4>{user.firstname} {user.lastname}</h4>
                            <span>@{user.username}</span>
                            <p>{user.city}, {user.state}</p>
                            <button
                                type="button"
                                className="viewprofilebtn"
                                onClick={() => navigate(`/userprofile/${user.username}`) }>
                                View Profile
                            </button>
                        </div>);
                    })}
                </div>
            </section>

        </>
    )

}

export default SearchResults;