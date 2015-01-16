var express = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    wines = require('./routes/wines'),
    app = express();
 
app.use(bodyParser());          // pull information from html in POST
app.use(methodOverride());      // simulate DELETE and PUT

app.use(express.static('../cellar/www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//Middlewares are functions applied to an HTTP request
//routes all requests for '/sessions' to middleware function session.findAll() --> .findAll = function(req, res) {....
app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);
//use with mongodb
app.post('/wines', wines.addWine);
app.put('/wines/:id', wines.updateWine);
app.delete('/wines/:id', wines.deleteWine); 

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
}); 

