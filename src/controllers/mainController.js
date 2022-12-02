const fs = require('fs');
const path = require('path');

const productRequest = require('../requests/productRequest');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let visited;
let inSale;

const controller = {
	index: (req, res) => {
		productRequest.getCategoryProducts('visited').
		then(visitedRet => {
			return visitedRet;			
		})
		.then(visitedRet => {			
			visited = visitedRet.data;
			
			inSaleRet = productRequest.getCategoryProducts('in-sale')	
			return inSaleRet;					
		})
		.then(inSaleRet => {	
			inSale = inSaleRet.data;
			res.render('index',{
				visited,
				inSale,
				toThousand
			})		
		})
	},
	search: (req, res) => {
		//TODO: Criar rota para busca geral atribuindo queryParams genericos e retornando pela API
		let search = req.query.keywords;
		let produtctsToSearch = products.filter(product => product.name.toLowerCase().includes(search));
		res.render('results',{
		products: produtctsToSearch,
		search,
		toThousand
		});
	},
};

module.exports = controller;