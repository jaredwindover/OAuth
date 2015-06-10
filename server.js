var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');

mongoose.connect('mongodb://BeerLocker:1o1u2a3m5d@ds031721.mongolab.com:31721/heroku_app37684533');

var app = express();

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/', function(req,res) {
    res.json({message: 'You are running dangerously low on beer!'});
});

var beersRoute = router.route('/beers');

beersRoute.post(function(req, res) {
    var beer = new Beer();

    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;

    beer.save(function(err) {
	if (err) {
	    res.send(err);
	}
	res.json({ message: 'Beer added to the locker!', data: beer});
    });
});

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/api',router);

app.listen(port);

console.log('Insert beer on port ' + port);
