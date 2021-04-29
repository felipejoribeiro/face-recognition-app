const handleProfileId = (req, res, pg) => {
	const {id} = req.params;

	pg.select('*').from('users').where({id:id})
		.then(user => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json('Error')
			}
		})
		.catch(error => {
			console.log(error);
			res.status(400).json("Error");
		})
}

module.exports = {
	handleProfileId: handleProfileId
}
