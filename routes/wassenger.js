const express = require('express');
const router = express.Router();

router.post('/webhook', (req, res) => {

    let data = req.body

    console.log('WEBHOOK')
    console.log(data)

    res.status(200).send({
        status: 'ok',
    })

})

module.exports = router;