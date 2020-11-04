const ServicePostgres = require('../services/postgres')
const _servicepg = new ServicePostgres()

const getConvo =  async (request, response) => {

    try {
        const sql = 'SELECT * FROM CONVOCATORIA'
        let responseDB = await _servicepg.execute(sql)
        let rowCount = responseDB.rowCount
        let rows = responseDB.rows
        let respondeJSON = {}
        respondeJSON.ok = true
        respondeJSON.message = 'Convocatoria Ok'
        respondeJSON.info = rows
        respondeJSON.metainfo = {total: rowCount}
        response.send(respondeJSON);
    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while get Convocatoria.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }

    
}; 

const postConvo = async (request, response) => {
    try{
    let sql = "INSERT INTO CONVOCATORIA (idConvo, nombreConvo, idlocalidad, idLocal, tipoDeTrabajo)"
    sql += " VALUES ($1, $2, $3, $4, $5);";
    let body = request.body;
    let values = [
        body.idConvo,
        body.nombreConvo,
        body.idlocalidad,
        body.idLocal,
        body.tipoDeTrabajo,
    ];

    await _servicepg.execute(sql, values)
    let respondeJSON = {}
    respondeJSON.ok = true
    respondeJSON.message = 'Convocatoria created'
    respondeJSON.info = body
    response.send(respondeJSON);
    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while create Convocatoria.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

const updateConvo =  async (request, response) => {
    try {
        let id = request.params.id;
        let sql =
          "UPDATE CONVOCATORIA SET idConvo = $1, nombreConvo = $2, idlocalidad = $3, idLocal = $4, tipoDeTrabajo = $5 WHERE idConvo = $6;";
        let body = request.body;
        let values = [
            body.idConvo,
            body.nombreConvo,
            body.idlocalidad,
            body.idLocal,
            body.tipoDeTrabajo,
            id
        ];
        await _servicepg.execute(sql, values);
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "CONVOCATORIA updated";
        responseJSON.info = body;
        response.send(responseJSON);
        

    } catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while update CONVOCATORIA.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */

const deleteConvo =  async (request, response) => {
    try {
        let sql = "DELETE FROM CONVOCATORIA WHERE idConvo = $1;";
        let id = request.params.id;
        let responseDB = await _servicepg.execute(sql, [id]);
        let rowCount = responseDB.rowCount;
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "CONVOCATORIA deleted";
        responseJSON.info = [];
        responseJSON.metainfo = { total: rowCount };
        response.send(responseJSON);
    } catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while delete CONVOCATORIA.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

module.exports = { getConvo, postConvo, updateConvo, deleteConvo }