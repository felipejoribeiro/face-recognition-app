const handleSignIn = (req, res, pg, bcrypt) => {
	const {email, password} = req.body;
	if (! email || !password) {
		res.status(400).json("Empty entries");
		return false;
	}
	pg.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const {hash} = data[0];
			bcrypt.compare(password, hash, function(_, res_comp) {
				if (res_comp){
					pg.select('*').from('users')
						.where('email','=', email)
						.then( user => {
							res.json(user[0]);
						})
						.catch(_ => {res.status(400).json("Error")})
				} else {
					res.status(400).json("Email or password incorrect")
				}
			});
		})
		.catch(_ => {res.status(400).json("Error")})
}

module.exports = {
	handleSignIn: handleSignIn
}
