const axios = require('axios')
const def = require('./default')

const url = 'produto'

const productRequest = {
    getProducts: () => axios({
        ...def,
        method: 'get',
        url: `${url}/`
    }),
    getCategoryProducts: (category) => axios({
        ...def,
        method: 'get',
        url: `${url}?category=${category}`
    }),
    getProduct: (id) => axios({
        ...def,
        method: 'get',
        url: `${url}/${id}`
    }),
    createProduct: (product) => axios({
        ...def,
        method: 'post',
        data: {
            ...product
        },
        url: `${url}/`
    }),
    editProduct: (product, id) => axios({
        ...def,
        method: 'patch',
        data: {
            ...product
        },
        url: `${url}/${id}`
    }),
    deleteProduct: (id) => axios({
        ...def,
        method: 'delete',        
        url: `${url}/${id}`
    })
}

module.exports = productRequest;