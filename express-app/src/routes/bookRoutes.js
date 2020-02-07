
const express = require('express');
const bookRouter = express.Router();
const { MongoClient, ObjectID } = require('mongodb')

function router(nav) {
    bookRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url, { useUnifiedTopology: true });
                    console.log("Connected to server!");
                    const db = client.db(dbName);
                    const col = await db.collection('books')
                    const books = await col.find().toArray();
                    res.render('bookListView',
                        { nav, title: 'Book Library', books })
                } catch (err) {
                    console.log(err);
                }
                client.close();
            }());
        });
    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url, { useUnifiedTopology: true });
                    console.log("Connected to server!");
                    const db = client.db(dbName);
                    const col = await db.collection('books');
                    const book = await col.findOne({ _id: new ObjectID(id) });
                    console.log(book);
                    res.render('bookView',
                        { nav, title: 'Book Library', book });
                } catch (err) {
                    console.log(err);
                }
            }())
            // res.send("Welcome to single book!");

        });
    return bookRouter;

}

// module.exports = bookRouter;
module.exports = router;