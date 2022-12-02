const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')

const productRequest = require('../requests/productRequest')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		productRequest.getProducts().
		then(productsReturned => {
			products = productsReturned.data;
			res.render('products',{
				products, 
				toThousand
			})
		})
		.catch(error => {
			res.render('error',{error});
		})
		
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id		
		productRequest.getProduct(id).
		then(productReturn => {
			let product = productReturn.data;
			res.render('detail',{
				product,
				toThousand
			})
		})
		.catch(error => {
			res.render('error',{error});
		})
		
	},

	// Create - Form to create
	create: (req, res) => {		
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		/*let errors = validationResult(req)
		if (!errors.isEmpty()){
			return res.render('product-create-form', {errors: errors.errors})
		}*/

		let image;
		if (req.files[0] != undefined){
			image = req.files[0].filename
		}else{
			image = 'default-image.png'
		}
		let newProduct = {
			image: image,
			...req.body,			
		}

		productRequest.createProduct(newProduct).
		then(productReturn => {			
			res.redirect('/')
		})
		.catch(error => {
			res.render('error',{error});
		})
		
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id;
		let productToEdit;
		productRequest.getProduct(id)
		.then(productRet => {
			productToEdit = productRet.data;
			res.render('product-edit-form', {productToEdit})
		}
		)
		.catch(error => {
			res.render('error',{error});
		})
		
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let productToEdit;
		
		productRequest.getProduct(id)
		.then(productRet => {
			productToEdit = productRet.data;

			let image;
			if (req.files[0] != undefined){
				image = req.files[0].filename
			}else{
				image = productToEdit.image
			}

			productToEdit = {
				image: image,
				...req.body,			
			};

			return productToEdit
		})
		.then(productToEdit => {
			productRequest.editProduct(productToEdit, id)
			.then(edited => {
				res.redirect('/');
			})
		})
		.catch(error => {
			res.render('error',{error});
		})
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = req.params.id
		productRequest.deleteProduct(id)
		.then(deleted => {
			res.redirect('/')
		})	
		.catch(error => {
			res.render('error',{error});
		})	
	}
};

module.exports = controller;