const express = require('express');
const route = express.Router();
const { jobController } = require('../controllers');

route.get('/title', jobController.getTitle);
route.get('/position', jobController.getPosition);
route.delete('/title/:idtitle', jobController.deleteTitle);
route.delete('/position/:idposition', jobController.deletePosition);
route.patch('/title/:idtitle', jobController.editTitle);
route.patch('/position/:idposition', jobController.editPosition);
route.post('/title', jobController.addTitle);
route.post('/position', jobController.addPosition);

module.exports = route;