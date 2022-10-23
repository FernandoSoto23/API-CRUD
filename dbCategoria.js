var config = require('./dbconfig'); // se instancia el documento dbconfig.js
const  sql = require('mssql'); // se necesita el paquete msql


//hacemos una funcion Asincrona para que nos devuelva un objeto
async function getCategoria(){
    try{
        let pool = await sql.connect(config);
        let categorias = await pool.request().query("SELECT * FROM TM_CATEGORIA");
        return categorias.recordsets;
    }catch(error){
        console.log(error);
    }
}

async function getCategoria_x_id(cat_id){
    try{
        let pool = await sql.connect(config);
        let categorias = await pool.request()
            .input("input_parameter",sql.Int,cat_id)
            .query("Select * from TM_CATEGORIA where CAT_ID = @input_parameter");
        return categorias.recordsets;
    }catch(error){
        console.log(error);
    }
}

async function InsertCategoria(categoria){
    try{
        let pool = await sql.connect(config);
        let Insertcate = await pool.request()
            .input("cat_id", sql.Int, categoria.cat_id)
            .input("cat_nom", sql.VarChar, categoria.cat_nom)
            .input("cat_obs", sql.VarChar, categoria.cat_obs)
            .input("cat_obs_detalle", sql.VarChar,categoria.cat_obs_detalle) //agregue este tambien
            .execute("sp_i_categoria_01");
        return Insertcate.recordsets;
    }catch(error){
        console.log(error);
    }
}

async function UpdateCategoria(categoria){
    try{
        let pool = await sql.connect(config);
        let Updatecate = await pool.request()
            .input("cat_id", sql.Int, categoria.cat_id)
            .input("cat_nom", sql.VarChar, categoria.cat_nom)
            .input("cat_obs", sql.VarChar, categoria.cat_obs)
            .input("cat_obs_detalle",sql.VarChar,categoria.cat_obs_detalle) //agregue esta instruccion
            .execute("sp_u_categoria_01");
        return Updatecate.recordsets;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    getCategoria:getCategoria,
    getCategoria_x_id:getCategoria_x_id,
    InsertCategoria:InsertCategoria,
    UpdateCategoria:UpdateCategoria
}