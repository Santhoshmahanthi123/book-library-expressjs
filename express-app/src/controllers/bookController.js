const { MongoClient, ObjectID } = require('mongodb')
function bookController(nav, bookService) {
    function getIndex(req, res) {
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
    }
    function getById(req, res) {
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
                book.details = await bookService.getBookById(book.bookId);
                res.render('bookView',
                    { nav, title: 'Book Library', book });
            } catch (err) {
                console.log(err);
            }
        }())
        // res.send("Welcome to single book!");

    }
    function isSignedIn(req, res, next) {
        // This is used to protect the routed, if the user logged in then ponly he can access the route 
        // As of now we commented this , if you enable this it protects the required routes.
        // if (req.user) {
        //     next();

        // } else {
        //     res.redirect('/');
        // }
        next();

    }
    return {
        getIndex,
        getById,
        isSignedIn
    }

};
module.exports = bookController;