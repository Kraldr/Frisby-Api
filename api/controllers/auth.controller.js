const ServicePostgres = require('../services/postgres')
const _servicepg = new ServicePostgres()
const jwt = require("../services/jwt");

const loginUser =  async (request, response) => {
    let respondeJSON = {}
    respondeJSON.ok = true
    try{
      const sql = 'select nombre, apellido, correo, idrol from usuarios where usuarios.correo = $1 and usuarios.clave = md5($2);'
      let body = request.body;
      let values = [body.correo, body.clave];
      let responseDB = await _servicepg.execute(sql, values)
      let rowCount = responseDB.rowCount
      if (rowCount == 1) {
        let user = responseDB.rows[0];
        respondeJSON.message = 'Users Ok'
        respondeJSON.info = jwt.createToken(user);
        response.send(respondeJSON);
      }else {
        respondeJSON.message = 'Users not found'
        respondeJSON.info = [];
        response.send(respondeJSON);
      }

      let rows = responseDB.rows
      rows = rows.map((x) => {
        delete x.clave
        return x;
      });
    }catch (error) {
      responseJSON.ok = false;
      responseJSON.message = "Error while valid login.";
      responseJSON.info = error;
      response.status(400).send(responseJSON);
    }

    
}; 

const validToken = (request, response) => {
    let responseJSON = {};
    responseJSON.ok = true;
    try {
      responseJSON.message = "Users ok";
      responseJSON.info = decodeToken(request);
      response.send(responseJSON);
    } catch (error) {
      responseJSON.ok = false;
      responseJSON.message = "Error while valid token.";
      responseJSON.info = error;
      response.status(400).send(responseJSON);
    }
  };

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @param {*} next
 */

const middleware = (request, response, next) => {
    try {
      console.log(request.url);
      let token = decodeToken(request);
      request._token = token;
      next();
    } catch (error) {
      let responseJSON = {};
      responseJSON.ok = false;
      responseJSON.message = "Error while valid middleware.";
      responseJSON.info = error;
      response.status(400).send(responseJSON);
    }
};

const notFound = (request, response) => {
  let responseJSON = {};
  responseJSON.ok = false;
  responseJSON.message = "Error, endpoint not found";
  responseJSON.info = request.url;
  response.status(404).send(responseJSON);
};

const decodeToken = (request) => {
  let headers = request.headers.authorization.split(" ");
  let token = headers[1];
  return jwt.validToken(token);
}


module.exports = { loginUser, validToken, middleware, notFound}