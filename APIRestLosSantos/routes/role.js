const {
    Router
} = require('express')
const {
    check
} = require('express-validator')
const {
    createRole
} = require('../controllers/role')
const {
    validarCampos
} = require('../middlewares/validar-campos')

const router = Router()

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    validarCampos
], createRole)

module.exports = router