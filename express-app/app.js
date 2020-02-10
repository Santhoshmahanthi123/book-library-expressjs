var express = require('express');
var chalk = require('chalk');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nav = [{ link: '/books', title: 'Book' }, { link: '/authors', title: 'Author' }]
// const bookRouter = express.Router();
const bookRouter = require('./src/routes/bookRoutes')(nav)
const adminRouter = require('./src/routes/adminRoutes')(nav)
const authRouter = require('./src/routes/authRoutes')(nav)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// for express session
app.use(session({ secret: 'library' }));
require('./src/config/passport.js')(app);
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('index', { nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }], title: 'Book Library' })
});

// app.get('/books', (req, res) => {

// })
app.listen(3000, () => {
    console.log(`listening on the port: ${chalk.green(port)}`);
});