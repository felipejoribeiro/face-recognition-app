const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile_id');
const image = require('./controllers/image');


// Creating and configuring the express server app
const app = express();
const port = 2033;
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

// Identifying the database
const pg = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'felipejoribeiro',
		password: '',
		database: 'smart-brain'
	}
});

// Home command to see if the server is running
app.get('/', (_, res) => {
	pg.select('*').from('users')
		.then(data =>{
			console.log(data);
			res.json("ok");
		})
		.catch(error => {
			console.log(error);
			res.status(400).json("Error")
		})
})

// End points:
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, pg, bcrypt)});

app.post('/register', (req, res) => { register.handleRegister(req, res, pg, bcrypt)});

app.get('/profile/:id', (req, res) => { profile.handleProfileId(req, res, pg)});

app.put('/image', (req, res) => { image.handleImageIncrement(req, res, pg)});


// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


// Database structure:
// CREATE TABLE users (
// 	id serial PRIMARY KEY,
// 	name VARCHAR(100),
// 	email text UNIQUE NOT NULL,
// 	entries BIGINT DEFAULT 0,
// 	joined TIMESTAMP NOT NULL
// );
//
// CREATE TABLE login (
// 	id serial PRIMARY KEY,
// 	hash VARCHAR(100) NOT NULL,
// 	email text UNIQUE NOT NULL
// )


// To execute:  npx nodemon face_recognition_back_end.js
app.listen(port, () => {
	console.log('App is running on port ' + port.toString());
})
