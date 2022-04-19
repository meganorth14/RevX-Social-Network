import React, { useEffect, useState } from 'react';
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Header from '../navbar/Header';
import CategoryPost from './CategoryPost';

const CategoryPage = ({categoryid, title}) => {

    const [content, setContent] = useState([]);


    useEffect(() => {

        axios.get(`http://localhost:4000/categories/getcontentbycategoryid/${categoryid}`)
            .then((response) => {
                setContent(response.data);
            });

    }, [categoryid]);


    return (
        <>
            <Navbar />
            <Header />
            <div>
                <h1 className="category-title">{title}</h1>
                {content ?
                    content.map((article) => {
                        return (
                            <CategoryPost
                                key={article.id}
                                title={article.title}
                                bodyContent={article.mainbodycontent}
                            />
                        );
                    })
                    :
                    <div className="no-post-message">
                        <p>No posts yet. Check back soon!</p>
                    </div>
                }
            </div>
        </>
    );
};

export default CategoryPage;