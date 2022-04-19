import Header from "../navbar/Header";
import PostInput from '../posts/PostInput';
import PostFeed from '../posts/PostFeed';
import React, { useContext, useState } from 'react';
import DataStore from "../../dataStore/dataStore";
import ReportForm from "../users-comps/ReportForm";


const Main = () => {

    //CALL THE DATASTORE GLOBAL VARIABLE FROM STORE
    const { user } = useContext(DataStore);
    const [createNewPost, setCreateNewPost] = useState(null);
    const [reportInfo, setReportInfo] = useState({show:false});

    return (
        <>
            <Header />
            <PostInput setCreateNewPost={setCreateNewPost}/>
            {user ? <PostFeed newPost={createNewPost} setReportInfo={setReportInfo}/> : ""}
            {reportInfo.show ? 
                <ReportForm reportInfo={reportInfo} setReportInfo={setReportInfo} />
                : ""}

        </>
    );
};

export default Main;
