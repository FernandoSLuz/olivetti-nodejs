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

    console.log('NODE_ENV', process.env.NODE_ENV)

    let data = req.body

    console.log('WEBHOOK')
    console.log(data)

    // const intentType = data.intent_type.toLowerCase()

    const {intentType} = data
    
    switch(intentType){
        case 'products':
            
            response = await getAllProducts()
            break

        default:

            response = {status: 'not found'}
    }

    res.status(200).send(response)


    // res.status(200).send({
    //     status: 'ok',
    // })

})


// ### FUNCOES TESTE ###

// router.get('/intent_user/:intent_type', async (req, res) => {

//     const intentType = req.params.intent_type.toLowerCase()
//     let response = ''

//     switch(intentType){
//         case 'products':
//         response = await getAllProducts()
//         break
//         default:
//         response = {status: 'not found'}
//     }

//     res.status(200).send(response)

// })

// Recupera lista de produtos

const getAllProducts = async () => {

    const response = await axiosInstance.get('/products')

    console.log('getAllProducts', response.data)

    return response.data

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


// ### TESTE ###

// (async () => {
  
//   const resp = await getAllProducts()
//   console.log(resp)

// })()

module.exports = router;