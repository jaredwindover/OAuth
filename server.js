var express    = require('express');
var session    = require('express-session');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var passport   = require('passport');
var ejs        = require('ejs');
var beerController   = require('./controllers/beer');
var userController   = require('./controllers/user');
var authController   = require('./controllers/auth');
var clientController = require('./controllers/client');
var oauth2Controller = require('./controllers/oauth2');

mongoose.connect('mongodb://BeerLocker:1o1u2a3m5d@ds031721.mongolab.com:31721/heroku_app37684533');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));

var port = process.env.PORT || 3000;

var router = express.Router();

router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

router.route('/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients)

router.route('/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);

app.use(passport.initialize());

app.use('/api',router);

app.listen(port);

console.log('Insert beer on port ' + port);
