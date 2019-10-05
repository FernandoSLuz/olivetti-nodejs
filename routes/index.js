const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const conn = require('../connection')

const URL_ROOT = 'https://www.selfscanner.net/wsbackend/users/hackathon'
const APIKEY_SELFSCANNER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhY2thdGhvbiIsInVzZXJUeXBlIjoicmVndWxhciIsImlhdCI6MTU2OTMzNDk0Mn0.wf6JYu6zt0gCxNPMPRWFae9vvlZrj9eaRAgXJIDP3kM'

/* GET home page. */
router.get('/node-express', function(req, res, next) {
  res.render('index', { title: 'Express Teste 123' });
});

router.post('/webhook', (req, res) => {

  let data = req.body

  console.log('WEBHOOK')
  console.log(data)

  res.status(200).send({
    status: 'ok',
  })

})

router.post('/check_user_status', async (req, res) => {

  const phoneUser = req.body.phone
  
  const db = await conn.getDb()

  const sql = `SELECT * FROM tbl_phones WHERE phone = ?`

  db.query(sql, [phoneUser], (error, results, fields) => {

    if(error) throw error

    res.status(200).send(results)

  })

})

router.get('/check_user_status/:phone', async (req, res) => {

  let phoneUser = req.params.phone
  
  // Normalize phoneNumber
  phoneUser = phoneUser.indexOf('+') == -1 ?  `+${phoneUser}` : phoneUser
  
  const db = await conn.getDb()

  const sql = `SELECT * FROM tbl_phones WHERE phone = ? AND enabled=1`

  db.query(sql, [phoneUser], (error, results, fields) => {

    if(error) throw error

    console.log(req.query)

    let resp = ''
    if(req.query.onlyId == undefined){
      resp = results[0]
    }
    else{
      resp = results[0].conversationId.toString()
    }

    res.status(200).send(resp)
    
  })

})


router.get('/intent_user/:intent_type', async (req, res) => {

  const intentType = req.params.intent_type.toLowerCase()
  let response = ''

  switch(intentType){
    case 'products':
      response = await getAllProducts()
      break
    default:
      response = {status: 'not found'}
  }

  res.status(200).send(response)

})


// Recupera lista de produtos

const getAllProducts = async () => {

  var options = {
    uri: `${URL_ROOT}/products`,
    headers: {
      'Authorization' : `Bearer ${APIKEY_SELFSCANNER}`
    },
    resolveWithFullResponse: true
  }

  let response = await rp(options)

  return response.body

}


// ### TESTE ###

// (async () => {
  
//   const resp = await getAllProducts()
//   console.log(resp)

// })()



module.exports = router;
