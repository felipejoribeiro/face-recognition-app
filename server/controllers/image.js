const [keys]  = require('./api_keys');
const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: keys.MY_API_KEY,
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL , req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(_ => {
			res.status(400).json("error");
		})
}

const handleImageIncrement = ('/image', (req, res, pg) => {
	const {id} = req.body;
	pg('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(_ => {
			res.status(400).json("error");
		})
})

module.exports = {
	handleImageIncrement,
	handleApiCall
}
