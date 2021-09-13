const {Router} = require('express')
const {check} = require("express-validator")
const { 
    getCompanies, 
    updateCompany, 
    createCompany, 
    deleteCompany 
} = require('../controllers/company')
const { 
    validarJWT, 
    isSuperAdmin, 
    validarCampos
} = require('../middlewares')
const { 
    existCompany, 
    existCountry 
} = require('../middlewares/validate-existence')

const router = Router()

router.get('/', getCompanies)

router.post('/',[
    validarJWT,
    isSuperAdmin,
    check('name', 'The name is required').not().isEmpty(),
    check('country', 'The ISO2 is required').not().isEmpty(),
    check('country').custom( existCountry ),
    validarCampos
], createCompany)

router.put('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existCompany ),
    check('name', 'The name is required').not().isEmpty(),
    check('country', 'The ISO2 is required').not().isEmpty(),
    validarCampos
], updateCompany)

router.delete('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existCompany ),
    validarCampos
], deleteCompany)

module.exports = router