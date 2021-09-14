const {Router} = require('express')

const {check} = require('express-validator')

const {
    createClassification,
    getClassifications,
    updateClassification,
    deleteClassification
} = require('../controllers/classification')
const { isSuperAdmin } = require('../middlewares')

const {
    validarCampos
} = require('../middlewares/validar-campos')

const {
    validarJWT
} = require('../middlewares/validar-jwt')
const { existClassification } = require('../middlewares/validate-existence')

const router = Router()

router.get('/', getClassifications)

router.post('/', [
    validarJWT,
    isSuperAdmin,
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    validarCampos
], createClassification)

router.delete('/:id', [
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom(existClassification),
    validarCampos
], deleteClassification)

router.put('/:id', [
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom(existClassification),
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    validarCampos
], updateClassification)

module.exports = router