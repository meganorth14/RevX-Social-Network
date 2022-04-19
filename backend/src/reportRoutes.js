const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconnect');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// to retrieve all reports
//// http://localhost:4000/categories/getAllReports
app.get('/getAllReports', (req, res) => {
    db.query('SELECT * FROM report', (error, results) => {
        if (error) {
            throw error
        } else
            res.status(200).json(results.rows);
    })
});

// get all reports against a specific user
// http://localhost:4000/categories/reportByReportid/id
app.get("/reportByUserid/:userid", (req, res) => {
    const userid = req.params.userid;

    db.query('SELECT * FROM report WHERE userid=$1', [userid], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            res.status(200).json(results.rows);
        } else {

            res.status(200).json(null);
        }
    });
});


// Make a new report
// http://localhost:4000/categories/newReport
app.post('/newReport', (req, res) => {
    let { userid, username, postid, issue } = req.body;

    db.query('INSERT INTO report (userid, username, postid, issue) VALUES ($1, $2, $3, $4) RETURNING caseid',
        [userid, username, postid, issue], (error, results) => {

            if (error) {
                throw error;
            }

            let caseid = results.rows[0].caseid;
            res.status(200).send({caseid});
        }
    );
})

// get specific report
// http://localhost:4000/categories/retrieveReport/caseid
app.get("/retrieveReport/:caseid", (req, res) => {
    const caseid = req.params.caseid;

    db.query('SELECT * FROM report WHERE caseid=$1', [caseid], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            //id  found
            res.status(200).json(results.rows[0]);
        } else {
            //no category found
            res.status(200).json(null);
        }
    });
});

module.exports = app;