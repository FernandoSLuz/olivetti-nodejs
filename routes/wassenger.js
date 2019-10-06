const express = require('express');
const router = express.Router();
const axios = require('axios').default;

// Make Axios Instance
const axiosInstance = axios.create({
    baseURL: process.env.URL_ROOT,
    timeout: 15000,
    headers: {
        'Authorization' : `Bearer ${process.env.APIKEY_SELFSCANNER}`
    }
})

router.post('/webhook', async (req, res) => {

    console.log('WEBHOOK')
    console.log(req.body)

    const queryText = req.body.queryResult.queryText
    const displayName = req.body.queryResult.intent.displayName

    console.log('queryText => ', queryText)
    console.log('displayName => ', displayName)
    
    switch(displayName){
        case 'view products':
            response = await getAllProducts()
            break
        case 'products':
            response = await getAllProducts()
            break
        case 'add_product':
            response = await addProduct(data)
            break
        case 'get_product_by_id':
            response = await getProductById(data)
        default:
            response = {status: 'not found'}
    }

    res.status(200).send(response)

})

// Recupera lista de produtos

const getAllProducts = async () => {

    const response = await axiosInstance.get('/products')

    console.log('getAllProducts', response.data)

    return response.data

}

const addProduct = async (data) => {

    const response = await axiosInstance.post('/products', data)

    console.log('addProduct', response.data)

    return response.data

}

const getProductById = async(data) => {




}

// const addProduct = async (data) => {

//     let options = {
//         method: 'POST',
//         uri: `${process.env.URL_ROOT}/products`,
//         headers: {
//             'Authorization' : `Bearer ${process.env.APIKEY_SELFSCANNER}`
//         },
//         resolveWithFullResponse: true,
//         json: true
//     }

//     let response = await rp(options)

//     return response.body

// }


module.exports = router;