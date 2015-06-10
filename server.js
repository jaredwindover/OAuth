var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');

mongoose.connect('mongodb://BeerLocker:1o1u2a3m5d@ds031721.mongolab.com:31721/heroku_app37684533');

var app = express();

var port = process.env.PORT || 3000;

var router = express.Router();

router.route('/beers')
    .post(beerController.postBeers)
    .get(beerController.getBeers);

router.route('/beers/:beer_id')
    .get(beerController.getBeer)
    .put(beerController.putBeer)
    .delete(beerController.deleteBeer);

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/api',router);

app.listen(port);

console.log('Insert beer on port ' + port);
