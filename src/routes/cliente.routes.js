const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const regSchema = require('../models/registrado');

const clientSchema = require('../models/cliente');



router.get('/', async (req,res) => {
     const clientes = await clientSchema.find();
     res.json(clientes);
});

router.get('/:email', async (req,res) => {
  const clienteSearch = await clientSchema.find({email:req.params.email});
  res.json(clienteSearch)
});

router.get('/:id', async (req,res) => {
    const clienteSearch = await clientSchema.findById(req.params.id);
    res.json(clienteSearch)
});

router.post('/',async (req,res) => {

      const noaut=req.body.auth
      if(noaut!=='12345#abc'){
        return res.status(401).json({error: 'No esta autorizado !'})
      }

      const emailExist=await clientSchema.findOne({email:req.body.email})
      
      if(emailExist){{
        return res.status(400).json({error: 'Email ya existe !'})
       }}else{

        const encryp=await bcrypt.genSalt(10);
    
        const password=await bcrypt.hash(req.body.password, encryp)
    
        const user=new clientSchema({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        pais: req.body.pais,
        ciudad: req.body.ciudad,
        direccion: req.body.direccion,
        documento: req.body.documento,
        clasificacion: req.body.clasificacion,
        echeck:req.body.echeck,
        celcheck:req.body.celcheck,
        regcomp:req.body.regcomp,
        fiscaltype:req.body.fiscaltype,
        password:password, 
        mailcode:req.body.mailcode,
    })
    
    clientSchema.create(user, (error, data) => {
        if (error) {
          return next(error);
        } else {
          return res.json('Usuario creado');
        }      
        });

    }

    

      let transport = nodemailer.createTransport({
        host: 'cp.clickpandahosting.com',
        port: 465,
        auth: {
           user: 'contacto@servicioinformatico.co',
           pass: 'Th14g0_4r0n'
        },
        tls: {
          rejectUnauthorized: false
      }        
    });

      const message = {
      from: 'contacto@servicioinformatico.co', // Sender address
      to: req.body.email,         // List of recipients
      subject: 'Valida tu correo para Servicio Informatico', // Subject line
      html: ` <h1 align="center">Bienvenido a Servicio Informatico</h1>
      <br>
      <div align="center"><img src="https://servicioinformatico.co/imagenes_app/logotipo/logobar.png"></div>
      <br>
      <h2 align="center">Valida tu codigo: ${req.body.mailcode}</h2>
      <br>
      <h2 align="center">en la siguiente direccion: <a href=" https://servicioinformatico.co/validar"> VALIDAR AQUI</a> <h2>
      <br>
      <h3 align="center">Servicio Informatico: <a href=">www.servicioinformatico.co">www.servicioinformatico.co</a></h3>
     `
  };

  transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
  });





});

router.put('/:id', async (req,res) =>{
    const {nombre,apellido,email,telefono,pais,ciudad,direccion,clasificacion,password} = req.body;
    const nuevoCliente = {nombre,apellido,email,telefono,pais,ciudad,direccion,clasificacion,password}
    await clientSchema.findByIdAndUpdate(req.params.id, nuevoCliente)
    res.json({status:'Cliente actualizado'})
    
    // console.log(req.params.id);
    // res.json('recibido desde put');
});

router.delete('/:id', async (req,res) => {
    await clientSchema.findByIdAndRemove(req.params.id);
    res.json({status:'Cliente eliminado'})
});


  



module.exports = router;
