const ServicePostgres = require('../services/postgres')
const _servicepg = new ServicePostgres()

const getLocalidad =  async (request, response) => {

    try {
        const sql = 'SELECT * FROM LOCALIDAD'
        let responseDB = await _servicepg.execute(sql)
        let rowCount = responseDB.rowCount
        let rows = responseDB.rows


        let respondeJSON = {}
        respondeJSON.ok = true
        respondeJSON.message = 'Localidades Ok'
        respondeJSON.info = rows
        respondeJSON.metainfo = {total: rowCount}
        response.send(respondeJSON);
    }catch(error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while get localidad.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }

    
}; 

const postLocalidad = async (request, response) => {
    try{
        let sql = "INSERT INTO LOCALIDAD (idlocalidad, nombrelocalidad)"
        sql += " VALUES ($1, $2);";
        let body = request.body;
        let values = [
            body.idlocalidad,
            body.nombrelocalidad,
        ];
    
        await _servicepg.execute(sql, values)
        let respondeJSON = {}
        respondeJSON.ok = true
        respondeJSON.message = 'Localidad created'
        respondeJSON.info = body
        response.send(respondeJSON);
    }catch (error) {
            let responseJSON = {};
            responseJSON.ok = false;
            responseJSON.message = "Error while create localidad.";
            responseJSON.info = error;
            response.status(400).send(responseJSON);
    }
};

const updateLocalidad =  async (request, response) => {
    try {
        let id = request.params.id;
        let sql =
          "UPDATE LOCALIDAD SET nombrelocalidad = $1 WHERE idlocalidad = $2;";
        let body = request.body;
        let values = [
            body.nombrelocalidad,
            id
        ];
        await _servicepg.execute(sql, values);
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "Localidad updated";
        responseJSON.info = body;
        response.send(responseJSON);
        

    } catch (error) {
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

const deleteLocalidad =  async (request, response) => {
    try {
        let sql = "DELETE FROM LOCALIDAD WHERE idlocalidad = $1;";
        let id = request.params.id;
        let responseDB = await _servicepg.execute(sql, [id]);
        let rowCount = responseDB.rowCount;
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "Localidad deleted";
        responseJSON.info = [];
        responseJSON.metainfo = { total: rowCount };
        response.send(responseJSON);
    } catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while delete user.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

module.exports = { getLocalidad, postLocalidad, updateLocalidad, deleteLocalidad }