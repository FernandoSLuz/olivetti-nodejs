const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const request = require('request')

// Make Axios Instance
const axiosInstance = axios.create({
    baseURL: process.env.URL_ROOT,
    timeout: 15000,
    headers: {
        'Authorization' : `Bearer ${process.env.APIKEY_SELFSCANNER}`
    }
})

router.post('/webhook_v2', (req, res) => {

    let url = 'https://eu70.chat-api.com/instance70942/sendMessage?token=yvve258m06f1amgr'

    let data = {
        phone: '5511997963602', 
        body: 'Ola Jairo!',
    };

    request({
        url: url,
        method: "POST",
        json: data
    }, () => {

        console.log('webhook request send success!')

        res.status(200).send({
            status: 'ok'
        })

    });

})

router.post('/webhook', async (req, res) => {

    console.log('WEBHOOK')
    console.log(req.body)

    if(req.body.queryResult != undefined){

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
            case 'insert product - response':
    
                const textArray = queryText.split(',')
    
                const sku = textArray[0] == undefined ? '' : textArray[0].trim()
                const name = textArray[1] == undefined ? '' : textArray[1].trim()
                const price = textArray[2] == undefined ? '' : textArray[2].trim()
                const tax = textArray[3] == undefined ? '' : textArray[3].trim()
    
                const postData = {
                    "productSku": sku,
                    "productName": name,
                    "productPrice": price,
                    "productTax": {
                        "taxPercentageValue": tax
                    }
                }
    
                response = await addProduct(postData)
    
                break
            case 'get_product_by_id':
                response = await getProductById(data)
            default:
                response = {status: 'not found'}
        }

        // Envia para o numero do WhatsApp
        let url = 'https://eu70.chat-api.com/instance70942/sendMessage?token=yvve258m06f1amgr'

        let data = {
            phone: phoneAuthor, 
            body: JSON.stringify(response),
        }
    
        request({
            url: url,
            method: "POST",
            json: data
        }, () => {
    
            console.log('webhook request send success!')
    
            res.status(200).send({
                status: 'ok'
            })
    
        });
    
        res.status(200).send(response)

    }

    if(req.body.messages != undefined){

        const queryText = req.body.messages[0].body
        
        let phoneAuthor = req.body.messages[0].author
        phoneAuthor = phoneAuthor.split('@')[0]

        switch(displayName){
            case 'view products':
                response = await getAllProducts()
                break
            case 'products':
                response = await getAllProducts()
                break
            case 'insert product - response':
    
                const textArray = queryText.split(',')
    
                const sku = textArray[0] == undefined ? '' : textArray[0].trim()
                const name = textArray[1] == undefined ? '' : textArray[1].trim()
                const price = textArray[2] == undefined ? '' : textArray[2].trim()
                const tax = textArray[3] == undefined ? '' : textArray[3].trim()
    
                const postData = {
                    "productSku": sku,
                    "productName": name,
                    "productPrice": price,
                    "productTax": {
                        "taxPercentageValue": tax
                    }
                }
    
                response = await addProduct(postData)
    
                break
            case 'get_product_by_id':
                response = await getProductById(data)
            default:
                response = {status: 'not found'}
        }
    
        res.status(200).send(response)


    }


})

// Recupera lista de produtos

const getAllProducts = async () => {

    const response = await axiosInstance.get('/products')

    const products = response.data.arr.slice(1).slice(-10)

    console.log('getAllProducts', products)

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