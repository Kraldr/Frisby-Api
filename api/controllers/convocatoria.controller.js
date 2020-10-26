const getConvo = (request, response) => {
    response.send("Endpoint GET CONVOCATORIA");}; 

const postConvo = (request, response) => {
    response.send("Endpoint POST CONVOCATORIA");
};

const updateConvo =  (request, response) => {
    response.send("Endpoint PUT CONVOCATORIA");
};

const deleteConvo =  (request, response) => {
    response.send("Endpoint DELETE CONVOCATORIA");
};

module.exports = { getConvo, postConvo, updateConvo, deleteConvo}