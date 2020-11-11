const ServicePostgres = require("../services/postgres");
const _servicepg = new ServicePostgres();

const getConvo = async (request, response) => {
  try {
    const sql =
      "SELECT * FROM CONVOCATORIA INNER JOIN localidad ON convocatoria.idlocalidad = localidad.idlocalidad INNER JOIN locales ON convocatoria.idlocal = locales.idlocal";
    let responseDB = await _servicepg.execute(sql);
    let rowCount = responseDB.rowCount;
    let rows = responseDB.rows;
    let respondeJSON = {};
    respondeJSON.ok = true;
    respondeJSON.message = "Convocatoria Ok";
    respondeJSON.info = rows;
    respondeJSON.metainfo = { total: rowCount };
    response.send(respondeJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error while get Convocatoria.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const postConvo = async (request, response) => {
  try {
    let sql =
      "INSERT INTO CONVOCATORIA (idConvo, nombreConvo, idlocalidad, idLocal, tipoDeTrabajo)";
    sql += " VALUES ($1, $2, $3, $4, $5);";
    let body = request.body;
    let values = [
      body.idconvo,
      body.nombreconvo,
      body.nombrelocalidad,
      body.nombrelocal,
      body.tipodetrabajo,
    ];

    await _servicepg.execute(sql, values);
    let respondeJSON = {};
    respondeJSON.ok = true;
    respondeJSON.message = "Convocatoria created";
    respondeJSON.info = body;
    response.send(respondeJSON);
  } catch (error) {
    let responseJSON = {};
    responseJSON.ok = false;
    responseJSON.message = "Error while create Convocatoria.";
    responseJSON.info = error;
    response.status(400).send(responseJSON);
  }
};

const updateConvo = async (request, response) => {
  try {
    let id = request.params.id;
    let sql =
      "UPDATE CONVOCATORIA SET idlocalidad = $1, idLocal = $2, tipodetrabajo = $3 WHERE idconvo = $4;";
    let body = request.body;
    console.log(body);
    let values = [body.idlocalidad, body.idlocal, body.tipodetrabajo, id];

    console.log(values)

    await _servicepg.execute(sql, values);
    let responseJSON = {};
    responseJSON.ok = true;
    responseJSON.message = "CONVOCATORIA updated";
    responseJSON.info = body;
    console.log(responseJSON);
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

const deleteConvo = async (request, response) => {
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

module.exports = { getConvo, postConvo, updateConvo, deleteConvo };
