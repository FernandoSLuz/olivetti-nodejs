const express = require('express');
const router = express.Router();
const conn = require('../connection')
const uuidv4 = require('uuid/v4');

router.get('/get_all', async (req, res) => {

  const db = await conn.getDb()

  let sql = `SELECT * FROM tbl_users`

  db.query(sql, (error, results, fields) => {

    if(error) throw error

    res.status(200).send(results)

  })

})

router.post('/check_status', async (req, res) => {

  let phoneUser = req.body.phone

  // Normalize phoneNumber
  phoneUser = phoneUser.indexOf('+') == -1 ?  `+${phoneUser}` : phoneUser
  
  const db = await conn.getDb()

  let sql = `SELECT * FROM tbl_users WHERE phone = ? AND enabled=1`

  db.query(sql, [phoneUser], (error, results, fields) => {

    if(error) throw error

    if(results.length == 0){
      return res.status(418).send({
        status: 'Usuario inexistente'
      })
    }

    let resp = results[0]

    if(resp.isInAConversation == 0){

      const conversationId = uuidv4()
      sql = `UPDATE tbl_users SET isInAConversation=1, conversationId = ? WHERE phone = ?`

      db.query(sql, [conversationId, phoneUser], (error, updateResult) => {

        let respResult = results[0]
        respResult = {
          ...respResult,
          isInAConversation: 0,
          conversationId
        }

        if(req.query.onlyId != undefined){
          respResult = results[0].conversationId == null ? '' : results[0].conversationId.toString()
        }
  
        res.status(200).send(respResult)

      })
    
    }
    else{

      if(req.query.onlyId != undefined){
        resp = results[0].conversationId == null ? '' : results[0].conversationId.toString()
      }

      res.status(200).send(resp)
    }
    
  })

})

router.get('/check_status/:phone', async (req, res) => {

  let phoneUser = req.params.phone
  
  // Normalize phoneNumber
  phoneUser = phoneUser.indexOf('+') == -1 ?  `+${phoneUser}` : phoneUser
  
  const db = await conn.getDb()

  let sql = `SELECT * FROM tbl_users WHERE phone = ? AND enabled=1`

  db.query(sql, [phoneUser], (error, results, fields) => {

    if(error) throw error

    if(results.length == 0){
      return res.status(418).send({
        status: 'Usuario inexistente'
      })
    }

    let resp = results[0]

    if(resp.isInAConversation == 0){

      const conversationId = uuidv4()
      sql = `UPDATE tbl_users SET isInAConversation=1, conversationId = ? WHERE phone = ?`

      db.query(sql, [conversationId, phoneUser], (error, updateResult) => {

        let respResult = results[0]
        respResult = {
          ...respResult,
          isInAConversation: 0,
          conversationId
        }

        if(req.query.onlyId != undefined){
          respResult = results[0].conversationId == null ? '' : results[0].conversationId.toString()
        }
  
        res.status(200).send(respResult)

      })
    
    }
    else{

      if(req.query.onlyId != undefined){
        resp = results[0].conversationId == null ? '' : results[0].conversationId.toString()
      }

      res.status(200).send(resp)
    }
    
  })

})

module.exports = router;
