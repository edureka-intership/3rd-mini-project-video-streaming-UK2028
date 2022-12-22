const express = require("express");
const videoController = require('../controllers/videoController');

const routes = express.Router();

routes.get('/video',videoController.streamAPI);
routes.get('/shows', videoController.listAPI);
routes.get('/shows/:id', videoController.detailAPI);

module.exports = routes;
