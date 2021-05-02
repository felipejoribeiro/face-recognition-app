const handleRegister = (req, res, pg, bcrypt) => {
	const{email, name, password} = req.body;
	if (!email || !name || ! password){
		res.status(400).json("Null values inserted");
		return false;
	}
	bcrypt.hash(password, null, null, function(_, hash) {
		pg.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
				})
				.into('login')
				.returning('email')
				.then(loginEmail => {
					trx('users')
						.returning('*')
						.insert({
							email: loginEmail[0],
							name: name,
							joined: new Date()
						})
						.then(user => {
							res.json(user[0]);
						})
						.catch(_=> {
							res.status(400).json('unable to register')
						})
				})
				.then(trx.commit)
				.catch(_ => {
					res.status(400).json("error");
				})
		})
	})
}

module.exports = {
	handleRegister: handleRegister
}
