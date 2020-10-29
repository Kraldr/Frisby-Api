const ServicePostgres = require('../services/postgres')
const _servicepg = new ServicePostgres()

const getLocal =  async (request, response) => {

    const sql = 'SELECT * FROM LOCALES'
    let responseDB = await _servicepg.execute(sql)
    let rowCount = responseDB.rowCount
    let rows = responseDB.rows

    let respondeJSON = {}
    respondeJSON.ok = true
    respondeJSON.message = 'Locales Ok'
    respondeJSON.info = rows
    respondeJSON.metainfo = {total: rowCount}
    response.send(respondeJSON);
}; 

const postLocal = async (request, response) => {
    try{
    let sql = "INSERT INTO LOCALES (idlocal, nombrelocal, idlocalidad)"
    sql += " VALUES ($1, $2, $3);";
    let body = request.body;
    let values = [
        body.idlocal,
        body.nombrelocal,
        body.idlocalidad,
    ];

    await _servicepg.execute(sql, values)
    let respondeJSON = {}
    respondeJSON.ok = true
    respondeJSON.message = 'Local created'
    respondeJSON.info = body
    response.send(respondeJSON);
    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while create local.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

/**
 * Delete user
 * @param {*} request
 * @param {Response} response
 */

const updateLocal =  async (request, response) => {
    try {
        let id = request.params.id;
        let sql =
          "UPDATE LOCALES SET nombrelocal = $1, idlocalidad = $2 WHERE idlocal = $3;";
        let body = request.body;
        let values = [
            body.nombrelocal,
            body.idlocalidad,
            id
        ];
        await _servicepg.execute(sql, values);
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "Local updated";
        responseJSON.info = body;
        response.send(responseJSON);
        

    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while update local.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

/**
 * Delete user
 * @param {Request} request
 * @param {Response} response
 */

const deleteLocal =  async (request, response) => {
    try {
        let sql = "DELETE FROM LOCALES WHERE idlocal = $1;";
        let id = request.params.id;
        let responseDB = await _servicepg.execute(sql, [id]);
        let rowCount = responseDB.rowCount;
        let responseJSON = {};
        responseJSON.ok = true;
        responseJSON.message = "Local deleted";
        responseJSON.info = [];
        responseJSON.metainfo = { total: rowCount };
        response.send(responseJSON);
    }catch (error) {
        let responseJSON = {};
        responseJSON.ok = false;
        responseJSON.message = "Error while delete local.";
        responseJSON.info = error;
        response.status(400).send(responseJSON);
    }
};

module.exports = { getLocal, postLocal, updateLocal, deleteLocal }