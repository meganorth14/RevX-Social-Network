import { useState } from 'react';
import axios from 'axios';

function Post({postid, profilePic, userid, username, accountType, image, content, postdate, likes, setReportInfo}){

    const [liked, setLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(likes);

    let pubDate = new Date(postdate).toLocaleString("en-US",
            {dateStyle:"medium", timeStyle:"short", hour12:true});

    function handleClick() {

        //update like count
        if (!liked) {
            setLiked(true);
            setNumLikes(numLikes + 1);
            axios.put(`http://localhost:4000/posts/likes/${postid}`, { likes: (numLikes+1) });

        //user is removing their like
        } else {
            setLiked(false);
            setNumLikes(numLikes - 1);
            axios.put(`http://localhost:4000/posts/likes/${postid}`, { likes: (numLikes-1) });
        }
    }

    function reportClick(){
        setReportInfo({show:true, userid:userid, username:username, postid:postid});
    }

    return (
        <div className="post-container">

            {/* Heading - profilePic, name, follow button */}
            <img src={profilePic ? "../../../images/" + profilePic : "../../../images/user-badge-purple.svg"} className="user-badge" alt="user badge" />
            
            {/* link to user profile */}
            <span>{username}</span> <small className="account-label"><i>{accountType}</i></small>

            {/* report button */}
            <button className="reportbtn" onClick={reportClick}>Report</button>

            {/* Post body content */}
            <div className="post-content">
                {image?<img src={image} alt="user upload"/>:""}
                <p>{content}</p>
            </div>
            <small className="post-date">{pubDate}</small>

            {/* Post footer - likes, share, report */}
            <div className="post-footer">
                {/* like icon/ number of likes */}
                <button className={liked? "liked-button": "not-liked-button"} onClick={handleClick}>Like</button>
                <span>{numLikes}</span>
            </div>

        </div>
    );
}

export default Post;