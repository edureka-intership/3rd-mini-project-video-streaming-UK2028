const express = require("express");
const videoController = require('../controllers/videoController');

const routes = express.Router();

routes.get('/shows', videoController.listAPI);
routes.get('/shows/:id', videoController.detailAPI);
routes.get('/stream/:id', videoController.streamAPI)

module.exports = routes;