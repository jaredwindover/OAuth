var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var passport   = require('passport');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

mongoose.connect('mongodb://BeerLocker:1o1u2a3m5d@ds031721.mongolab.com:31721/heroku_app37684533');

var app = express();

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

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());

app.use('/api',router);

app.listen(port);

console.log('Insert beer on port ' + port);
