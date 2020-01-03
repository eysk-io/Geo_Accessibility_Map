const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		Location = require('./models/location')
		
require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASS + '@cluster0-ykzpd.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useFindAndModify: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(()=> {
	console.log("Connected to the database!");
}).catch(err => {
	console.log("ERROR:", err.msg);
});

//Home page
app.get("/", (req, res)=> {
	Location.find({}, (err, locations)=> {
		if(err) console.log(err);
		else res.render("index", {locations: locations});
	});
});

//Show Route for Map input
app.post("/route", (req, res)=> {
	Location.find({name: req.body.name}, (err, location)=> {
		if(err) console.log(err);
		else res.render('route', {location: location[0]});
	});
});

var port = process.env.PORT || 3000;
app.listen(port, (req, res)=> {
    console.log('Server is connected to PORT ' + port);
});