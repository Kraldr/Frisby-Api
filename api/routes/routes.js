const express = require('express')
const router = express.Router()

const userController = require('../controllers/users.controller')
const convoController = require('../controllers/convocatoria.controller')
const localidadController = require('../controllers/localidad.controller')
const localController = require('../controllers/locales.controller')
const ConvoController = require('../controllers/convocatoria.controller')
const AplicacionesController = require('../controllers/aplicarCovocatoria.controller')

const AuthController = require('../controllers/auth.controller')
const authController = require('../controllers/auth.controller')


router.get('/api/v1', (request, response) => {
    response.send("Hola mundos");
});

router
    .post('/api/v1/login',  AuthController.loginUser)
    .use("/", authController.middleware)
    .get('/api/v1/valid',  AuthController.validToken)
    .get('/api/v1/users', userController.getUsers)
    .post('/api/v1/users',  userController.postUsers)
    .post('/api/v1/users/informacion',  userController.saveCV)
    .put('/api/v1/users/:id',  userController.updateUser)
    .delete('/api/v1/users/:id',  userController.deleteUser)

    .get('/api/v1/convo', convoController.getConvo)
    .post('/api/v1/convo',  convoController.postConvo)
    .put('/api/v1/convo/:id',  convoController.updateConvo)
    .delete('/api/v1/convo/:id',  convoController.deleteConvo)

    .get('/api/v1/localidad', localidadController.getLocalidad)
    .post('/api/v1/localidad',  localidadController.postLocalidad)
    .put('/api/v1/localidad/:id',  localidadController.updateLocalidad)
    .delete('/api/v1/localidad/:id',  localidadController.deleteLocalidad)

    .get('/api/v1/local', localController.getLocal)
    .post('/api/v1/local',  localController.postLocal)
    .put('/api/v1/local/:id',  localController.updateLocal)
    .delete('/api/v1/local/:id',  localController.deleteLocal)

    .get('/api/v1/convocatoria', ConvoController.getConvo)
    .post('/api/v1/convocatoria',  ConvoController.postConvo)
    .put('/api/v1/convocatoria/:id',  ConvoController.updateConvo)
    .delete('/api/v1/convocatoria/:id',  ConvoController.deleteConvo)

    .get('/api/v1/aplicaciones', AplicacionesController.getAplicarConvo)
    .post('/api/v1/aplicaciones',  AplicacionesController.postAplicarConvo)
    .put('/api/v1/aplicaciones/:id',  AplicacionesController.updateAplicarConvo)
    .delete('/api/v1/aplicaciones/:id',  AplicacionesController.deleteAplicarConvo)

    .use("/", authController.notFound);


module.exports = router;