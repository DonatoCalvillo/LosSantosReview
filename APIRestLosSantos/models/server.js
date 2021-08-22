const express = require('express')
const cors = require('cors')
const {
    dbConnection
} = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Rutas
        this.paths = {
            auth: '/api/auth',
            role: '/api/role',
            user: '/api/user',
            classification: '/api/classification'
        }

        //Conexion a la db
        this.conectarDB();

        //Moddlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.role, require('../routes/role'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.classification, require('../routes/classification'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('server running on port ', this.port);
        })
    }

    middlewares() {
        //CORSE sirve para que solo se puedan hacer peticiones
        //desde ciertas paginas web
        this.app.use(cors());

        //Parseo y lectura de body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

}

module.exports = Server