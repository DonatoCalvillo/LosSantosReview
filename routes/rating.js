const {Router} = require('express')
const {check} = require("express-validator")
const { 
    getRating, 
    createRating, 
    updateRating, 
    deleteRating
} = require('../controllers/rating')
const { 
    validarJWT, 
    isSuperAdmin, 
    validarCampos 
} = require('../middlewares')
const { existRating, existContent } = require('../middlewares/validate-existence')

const router = Router()

router.get('/', getRating)

router.post('/',[
    validarJWT,
    isSuperAdmin,
    check('score', 'The score is required').not().isEmpty(),
    check('content', 'The content (id) is required').not().isEmpty(),
    check('user', 'The user (id) is required').not().isEmpty(),
    validarCampos
], createRating)

router.put('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existRating ),
    check('score', 'The score is required').not().isEmpty(),
    check('content', 'The content (id) is required').not().isEmpty(),
    check('user', 'The user (id) is required').not().isEmpty(),
    validarCampos
], updateRating)

router.delete('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existRating ),
    validarCampos
], deleteRating)
module.exports = router