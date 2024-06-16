const express = require('express');
const router = express.Router();

const producto = require('../models/producto');

router.get('/', async (req,res) => {
    const productos = await producto.find();
    res.json(productos);
});

router.get('/:id', async (req,res) => {
    const productoSearch = await producto.findById(req.params.id);
    res.json(productoSearch)
});

router.post('/',async (req,res) => {
    //console.log(req.body)
    const { productId, nombre, unidades, precio_compra, precio_venta, detalle, categoria, categoria1, categoria2,imagen,imagen1,imagen2,imagen3,descripcion,sku,urlfab, urltecnica, marca, __v} = req.body;
    const productohere = new producto({
    productId:productId,
    nombre: nombre,    
    unidades: unidades,
    precio_compra:precio_compra,
    precio_venta:precio_venta,
    detalle:detalle,
    categoria:categoria,
    categoria1:categoria1,
    categoria2:categoria2,
    imagen:imagen,
    imagen1:imagen1,
    imagen2:imagen2,
    imagen3:imagen3,
    descripcion:descripcion,
    sku:sku,
    urlfab:urlfab,
    urltecnica:urltecnica,
    marca:marca,
    __v:__v
    });
        await productohere.save();
    res.json({status: 'Producto Registrado'});
});

router.put('/:id', async (req,res) =>{
    console.log(req.body)
    const { productId,unidades, precio_compra, precio_venta,imagen,imagen1,imagen2,imagen3,urltecnica, __v} = req.body;
    const nuevoProducto = {productId, unidades, precio_compra, precio_venta, imagen, imagen1, imagen2, imagen3,urltecnica, __v}
    await producto.findByIdAndUpdate(req.params.id, nuevoProducto)
    res.json({status:'Producto actualizado'}) 
});

router.delete('/:id', async (req,res) => {
    await producto.findByIdAndRemove(req.params.id);
    res.json({status:'Producto eliminado'})
});


module.exports = router;