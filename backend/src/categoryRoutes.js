const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconnect');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// get all categories
// http://localhost:4000/categories/getAll

app.get('/getAll', (req, res) => {
    db.query('SELECT * FROM category', (error, results) => {
        if (error) {
            throw error
        } else
            res.status(200).json(results);
    })
})



//THIS IS THE NEWEST WAY TO CREATE A POST
// http://localhost:4000/categories/createTip
app.post('/createTip', (req, res) => {
    let { categoryid, title, mainbodycontent } = req.body;

    db.query('INSERT INTO category (categoryid, title, mainbodycontent) VALUES ($1, $2, $3) RETURNING id',
        [ categoryid, title, mainbodycontent], (error, results) => {

            if (error) {
                throw error;
            }

            (results.rows[0].id).toString()

            let id = (results.rows[0].id).toString();
            // let id = results.rows[0].id;
            res.status(200).send(id);
            // res.status(200).send((results[0].id).toString());


        }
    );
})


// get category by id
// http://localhost:4000/categories/categoryById/id
app.get("/categoryById/:id", (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM category WHERE id=$1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            //id  found
            res.status(200).json(results.rows);
        } else {
            //no category found
            res.status(200).json(null);
        }
    });
});

// post new category
// http://localhost:4000/categories/newCategory
app.post('/newCategory', (req, res) => {
    let { id, categoryid, title, mainbodycontent, genreCategory } = req.body;

    db.query('INSERT INTO category (id, categoryid, title, mainbodycontent, genreCategory) VALUES ($1, $2, $3, $4, $5) RETURNING categoryid',
        [id, categoryid, title, mainbodycontent, genreCategory], (error, results) => {

        if (error) {
            throw error;
        }

        let id = results.rows[0].categoryid;
        res.status(200).send({id});
        }
    );
})



//THIS IS THE NEWEST WAY TO CREATE A POST

app.post('/createTip', (req, res) => {
    let { categoryid, title, mainbodycontent} = req.body;

    db.query('INSERT INTO category (categoryid, title, mainbodycontent) VALUES ($1, $2, $3, $4) RETURNING id',
        [ categoryid, title, mainbodycontent], (error, results) => {

            if (error) {
                throw error;
            }

            let id = results.rows[0].id;
            res.status(200).send({id});
        }
    );
})

// insert into category (id, categoryid, title, mainbodycontent, genrecategory)
// values (1, 1,'Java tips', 'In our article today, we will look at how you use polyphorism', 'Java');


//STEFAN'S ATTEMPT ---- This is the offical one
// get category by id
// http://localhost:4000/categories/getcontentbycategoryid/:1
app.get("/getcontentbycategoryid/:categoryid", (req, res) => {

    const categoryid = req.params.categoryid;

    db.query('SELECT * FROM category WHERE categoryid=$1', [categoryid], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount > 0) {
            //id  found
            res.status(200).json(results.rows);
        } else {
            //no category found
            res.status(200).json(null);
        }
    });
});

// http://localhost:4000/categories/totaltips
app.get('/totaltips/', (req, res) => {

    db.query("SELECT COUNT(id) FROM category", (error, results) => {
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

// http://localhost:4000/categories/totaltips/java
app.get('/totaltips/java', (req, res) => {

    db.query("SELECT COUNT(id) FROM category where categoryid=1", (error, results) => {
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

// http://localhost:4000/categories/totaltips/react
app.get('/totaltips/react', (req, res) => {

    db.query("SELECT COUNT(id) FROM category where categoryid=2", (error, results) => {
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

// http://localhost:4000/categories/totaltips/beginner
app.get('/totaltips/beginner', (req, res) => {

    db.query("SELECT COUNT(id) FROM category where categoryid=3", (error, results) => {
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

// http://localhost:4000/categories/totaltips/intermidate
app.get('/totaltips/intermidate', (req, res) => {

    db.query("SELECT COUNT(id) FROM category where categoryid=4", (error, results) => {
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

// http://localhost:4000/categories/totaltips/advanced
app.get('/totaltips/advanced', (req, res) => {

    db.query("SELECT COUNT(id) FROM category where categoryid=4", (error, results) => {
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


//TO POST A CATEGORY

//????
// http://localhost:4000/categories/newtips

app.post('/newtips', (req, res) => {

    let { tiptitle, tipbody, tipgenre } = req.body;

    db.query('INSERT INTO tips (tiptitle, tipbody, tipgenre) VALUES ($1, $2, $3) RETURNING tipid',
        [tiptitle, tipbody, tipgenre], (error, results) => {

            if (error) {
                throw error;
            }

            let tipid = results.rows[0].tipid;

            res.status(200).send(`tip content added with ID: ${tipid}`);
        }
    );
});


//FOR THE NULL BUTTON
// http://localhost:4000/categories/deleteCategory/caseid
app.delete('/deleteCategory/:caseid', (req, res) => {
        
    let caseid = req.params.caseid;
    db.query("DELETE FROM report WHERE caseid=$1", [caseid], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Report with caseid: ${caseid} is removed from reports list.`);

    });
})


//http://localhost:4000/categories/updateCategory/id
app.put('/updateCategory/:id', (req, res) => {

    let id = req.params.id;

    db.query("SELECT * FROM category WHERE id=$1", [id], (error, results) => {
        if (error) {
            throw error;
        }

        let prevInfo = {};

        if (results.rowCount > 0) {
            prevInfo = results.rows[0];
        }

        let category = { ...prevInfo, ...req.body };
// needs to be corrected
        db.query("UPDATE category SET title=$1, mainbodycontent=$2, genreCategory=$3 WHERE id=$4",
            [category.title, category.mainbodycontent, category.genreCategory, post.likes, post.postid], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).send(`Update successful for post with postid: ${postid}`);
            });
    })
})

// to delete a category
//http://localhost:4000/categories/deleteCategory/id
app.delete('/deleteCategory/:id', (req, res) => {

    let id = req.params.id;
    db.query("DELETE FROM category WHERE id=$1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Category with id: ${id} is succesfully deleted.`);

    });
})

module.exports = app;