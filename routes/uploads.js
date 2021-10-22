const {Router} = require('express')
const { check } = require('express-validator');
const { actualizarImgCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validator');
const { validarArchivoSubir, validarCampos } = require('../middlewares');

const router = Router()

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongos').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['content', 'company','user']) ),
    validarCampos
], actualizarImgCloudinary)

module.exports = router
