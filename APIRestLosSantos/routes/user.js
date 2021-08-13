const {
    Router
} = require('express')
const {
    check
} = require('express-validator')
const {
    createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser
} = require('../controllers/user')
const {
    existEmail,
    userByIdExist,
    userActive
} = require('../helpers/db-validator')
const {
    validarJWT, isSuperAdmin
} = require('../middlewares')
const {
    validarCampos
} = require('../middlewares/validar-campos')

const router = Router()

router.get('/', getUsers)

router.get('/:id',[
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom(userByIdExist),
    check('id').custom(userActive),
    validarCampos
], getUserById)

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('lastName', 'The lastName is required').not().isEmpty(),
    check('username', 'The username is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('password', 'the password must be longer than 8 characters').isLength({
        min: 8
    }),
    check('email').custom(existEmail),
    validarCampos
], createUser)

router.put('/:id', [
    validarJWT,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom(userByIdExist),
    validarCampos
], updateUser)

router.delete('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom(userByIdExist),
    validarCampos
], deleteUser)

module.exports = router