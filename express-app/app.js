var express = require('express');
var chalk = require('chalk');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
const nav = [{ link: '/books', title: 'Book' }, { link: '/authors', title: 'Author' }]
// const bookRouter = express.Router();
const bookRouter = require('./src/routes/bookRoutes')(nav)
const adminRouter = require('./src/routes/adminRoutes')(nav)

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.get('/', (req, res) => {
    res.render('index', { nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }], title: 'Book Library' })
});

// app.get('/books', (req, res) => {

// })
app.listen(3000, () => {
    console.log(`listening on the port: ${chalk.green(port)}`);
});