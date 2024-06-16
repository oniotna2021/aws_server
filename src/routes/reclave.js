const express = require('express');
const router = express.Router();


router.post('/',async (req,res) => {

      console.log(req.body) 
      return res.json('Recibido');  

});

module.exports = router;