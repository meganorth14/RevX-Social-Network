const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconnect'); 
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


// retrieve single user info from username
// http://localhost:4000/users/userByName/username

//GET USER
app.get("/userByName/:username", (req, res) => {
    const username = req.params.username;

    db.query('SELECT * FROM users WHERE username=$1', [username], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            //username found
            res.status(200).json(results.rows[0]);
        } else {
            //no user found
            res.status(200).json(null);
        }
    });
})

//THIS IS FOR THE GETTIING A USER BY USERNAMEn for the search bar
app.get("/userByNameSearch/:username", (req, res) => {
    const username = req.params.username;

    db.query('SELECT * FROM users WHERE username=$1', [username], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            //username found
            res.status(200).json(results.rows);
        } else {
            //no user found
            res.status(200).json([]);
        }
    });
})





//TO GET LOCATION
// http://localhost:4000/users/userByLocation/location
app.get("/userByLocation/:location", (req, res) => {
    const location = req.params.location;

    db.query('SELECT * FROM users WHERE city=$1', [location], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            //username found
            res.status(200).json(results.rows);
        } else {
            //no user found
            res.status(200).json([]);
        }
    });
})



//retrieve all users info from username
app.get("/allUsers", (req, res) => {

    db.query('SELECT * FROM users', (error, results) => {
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


//insert new user into database
// http://localhost:4000/users/newUser
app.post('/newUser', (req, res) => {
    let { firstname, lastname, username, password, city, state, email, account } = req.body;

    db.query('INSERT INTO users (firstname, lastname, username, password, city, state, email, account) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING userid',
        [firstname, lastname, username, password, city, state, email, account], (error, results) => {

        if (error) {
            throw error;
        }

        let userid = results.rows[0].userid;
        res.status(200).send({userid});
        }
    );
})

//updates user information based on form data
app.put('/updateUser/:userid', (req, res) => {

    let userid = req.params.userid;
    let user = req.body;

    db.query("UPDATE users SET firstname=$1, lastname=$2, username=$3, password=$4, email=$5, city=$6, state=$7, account=$8, pic=$9 WHERE userid=$10",
        [user.firstname, user.lastname, user.username, user.password, user.email, user.city, user.state, user.account, user.pic, userid], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Update successful for user with id: ${userid}`);
    });
})

// delete user by userId
//http://localhost:4000/users/deleteUser/username
app.delete('/deleteUser/:username', (req, res) => {

    let username = req.params.username;

    db.query("DELETE FROM report WHERE username=$1", [username], (error, results) => {
        if (error) {
            throw error;
        }

        db.query("DELETE FROM users WHERE username=$1", [username], (error, results) => {
            if (error) {
                throw error;
            }


            res.status(200).send(`${username}`);
        })

    });

})


//????
app.get('/totalusers/account/admin', (req, res) => {

    db.query("SELECT COUNT(account) FROM users WHERE account = 'admin'", (error, results) => {
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

//????
app.get('/totalusers/account/associate', (req, res) => {

    db.query("SELECT COUNT(account) FROM users WHERE account = 'associate'", (error, results) => {
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


app.get("/totalusers", (req, res) => {

    db.query('SELECT COUNT(userid) FROM users', (error, results) => {
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



app.post('/report/:userid', (req, res) => {

    let userid = req.param.userid;

    let { issue } = req.body;

    db.query('INSERT INTO report (issue) VALUES ($1) RETURNING userid',
        [issue], (error, results) => {

            if (error) {
                throw error;
            }

            let id = results.rows[0].userid;

            res.status(200).send({userid:id});
        }
    );
})



module.exports = app;