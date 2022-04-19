import React, {useEffect, useState} from 'react';
import AdminNavbar from "../AdminNavbar";
import axios from "axios";
import UsersChart from '../admincharts/UsersChart';


const UserPanel = () => {

    //GET ALL REQUEST
    const [allUser, setAllUser] = useState([]);
    //THE ORIGINAL STATE
    const [users, setUsers] = useState([]);
    //THE TOGGLE
    const [toggleAllUsers, setToggleAllUsers] = useState(false);
    //GET TOTAL ASOCIATE COUNT
    const [associateCount, setAssociateCount] = useState([])
    //GET TOTAL ADMIN ACCOUNT
    const [adminCount, setAdminCount] = useState([]);

    //STATE FOR SORTING BY ID
    const [sortById, setSortById] = useState(false);
    const [sortByUsername, setSortByUsername] = useState(false);
    const [sortByRole, setSortByRole] = useState(false);

    const [getReport, setGetReport] = useState([]);

    //DELETE A POST
    async function deleteReport(report) {
        deleteCaseId(report.caseid);

        axios.delete(`http://localhost:4000/posts/deletePost/${report.postid}`).then(data => {

            getReportMethod()
        })
    }

    //FOR THE NULL CASE
    function deleteCaseId(caseid) {

        axios.delete(`http://localhost:4000/categories/deleteCategory/${caseid}`).then(data => {

        });

        alert("successfully deleted case");
        getReportMethod()

    }


    //RETREIVE ALL USERS AND SHOW ALL THEIR DETAILS
    async function getAllUsers() {
        const data = await axios.get('http://localhost:4000/users/allUsers');
        setAllUser(data.data);
        setUsers(data.data);
    }

    //SORTING BY ID
    const sortingById = () => {

        const newData = users.sort((a, b) => {
            if (a.userid > b.userid) {
                return 1;
            }
            if (a.userid < b.userid) {
                return -1;
            }
            return 0;
        });

        setAllUser(newData);

        setSortById(prevId => !prevId);

    }

    //SORT BY NAME
    const sortingByUsername = () => {


        const newData = users.sort((a, b) => {
            if (a.username > b.username) {
                return 1;
            }
            if (a.username < b.username) {
                return -1;
            }
            return 0;
        });

        setAllUser(newData);

        setSortByUsername(prevUsername => !prevUsername);

    }

    //SORT BY ROLE
    const sortingByRole = () => {

        const newData = users.sort((a, b) => {
            if (a.account > b.account) {
                return 1;
            }
            if (a.account < b.account) {
                return -1;
            }
            return 0;
        });

        setAllUser(newData);

        // getAllUsers()
        setSortByRole(prevRole => !prevRole);

    }

    //DELETE USER

    // /deleteUser/:username

    async function deteleUser(username) {

        const data = await axios.delete(`http://localhost:4000/users/deleteUser/${username}`);
        alert("User Deleted");
        getAllUsers();
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

    async function getReportMethod() {
        const data = await axios.get('http://localhost:4000/reports/getAllReports');
        setGetReport(data.data);

    }

//GENERAL HUB FOR USEEFFECT
    useEffect(() => {

        //CALLING GET ALL USERS & DETAILS
        getAllUsers();
        //CALLING GET ALL TOTAL ADMIN
        getTotalAdminUsers()
        //CALLING GET ALL TOTAL ASSOCIATES
        getTotalAssociateUsers()

        getReportMethod();

    }, []);


    return (
        <>
            {/*IMPORTING ADMIN NAVBAR*/}
            <AdminNavbar/>

            <section id="adminSection" className="adminBackground fade-in-animation">

                {/*FLEX AND WRAPPER CONTENT CLASS*/}
                <div id="admin-wrapper" className="d-flex flex-column adminBody">

                    {/*HEADER TITLE*/}
                    <div className="d-sm-flex align-items-center justify-content-center mb-4">
                        <h1 className="text-center">User Panel</h1>

                    </div>

                    {/*OVERALL FACT ROW*/}
                    <div className="row mb-3">

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
                                                    Total Associates :
                                                </div>
                                                <div className=" text-center h5 mb-0 font-weight-bold text-gray-800">
                                                    {associateCount}
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
                                                    Total Admin :
                                                </div>
                                                <div className=" text-center h5 mb-0 font-weight-bold text-gray-800">
                                                    {adminCount}
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


                    {/*GET ALL USERS ROW*/}
                    <div className="row mb-3">


                        {/*COL FOR CARD*/}
                        <div className="col-xl-12 col-lg-12 col-md-12 mt-2">
                            <div className="card shadow h-100">
                                <div className="card-body">
                                    {/*CARD ROW*/}
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="fact-body">
                                                <div className="text-center text-xs font-weight-bold text-uppercase">
                                                    Get All Current Users :
                                                </div>

                                                <div className="text-center mt-5">
                                                    <button
                                                        className="buttonMainStyle"
                                                        role="button"
                                                        type="submit"
                                                        onClick={() => setToggleAllUsers(prevState => !prevState)}
                                                    >
                                                        Get Users
                                                    </button>

                                                    {toggleAllUsers &&
                                                        <aside>
                                                            <div className="fade-in-animation">
                                                                <div className="d-flex flex-row justify-content-around">
                                                                    <button className="adminbtn"
                                                                            onClick={sortingById}
                                                                    >
                                                                        Sort By Id
                                                                    </button>
                                                                    <button
                                                                        className="adminbtn"
                                                                        onClick={sortingByUsername}
                                                                    >
                                                                        Sort by Name
                                                                    </button>
                                                                    <button
                                                                        className="adminbtn"
                                                                        onClick={sortingByRole}
                                                                    >
                                                                        Sort By role
                                                                    </button>
                                                                </div>

                                                            </div>
                                                        </aside>
                                                    }


                                                    {toggleAllUsers &&

                                                        allUser.map((user, index) => {

                                                            return (

                                                                <aside key={user.userid} className="fade-in-animation">

                                                                    <div className="d-flex">
                                                                        <table
                                                                            className="table table-striped table-hover">
                                                                            <tbody className="text-center">
                                                                            <tr>
                                                                                <div className="row">

                                                                                    <div
                                                                                        className="d-flex justify-content-center">
                                                                                        {/*<div className="d-flex justify-content-center flex-md-row flex-column">*/}


                                                                                        <div
                                                                                            className="col-xl-2 col-lg-2 col-md-2 col-sm-1 col-1">
                                                                                            <td className="text-center">{user.userid}</td>
                                                                                        </div>
                                                                                        <div
                                                                                            className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-4">
                                                                                            <td className="text-center">{user.username}</td>
                                                                                        </div>
                                                                                        <div
                                                                                            className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-4">
                                                                                            <td className="text-center">{user.password}</td>
                                                                                        </div>
                                                                                        {/*<div className="col-md-3 col-sm-3 col-12"><td className="text-center">{user.email}</td></div>*/}
                                                                                        <div
                                                                                            className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
                                                                                            <td className="text-center">{user.account}</td>
                                                                                        </div>
                                                                                        <div
                                                                                            className="col-xl-2 col-lg-2 col-md-2 col-sm-1 col-1">
                                                                                            <button
                                                                                                className="adminDeletebtn"
                                                                                                onClick={() => deteleUser(user.username)}
                                                                                            >
                                                                                                <i className="bi bi-dash-square">-</i>
                                                                                            </button>
                                                                                        </div>

                                                                                        {/*Ent of flex tage    */}
                                                                                    </div>

                                                                                    {/*ENDING DIV FOR TABLE ROW    */}
                                                                                </div>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </aside>
                                                            );
                                                        })}
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

                    <div className="row">

                        {/*REPORT USER*/}
                        {/*COL FOR CARD*/}
                        <div className="col-xl-9 col-lg-9 col-md-9 mt-2">
                            <div className="card shadow h-100">
                                <div className="card-body">
                                    {/*CARD ROW*/}
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="fact-body">
                                                <div className="text-center text-xs font-weight-bold text-uppercase">
                                                    Report Users :
                                                </div>
                                                <div
                                                    className=" text-center h5 mb-0 font-weight-bold text-gray-800 mb-3">
                                                </div>
                                                <div className=" text-center h5 mb-0 font-weight-bold text-gray-800">

                                                    <div className="row">
                                                        <table>
                                                            <thead>
                                                            <th className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 reportTitle">Case</th>
                                                            <th className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 reportTitle">Post</th>
                                                            <th className="col-xl-1 col-lg-4 col-md-4 col-sm-4 col-4 reportTitle">User</th>
                                                            <th className="col-xl-5 col-lg-4 col-md-4 col-sm-4 col-4 reportTitle">Issue</th>
                                                            <th className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 reportTitle">OK</th>
                                                            <th className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 reportTitle"> Delete</th>

                                                            </thead>
                                                        </table>
                                                    </div>

                                                    {
                                                        getReport.map((report, index) => {
                                                            return (

                                                                <div key={report.caseid}>
                                                                    <div className="d-flex">
                                                                        <table
                                                                            className="table table-striped table-hover">
                                                                            <tbody className="text-center">
                                                                            <tr>
                                                                                <div className="row">

                                                                                    <div
                                                                                        className="d-flex justify-content-center">

                                                                                        <div
                                                                                            className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1">
                                                                                            <td className="text-center reportFont">{report.caseid}</td>
                                                                                        </div>
                                                                                        <div
                                                                                            className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1">
                                                                                            <td className="text-center reportFont">{report.postid}</td>
                                                                                        </div>
                                                                                        <div
                                                                                            className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                                                            <td className="text-center reportFont">{report.username}</td>
                                                                                        </div>
                                                                                        <div
                                                                                            className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                                                            <td className="text-center reportFont">{report.issue}</td>
                                                                                        </div>
                                                                                        <div
                                                                                            className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1">
                                                                                            <button
                                                                                                onClick={() => deleteCaseId(report.caseid)}
                                                                                                className="adminDeletebtn"
                                                                                            >
                                                                                                +
                                                                                            </button>
                                                                                        </div>
                                                                                        <div
                                                                                            className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1">
                                                                                            <button
                                                                                                onClick={() => deleteReport(report)}
                                                                                                className="adminDeletebtn"
                                                                                            >
                                                                                                <i className="bi bi-dash-square">-</i>
                                                                                            </button>
                                                                                        </div>

                                                                                        {/*Ent of flex tage    */}
                                                                                    </div>

                                                                                    {/*ENDING DIV FOR TABLE ROW    */}
                                                                                </div>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>


                                                            );
                                                        })

                                                    }


                                                </div>
                                            </div>
                                        </div>
                                        {/*END CARD ROW*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*COL END*/}


                        <div className="col-xl-3 col-lg-3 col-md-3 mt-2">
                            <div className="card shadow h-100">
                                <div className="card-body ">
                                    {/*CARD ROW*/}
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="fact-body">
                                                <div className="text-center text-xs font-weight-bold text-uppercase">
                                                    User Graph :
                                                </div>
                                                <div className=" text-center h5 mb-0 font-weight-bold text-gray-800">
                                                    Admin and Associates Totals
                                                </div>
                                                <div className=" text-center h5 mb-0 font-weight-bold text-gray-800">
                                                    <UsersChart adminCount={adminCount}
                                                                associateCount={associateCount}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/*END CARD ROW*/}
                                    </div>
                                </div>
                                {/*COL END*/}
                            </div>
                        </div>
                        {/*OVERALL FACT ROW*/}
                    </div>
                    {/* END OF WRAPPER CONTENT CLASS*/}
                </div>

            </section>

        </>
    );
};

export default UserPanel;

