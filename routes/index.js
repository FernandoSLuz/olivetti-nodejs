let express = require('express');
let router = express.Router();
let rp = require('request-promise');

const URL_ROOT = 'https://www.selfscanner.net/wsbackend/users/hackathon/'
const APIKEY_SELFSCANNER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhY2thdGhvbiIsInVzZXJUeXBlIjoicmVndWxhciIsImlhdCI6MTU2OTMzNDk0Mn0.wf6JYu6zt0gCxNPMPRWFae9vvlZrj9eaRAgXJIDP3kM'

/* GET home page. */
router.get('/node-express', function(req, res, next) {
  res.render('index', { title: 'Express Teste 123' });
});

router.post('/webhook', (req, res) => {

  let data = req.body

  res.status(200).send({
    status: 'ok',
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



const getAllProducts = async () => {

  var options = {
    uri: 'https://www.selfscanner.net/wsbackend/users/hackathon/products',
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
