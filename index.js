require('dotenv').config();

//Importación de configuración de server
const Server = require('./models/server');

const servidorIniciado = new Server();

servidorIniciado.listen();