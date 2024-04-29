const routes = require('express').Router();
const userRoutes = require('./userRoutes');
const pillzRoutes = require('./pillzRoutes');

routes.use('/users', userRoutes);
routes.use('/pillz', pillzRoutes);

module.exports = routes;