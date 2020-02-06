
const express = require('express');
const bookRouter = express.Router();
function router(nav) {
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
    bookRouter.route('/')
        .get((req, res) => {
            res.render('bookListView',
                { nav, title: 'Book Library', books });
        });
    bookRouter.route('/:id')
        .get((req, res) => {
            const { id } = req.params;
            // res.send("Welcome to single book!");
            res.render('bookView',
                { nav, title: 'Book Library', book: books[id] });
        });
    return bookRouter;

}

// module.exports = bookRouter;
module.exports = router;