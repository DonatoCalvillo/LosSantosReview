const {Router} = require('express')
const {check} = require("express-validator")
const { 
    getSubcategories, 
    createSubcategory, 
    updateSubcategory,
    deleteSubcategory
} = require('../controllers/subcategory')
const { 
    validarJWT, 
    isSuperAdmin, 
    validarCampos
} = require('../middlewares')
const { existSubcategory } = require('../middlewares/validate-existence')

const router = Router()

router.get('/', getSubcategories)

router.post('/', [
    validarJWT,
    isSuperAdmin,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'The category (id) is required').not().isEmpty(),
    validarCampos
], createSubcategory)

router.put('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existSubcategory ),
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'The category (id) is required').not().isEmpty(),
    validarCampos
], updateSubcategory)

router.delete('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existSubcategory ),
    validarCampos 
], deleteSubcategory)

module.exports = router