import axios from 'axios';
import {useContext} from 'react';
import DataStore from "../../dataStore/dataStore";

function PostInput({setCreateNewPost}){

    //CALL THE DATASTORE GLOBAL VARIABLE FROM STORE
    const { user } = useContext(DataStore);

    function handlePost(){
        
        const postInput = document.getElementById('postinput').elements['content'];
        const content = postInput.value;

        const newPost = {
            authorid: user.userid,
            posttext: content,
        }

        axios.post('http://localhost:4000/posts/newPost', newPost).then((res)=>{

            newPost.postid = res.data.postid;
            setCreateNewPost(newPost);

            postInput.value = "";
        });
    }

    const profilePic =  "../../../images/" + (user && user.pic ? user.pic : 'user-badge-purple.svg');

    return(<>
        <div className="post-container">

            <img src={profilePic} className="user-badge" alt="user badge" />
            <span>{user? user.username : "" }</span>

            <form id="postinput" className="post-input">
                <textarea name="content" className="form-control" rows="5" placeholder="Post your thoughts here..."></textarea>
                <button type="button" className="postbtn" onClick={handlePost}>Post</button>
            </form>            
        </div>
    </>);
}

export default PostInput;