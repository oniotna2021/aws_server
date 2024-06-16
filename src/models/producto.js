const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productId:{type:String},
    nombre: {type:String},    
    unidades: {type:Number},
    precio_compra:{type:Number},
    precio_venta:{type:Number},
    detalle:{type:String},
    categoria:{type:String},
    categoria1:{type:String},
    categoria2:{type:String},
    imagen:{type:String },
    imagen1:{type:String },
    imagen2:{type:String },
    imagen3:{type:String },
    descripcion:{type:String },
    sku:{type:String },
    urlfab:{type:String },
    urltecnica:{type:String },
    marca:{type:String},
    __v:{type:String}
    });

module.exports = mongoose.model('productos',productSchema);