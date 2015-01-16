var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;
	var BSON = require('mongodb').BSONPure;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("winesdb09");
    db.collection('wines', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});
 
exports.findById = function(req, res) {
    console.log(req.params);
    var id = req.params.id;
    console.log('findById: ' + id);
    db.collection('wines', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};

exports.findAll = function(req, res) {
    var name = req.query["name"];
    db.collection('wines', function(err, collection) {
        if (name) {
            collection.find({"name": new RegExp(name, "i")}).toArray(function(err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function(err, items) {
                res.jsonp(items);
            });
        }
    });
};

exports.addWine = function(req, res) {
	var wine = req.body;
	console.log('Adding wine: ' + JSON.stringify(wine));
	db.collection('wines', function(err, collection) {
		collection.insert(wine, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.jsonp(result[0]);
			}
		});
	});
}
 
 
exports.updateWine = function(req, res) {
	var id = req.params.id;
	var wine = req.body;
	console.log('Updating wine: ' + id);
	console.log(JSON.stringify(wine));
	db.collection('wines', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
			if (err) {
				console.log('Error updating wine: ' + err);
				res.send({'error':'An error has occurred'});
			} else {
				console.log('' + result + ' document(s) updated');
				res.jsonp(wine);
			}
		});
	});
}
 
exports.deleteWine = function(req, res) {
	var id = req.params.id;
	console.log('Deleting wine: ' + id);
	db.collection('wines', function(err, collection) {
		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred - ' + err});
			} else {
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);
			}
		});
	});
} 
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    console.log("Populating wines database...");
     var wines = [
		{
		name: "CHATEAU DE SAINT COSME",
		year: "2009",
		grapes: "Grenache / Syrah",
		country: "France",
		region: "Southern Rhone",
		description: "The aromas of fruit and spice...",
		picture: "saint_cosme.jpg"
		},
		{
		name: "LAN RIOJA CRIANZA",
		year: "2006",
		grapes: "Tempranillo",
		country: "Spain",
		region: "Rioja",
		description: "A resurgence of interest in boutique vineyards...",
		picture: "lan_rioja.jpg"
		},
		{
		name: "VITICCIO CLASSICO RISERVA",
		year: "2007",
		grapes: "Sangiovese Merlot",
		country: "Italy",
		region: "Tuscany",
		description: "Though soft and rounded in texture, the body of this wine is full and rich and oh-so-appealing. This delivery is even more impressive when one takes note of the tender tannins that leave the taste buds wholly satisfied.",
		picture: "viticcio.jpg"
		},
		{
		name: "CHATEAU LE DOYENNE",
		year: "2005",
		grapes: "Merlot",
		country: "France",
		region: "Bordeaux",
		description: "Though dense and chewy, this wine does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the senses.",
		picture: "le_doyenne.jpg"
		},
		{
		name: "DOMAINE DU BOUSCAT",
		year: "2009",
		grapes: "Merlot",
		country: "France",
		region: "Bordeaux",
		description: "The light golden color of this wine belies the bright flavor it holds. A true summer wine, it begs for a picnic lunch in a sun-soaked vineyard.",
		picture: "bouscat.jpg"
		},
		{
		name: "BODEGA LURTON",
		year: "2011",
		grapes: "Pinot Gris",
		country: "Argentina",
		region: "Mendoza",
		description: "Solid notes of black currant blended with a light citrus make this wine an easy pour for varied palates.",
		picture: "bodega_lurton.jpg"
		},
		{
		name: "MOMO MARLBOROUGH",
		year: "2010",
		grapes: "Sauvignon Blanc",
		country: "New Zealand",
		region: "South Island",
		description: "Best served chilled with melon or a nice salty prosciutto, this sauvignon blanc is a staple in every Italian kitchen, if not on their wine list. Request the best, and you just may get it.",
		picture: "momo.jpg"
		}
]; 
 
    db.collection('wines', function(err, collection) {
        collection.insert(wines, {safe:true}, function(err, result) {});
    });
 
};