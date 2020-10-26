const express = require('express')
const router = express.Router()

const userController = require('../controllers/users.controller')
const convoController = require('../controllers/convocatoria.controller')

router.get('/api/v1', (request, response) => {
    response.send("Hola mundos");
});

router
    .get('/api/v1/users', userController.getUsers)
    .post('/api/v1/users',  userController.postUsers)
    .put('/api/v1/users/:id',  userController.updateUser)
    .delete('/api/v1/users/:id',  userController.deleteUser)
    .get('/api/v1/convo', convoController.getConvo)
    .post('/api/v1/convo',  convoController.postConvo)
    .put('/api/v1/convo/:id',  convoController.updateConvo)
    .delete('/api/v1/convo/:id',  convoController.deleteConvo)

module.exports = router;