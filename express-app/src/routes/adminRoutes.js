
const express = require('express');
const { MongoClient } = require('mongodb')
const adminRouter = express.Router();
const books = [
    {
        author: "Chinua Achebe",
        title: "Things Fall Apart",
        year: 1958
    },
    {
        author: "Hans Christian Andersen",
        title: "Fairy tales",
        year: 1836
    },
    {
        author: "Dante Alighieri",
        title: "The Divine Comedy",
        year: 1315
    },
    {
        author: "Unknown",
        title: "The Epic Of Gilgamesh",
        year: -1700
    },
    {
        author: "Unknown",
        title: "The Book Of Job",
        year: -600
    },
    {
        author: "Unknown",
        title: "One Thousand and One Nights",
        year: 1200
    },
    {
        author: "Unknown",
        title: "Nj\u00e1l's Saga",
        year: 1350
    },
    {
        author: "Jane Austen",

        title: "Pride and Prejudice",
        year: 1813
    },
    {
        author: "Honor\u00e9 de Balzac",

        title: "Le P\u00e8re Goriot",
        year: 1835
    },
    {
        author: "Samuel Beckett",

        title: "Molloy, Malone Dies, The Unnamable, the trilogy",
        year: 1952
    }
]
function router(nav) {
    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';
            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url, { useUnifiedTopology: true });
                    console.log("Connected to server!");
                    const db = client.db(dbName);
                    const response = await db.collection('books').insertMany(books);
                    res.json(response);
                } catch (err) {
                    console.log(err);
                }
                client.close();

            }());
        })
    return adminRouter;
}
module.exports = router;