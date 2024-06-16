const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    console.log("Entre a ruta")
    const sdk = require('api')('@alegraswagger-test/v1.0#14m9benlp8nzwoq');
    sdk.auth('contabilidad@servicioinformatico.co', '6c1d5a1bb00ae9dc5e8f');
    sdk.getInvoices()
      .then(({ data }) => console.log(data))
      .catch(err => console.error(err));

});

module.exports = router;