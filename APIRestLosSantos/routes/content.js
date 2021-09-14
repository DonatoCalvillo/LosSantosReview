const {Router} = require('express')
const {check} = require("express-validator")
const { 
    getContents, 
    createContent,
    updateContent
} = require('../controllers/content')
const { 
    validarJWT, 
    isSuperAdmin,
    validarCampos 
} = require('../middlewares')
const { 
    existCategory, 
    existSubcategory, 
    existCompany, 
    existContent
} = require('../middlewares/validate-existence')

const router =  Router()

router.get('/', getContents)

//Falta agregar validacion del classification BECERRA mueve tu validacion a validate-existence
router.post('/',[
    validarJWT,
    isSuperAdmin,
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('trailerLink', 'The trailer link is required').not().isEmpty(),
    check('duration', 'The duration is required').not().isEmpty(),
    check('category', 'The category (id) is required').not().isEmpty(),
    check('subcategory', 'The subcategory (id) is required').not().isEmpty(),
    check('company', 'The company (id) is required').not().isEmpty(),
    check('classification', 'The classification (id) is required').not().isEmpty(),
    check('category').custom( existCategory ),
    check('subcategory').custom( existSubcategory ),
    check('company').custom( existCompany ),
    check('category').custom( existCategory ),
    validarCampos
], createContent)

router.put('/:id', [
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existContent ),
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('trailerLink', 'The trailer link is required').not().isEmpty(),
    check('duration', 'The duration is required').not().isEmpty(),
    check('category', 'The category (id) is required').not().isEmpty(),
    check('subcategory', 'The subcategory (id) is required').not().isEmpty(),
    check('company', 'The company (id) is required').not().isEmpty(),
    check('classification', 'The classification (id) is required').not().isEmpty(),
    check('category').custom( existCategory ),
    check('subcategory').custom( existSubcategory ),
    check('company').custom( existCompany ),
    check('category').custom( existCategory ),
    validarCampos
], updateContent)

router.delete('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existContent ),
    validarCampos
])

module.exports = router