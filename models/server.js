const express = require('express')
const logger = require('../helpers/logger')
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
            auth            : '/api/auth',
            category        : '/api/category',
            classification  : '/api/classification',
            company         : '/api/company',
            coment          : '/api/coment',
            content         : '/api/content',
            country         : '/api/country',
            rating          : '/api/rating',
            review          : '/api/review',
            role            : '/api/role',
            subcategory     : '/api/subcategory',
            user            : '/api/user',
            uploads         : '/api/uploads',
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
        this.app.use(this.paths.category, require('../routes/category'));
        this.app.use(this.paths.classification, require('../routes/classification'));
        this.app.use(this.paths.company, require('../routes/company'));
        this.app.use(this.paths.coment, require('../routes/coment'));
        this.app.use(this.paths.content, require('../routes/content'));
        this.app.use(this.paths.country, require('../routes/country'));
        this.app.use(this.paths.rating, require('../routes/rating'));
        this.app.use(this.paths.review, require('../routes/review'));
        this.app.use(this.paths.role, require('../routes/role'));
        this.app.use(this.paths.subcategory, require('../routes/subcategory'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            // console.log('server running on port ', this.port);
            logger.info(`Server running at the port ${this.port}`)
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