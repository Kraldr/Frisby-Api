const ServicePostgres = require('../services/postgres')
const _servicepg = new ServicePostgres()

const getUsers =  async (request, response) => {

    const sql = 'SELECT * FROM USUARIOS'
    let responseDB = await _servicepg.execute(sql)
    let rowCount = responseDB.rowCount
    let rows = responseDB.rows
    let respondeJSON = {}
    respondeJSON.ok = true
    respondeJSON.message = 'Users Ok'
    respondeJSON.info = rows
    respondeJSON.metainfo = {total: rowCount}
    response.send(respondeJSON);
}; 

const postUsers = (request, response) => {
    let id = request.params.id;
    response.send("Endpoint POST USERS " + id);
};

const updateUser =  (request, response) => {
    response.send("Endpoint PUT USERS");};

const deleteUser =  (request, response) => {
    response.send("Endpoint DELETE USERS");};

module.exports = { getUsers, postUsers, updateUser, deleteUser }