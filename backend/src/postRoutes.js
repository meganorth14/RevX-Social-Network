const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconnect');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// get all posts
// http://localhost:4000/posts/getAllPosts
app.get("/getAllPosts", (req, res) => {

    db.query('SELECT * FROM posts', (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            res.status(200).json(results.rows);
        } else {
            //no users found
            res.status(200).json(null);
        }
    });
})


//gets all posts with username
//http://localhost:4000/posts/withUserInfo
app.get('/withUserInfo', (req,res)=>{

    db.query('SELECT p.postid, p.posttext, p.postdate, p.likes, u.userid, u.username, u.account, u.pic FROM posts p LEFT JOIN users u ON p.authorid=u.userid ORDER BY postdate DESC', (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount > 0) {
            res.status(200).send(results.rows);
        } else {
            res.status(200).send(null);
        }
    });
});

// retrieve single post from posts table
// http://localhost:4000/posts/PostByid/id
app.get("/PostByid/:postid", (req, res) => {
    const postid = req.params.postid;

    db.query('SELECT * FROM posts WHERE postid=$1', [postid], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            //postid found
            res.status(200).json(results.rows[0]);
        } else {
            //no post found
            res.status(200).json(null);
        }
    });
})


// http://localhost:4000/posts/PostByUser/authorid
app.get("/PostByUser/:authorid", (req, res) => {
    const authorid = req.params.authorid;

    db.query('SELECT * FROM posts WHERE authorid=$1 ORDER BY postdate DESC', [authorid], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            //postid found
            res.status(200).json(results.rows);
        } else {
            //no post found
            res.status(200).json(null);
        }
    });
})



//add new post into database
// http://localhost:4000/posts/newPost
app.post('/newPost', (req, res) => {

    let { authorid, posttext } = req.body;

    db.query('INSERT INTO posts (authorid, posttext, postdate, likes) VALUES ($1, $2, now(), 0) RETURNING postid',
        [authorid, posttext], (error, results) => {

        if (error) {
            throw error;
        }
        let postid = results.rows[0].postid;

        res.status(200).json(postid);
    });
})

//updates user information based on form data
// http://localhost:4000/posts/updatePost/postid
//updates post content
app.put('/updatePost/:postid', (req, res) => {

    let postid = req.params.postid;

    db.query("UPDATE posts SET posttext=$1 WHERE postid=$2",
        [req.posttext, postid], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).end();
    });
})

//delete a post and remove reference from users
// http://localhost:4000/posts/deletePost/id
app.delete('/deletePost/:postid', (req, res) => {

    let postid = req.params.postid;
     

    //delete post from post table
    db.query("DELETE FROM posts WHERE postid=$1 RETURNING postid", [postid], (error, results) => {

        if (error) {
            throw error;
        }
        
      
        let userid = results.rows[0].postid;

        res.status(200).send({userid});
        // res.sendStatus(200);
    });
})



//chat initiate
app.post('/initchat', (req, res) => {
    console.log(req.body);

    const { userId1, userId2 } = req.body;

    console.log(userId1, userId2);

    //Compare the ids to the one in the table
    db.query("SELECT  * FROM chat where (userid1 = $userid2 and userid2 = $userid1) or (userid2 = $userid2 and userid1 = $userid1)", [userid1, userid2], (error, results) => {
        if (error) {
            throw error;
        }

        res.send("Chat initiated");
    });

});

// http://localhost:4000/posts/maxlikepost
app.get('/maxlikepost/', (req, res) => {

    db.query("SELECT MAX(likes) FROM posts", (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            res.status(200).json(results.rows);
        } else {
            //no users found
            res.status(200).json(null);
        }
    });
});

//updates number of likes
// http://localhost:4000/posts/likes/postid
app.put('/likes/:postid', (req, res) => {

    let postid = req.params.postid;

    db.query("UPDATE posts SET likes=$1 WHERE postid=$2",
        [req.body.likes, postid], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).end();
        });
})






module.exports = app;