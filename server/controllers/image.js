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
	handleImageIncrement: handleImageIncrement
}
