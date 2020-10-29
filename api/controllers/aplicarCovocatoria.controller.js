const ServicePostgres = require('../services/postgres')
const _servicepg = new ServicePostgres()

const getAplicarConvo =  async (request, response) => {

    const sql = 'SELECT * FROM APLICARCONVOCATORIA'
    let responseDB = await _servicepg.execute(sql)
    let rowCount = responseDB.rowCount
    let rows = responseDB.rows
    let respondeJSON = {}
    respondeJSON.ok = true
    respondeJSON.message = 'Aplicar convocatoria Ok'
    respondeJSON.info = rows
    respondeJSON.metainfo = {total: rowCount}
    response.send(respondeJSON);
}; 

const postAplicarConvo = async (request, response) => {
    try{
    let sql = "INSERT INTO APLICARCONVOCATORIA (idaplicarconvo, idaplicarconvo, idconvo)"
    sql += " VALUES ($1, $2, $3);";
    let body = request.body;
    let values = [
        body.idaplicarconvo,
        body.ccusuario,
        body.idconvo
    ];

    await _servicepg.execute(sql, values)
    let respondeJSON = {}
    respondeJSON.ok = true
    respondeJSON.message = 'Aplicar convocatoria created'
    respondeJSON.info = body
    response.send(respondeJSON);
    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while create Aplicar convocatoria.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

const updateAplicarConvo =  async (request, response) => {
    try {
        let id = request.params.id;
        let sql =
          "UPDATE APLICARCONVOCATORIA SET ccusuario = $1, idconvo = $2 WHERE idaplicarconvo = $3;";
        let body = request.body;
        let values = [
            body.ccusuario,
            body.idconvo,
            id
        ];
        await _servicepg.execute(sql, values);
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "Aplicar convocatoria updated";
        responseJSON.info = body;
        response.send(responseJSON);
        

    } catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while update Aplicar convocatoria.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */

const deleteAplicarConvo =  async (request, response) => {
    try {
        let sql = "DELETE FROM APLICARCONVOCATORIA WHERE idConvo = $1;";
        let id = request.params.id;
        let responseDB = await _servicepg.execute(sql, [id]);
        let rowCount = responseDB.rowCount;
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "Aplicar convocatoria deleted";
        responseJSON.info = [];
        responseJSON.metainfo = { total: rowCount };
        response.send(responseJSON);
    } catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while delete Aplicar convocatoria.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

module.exports = { getAplicarConvo, postAplicarConvo, updateAplicarConvo, deleteAplicarConvo }