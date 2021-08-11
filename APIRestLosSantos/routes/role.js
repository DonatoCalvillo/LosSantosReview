const {
    Router
} = require('express')
const {
    check
} = require('express-validator')
const {
    createRole, getRoles, deleteRole
} = require('../controllers/role')
const { isSuperAdmin, existRole } = require('../middlewares/valida-roles')
const {
    validarCampos
} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.get('/', getRoles)

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    validarCampos
], createRole)

router.delete('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existRole),
    validarCampos
], deleteRole )

module.exports = router