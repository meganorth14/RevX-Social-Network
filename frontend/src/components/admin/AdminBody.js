import React, {useEffect, useState} from 'react';
import axios from "axios";
import ContentChart from "./admincharts/ContentChart";
import SurveryChartRatings from "./admincharts/SurveryChartRatings";
import UsersChart from "./admincharts/UsersChart";

const AdminBody = () => {

    const [allUser, setAllUser] = useState([]);
    const [allPost, setAllPost] = useState([]);
    const [associateCount,setAssociateCount]=useState([])
    const [adminCount, setAdminCount] = useState([]);
    const [allTips, setAllTips] = useState([]);


    async function getAllUsers() {
        const data = await axios.get('http://localhost:4000/users/allUsers');
        setAllUser(data.data);
    }

    async function getAllPost() {
        const data = await axios.get('http://localhost:4000/posts/getAllPosts');
        setAllPost(data.data);
    }


    async function getAllTips() {
        const data = await axios.get('http://localhost:4000/categories/totaltips');
        const amount = data.data[0].count;
        setAllTips(amount);
    }


    //GET TOTAL AMIN USERS
    async function getTotalAdminUsers() {
        const data = await axios.get('http://localhost:4000/users/totalusers/account/admin');
        const amount = data.data[0].count

        setAdminCount(amount);
    }

    //GET TOTAL ASSOCIATE USERS
    async function getTotalAssociateUsers() {
        const data = await axios.get('http://localhost:4000/users/totalusers/account/associate');
        const amount = data.data[0].count

        setAssociateCount(amount);
    }




    //GET ALL USERS
    useEffect(() => {

        //CALLING GET ALL USERS & DETAILS
        getAllUsers();

        getAllPost();

        getTotalAdminUsers();

        getTotalAssociateUsers();

        getAllTips();


    },[]);


    return (
        <>
            <section id="adminSection" className="adminBackground fade-in-animation">

                {/*FLEX AND WRAPPER CONTENT CLASS*/}
                <div id="admin-wrapper" className="d-flex flex-column adminBody">

                    {/*HEADER TITLE*/}
                    <div className="d-sm-flex align-items-center justify-content-center mb-4">
                        <h1 className="text-center">Portal Information</h1>
                    </div>

                    {/*OVERALL FACT ROW*/}
                    <div className="row">

                        {/*FACT 1*/}
                        {/*COL FOR CARD*/}
                        <div className="col-xl-4 col-lg-4 col-md-4 mt-2">
                            <div className="card shadow h-100 ">
                                <div className="card-body purple-text-tag">
                                    {/*CARD ROW*/}
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="fact-body">
                                                <div className="text-center text-xs font-weight-bold text-uppercase">
                                                    Total Users :
                                                </div>
                                                <div className=" text-center h5 mb-0 font-weight-bold text-gray-800">

                                                    {allUser.length}

                                                </div>
                                            </div>
                                        </div>
                                        {/*END CARD ROW*/}
                                    </div>
                                </div>
                            </div>
                            {/*COL END*/}
                        </div>

                        {/*FACT 2*/}
                        {/*COL FOR CARD*/}
                        <div className="col-xl-4 col-lg-4 col-md-4 mt-2">
                            <div className="card shadow h-100">
                                <div className="card-body purple-text-tag">
                                    {/*CARD ROW*/}
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="fact-body">
                                                <div className="text-center text-xs font-weight-bold text-uppercase">
                                                    Total Posts :
                                                </div>
                                                <div className=" text-center h5 mb-0 font-weight-bold text-gray-800">
                                                    {allPost.length}
                                                </div>
                                            </div>
                                        </div>
                                        {/*END CARD ROW*/}
                                    </div>
                                </div>
                            </div>
                            {/*COL END*/}
                        </div>

                        {/*FACT 1*/}
                        {/*COL FOR CARD*/}
                        <div className="col-xl-4 col-lg-4 col-md-4 mt-2">
                            <div className="card shadow h-100">
                                <div className="card-body purple-text-tag">
                                    {/*CARD ROW*/}
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="fact-body">
                                                <div className="text-center text-xs font-weight-bold text-uppercase">
                                                    Total Tips :
                                                </div>
                                                <div className=" text-center h5 mb-0 font-weight-bold text-gray-800">
                                                    {allTips}
                                                </div>
                                            </div>
                                        </div>
                                        {/*END CARD ROW*/}
                                    </div>
                                </div>
                            </div>
                            {/*COL END*/}
                        </div>


                        <div className="row mb-3">

                        </div>


                        {/*POST CONTENT SECTION*/}
                        <div className="row mb-3">


                            {/*COL FOR CARD*/}
                            <div className="col-xl-6 col-lg-6 col-md-6 mt-2">
                                <div className="card shadow h-100">
                                    <div className="card-body">
                                        {/*CARD ROW*/}
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="fact-body">
                                                    <div
                                                        className="text-center text-xs font-weight-bold text-uppercase">
                                                        Categories Graph :
                                                    </div>
                                                    <div
                                                        className=" text-center h5 mb-0 font-weight-bold text-gray-800">
                                                        Total Post Per Genre
                                                    </div>
                                                    <div
                                                        className=" text-center h5 mb-0 font-weight-bold text-gray-800">
                                                        <ContentChart/>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*END CARD ROW*/}
                                        </div>
                                    </div>
                                </div>
                                {/*COL END*/}
                            </div>


                            {/*<div className="row">*/}

                            {/*GRAPH*/}
                            {/*COL FOR CARD*/}
                            <div className="col-xl-6 col-lg-6 col-md-6 mt-2">
                                <div className="card shadow h-100 ">
                                    <div className="card-body ">
                                        {/*CARD ROW*/}
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="fact-body">
                                                    <div
                                                        className="text-center text-xs font-weight-bold text-uppercase">
                                                        User Graph :
                                                    </div>
                                                    <div
                                                        className=" text-center h5 mb-0 font-weight-bold text-gray-800">
                                                        Admin  and Associates Totals
                                                    </div>
                                                    <div
                                                        className=" text-center h5 mb-0 font-weight-bold text-gray-800">
                                                        <UsersChart adminCount={adminCount} associateCount={associateCount}/>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*END CARD ROW*/}
                                        </div>
                                    </div>
                                </div>
                                {/*COL END*/}
                            </div>

                            {/*OVERALL FACT ROW*/}
                        </div>


                        {/*OVERALL FACT ROW*/}
                    </div>


                    {/* END OF WRAPPER CONTENT CLASS*/}
                </div>

            </section>

        </>
    );
};

export default AdminBody;
