var dboCategoria = require('./dbCategoria');
var Categoria = require('./categoria');

//requerido en todos
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
//const Categoria = require('./categoria');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())
app.use(cors())
app.use('/api',router)//ruta principal

//ruta para todas las categorias
router.route('/categoria').get((request,response)=>{
    dboCategoria.getCategoria().then(result=>{
        response.json(result[0]);
    })
});

//ruta para categoria con id
router.route('/categoria/:id').get((request,response)=>{
    dboCategoria.getCategoria_x_id(request.params.id).then(result=>{
        response.json(result[0]);
    })
}); 

//ruta para guardar una categoria segun clase categoria
router.route('/categoria/guardar').post((request,response)=>{
    let categoria = {...request.body}
    dboCategoria.InsertCategoria(categoria).then(result=>{
        response.json(result[0]);
    })
}); 
//ruta para actualizar
router.route('/categoria/actualizar').post((request,response)=>{
    let categoria = {...request.body}
    dboCategoria.UpdateCategoria(categoria).then(result=>{
        response.json(result[0]);
    })
}); 
var port = process.env.PORT || 8090;
app.listen(port);
console.log(`Categoria API iniciando el puerto ${port}`); //mensaje de inicio de servicio