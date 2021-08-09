const {
    Router
} = require('express')
const {
    check
} = require('express-validator')
const {
    createUser
} = require('../controllers/user')
const {
    existEmail
} = require('../helpers/db-validator')
const {
    validarCampos
} = require('../middlewares/validar-campos')

const router = Router()

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('lastName', 'The lastName is required').not().isEmpty(),
    check('username', 'The username is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('password', 'the password must be longer than 8 characters').isLength({min: 8}),
    check('email').custom(existEmail),
    validarCampos
], createUser)

module.exports = router