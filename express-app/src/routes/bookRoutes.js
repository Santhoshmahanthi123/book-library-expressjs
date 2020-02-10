
const express = require('express');
const bookRouter = express.Router();
const bookConroller = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

function router(nav) {
    // protecting the books route
    const { getIndex, getById, isSignedIn } = bookConroller(nav, bookService);
    bookRouter.use(isSignedIn)
    bookRouter.route('/')
        .get(getIndex);
    bookRouter.route('/:id')
        .get(getById);
    return bookRouter;

}

// module.exports = bookRouter;
module.exports = router;