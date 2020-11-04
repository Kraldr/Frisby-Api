const ServicePostgres = require('../services/postgres')
const _servicepg = new ServicePostgres()

const getUsers =  async (request, response) => {

    const sql = 'SELECT * FROM USUARIOS INNER JOIN roles ON roles.idrol = usuarios.idrol'
    let responseDB = await _servicepg.execute(sql)
    let rowCount = responseDB.rowCount
    let rows = responseDB.rows

    rows = rows.map((x) => {
        delete x.clave
        return x;
    });

    let respondeJSON = {}
    respondeJSON.ok = true
    respondeJSON.message = 'Users Ok'
    respondeJSON.info = rows
    respondeJSON.metainfo = {total: rowCount}
    response.send(respondeJSON);
}; 

const postUsers = async (request, response) => {
    try{
    let sql = "INSERT INTO public.usuarios (ccusuario, tipo_identificacion, nombre, apellido, correo, celular, clave, idrol)"
    sql += " VALUES ($1, $2, $3, $4, $5, $6, md5($7), $8);";
    let body = request.body;
    let values = [
        body.ccusuario,
        body.tipo_identificacion,
        body.nombre,
        body.apellido,
        body.correo,
        body.celular,
        body.clave,
        body.idrol,
    ];

    await _servicepg.execute(sql, values)
    let respondeJSON = {}
    respondeJSON.ok = true
    respondeJSON.message = 'User created'
    respondeJSON.info = body
    response.send(respondeJSON);
    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while create user.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
<<<<<<< HEAD
};

const updateUser =  async (request, response) => {
    try {
        let id = request.params.id;
        let sql =
          "UPDATE public.usuarios SET celular = $1 WHERE ccusuario = $2;";
        let body = request.body;
        let values = [
            body.celular,
            id
        ];
        await _servicepg.execute(sql, values);
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "User updated";
        responseJSON.info = body;
        response.send(responseJSON);
        

    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while update user.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */

const deleteUser =  async (request, response) => {
    try {
        let sql = "DELETE FROM usuarios WHERE ccusuario = $1;";
        let id = request.params.id;
        let responseDB = await _servicepg.execute(sql, [id]);
        let rowCount = responseDB.rowCount;
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "Users deleted";
        responseJSON.info = [];
        responseJSON.metainfo = { total: rowCount };
        response.send(responseJSON);
    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while delete user.";
=======
};

const updateUser =  async (request, response) => {
    try {
        let id = request.params.id;
        let sql =
          "UPDATE public.usuarios SET celular = $1 WHERE ccusuario = $2;";
        let body = request.body;
        let values = [
            body.celular,
            id
        ];
        await _servicepg.execute(sql, values);
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "User updated";
        responseJSON.info = body;
        response.send(responseJSON);
        

    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while update user.";
>>>>>>> 737f131eafcd1766fbcf0000e6a0043c78b2ed4c
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

/**
<<<<<<< HEAD
 * 
 * @param {Request} request
 * @param {*} response
 */


const saveCV =  async (request, response) => {
    try {
        let archivo = request.files.fileUpload;
        await archivo.mv("api/Files/" + archivo.name);

        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "fileUpload CV.";
        responseJSON.info = archivo;
        response.status(400).send(archivo);


    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while create CV.";
=======
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */

const deleteUser =  async (request, response) => {
    try {
        let sql = "DELETE FROM usuarios WHERE ccusuario = $1;";
        let id = request.params.id;
        let responseDB = await _servicepg.execute(sql, [id]);
        let rowCount = responseDB.rowCount;
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "Users deleted";
        responseJSON.info = [];
        responseJSON.metainfo = { total: rowCount };
        response.send(responseJSON);
    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while delete user.";
>>>>>>> 737f131eafcd1766fbcf0000e6a0043c78b2ed4c
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

module.exports = { getUsers, postUsers, updateUser, deleteUser, saveCV }