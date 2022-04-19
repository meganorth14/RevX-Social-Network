function ProfilePost({profile, post}){

    return(
        <div className="profile-post-container">

            {/* Heading - profilePic, name, follow button */}
            <img src={profile.pic ? "../../../images/" + profile.pic : "../../../images/user-badge-purple.svg"}
                className="user-badge" alt="user badge" />

            {/* link to user profile */}
            <span>{profile.username}</span>
            <small className="account-label">
                <i>{profile.accountType}</i>
            </small>

            {/* Post body content */}
            <div className="profile-post-content">
                <p>{post.posttext}</p>
            </div>
            <small className="post-date">
                {new Date(post.postdate).toLocaleString("en-US",
                    { dateStyle: "medium", timeStyle: "short", hour12: true })}
            </small>

            {/* Post footer - likes, share, report */}
            <div className="post-footer">
                {/* like icon/ number of likes */}
                <span>Likes: {post.likes}</span>
            </div>
        </div>
    );
}

export default ProfilePost;