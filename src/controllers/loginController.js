const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
	index: (req, res) => {
		res.render('login')
	},
	login: (req, res) => {
		
		let user = req.body.user;
		let pass = req.body.password;
		
		let userFinded = users.find(usr => usr.username == user)

		if (userFinded){			
				if (userFinded.password === pass){	
					req.session.userLogged = user;
					res.redirect('/')
				}
		}else{			
			let errors = []
			errors.push('Usuario não encontrado')			
			res.render('login', {errors})
		}
		
	},
};

module.exports = controller;
