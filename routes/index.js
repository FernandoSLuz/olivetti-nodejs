let express = require('express');
let router = express.Router();

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

module.exports = router;
