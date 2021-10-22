const {Router} = require('express')
const {check} = require("express-validator")
const { 
    getCountries, 
    createCountry, 
    deleteCountry,
    updateCountry
} = require('../controllers/country')
const { 
    validarJWT, 
    isSuperAdmin, 
    validarCampos 
} = require('../middlewares')
const { existCountry } = require('../middlewares/validate-existence')

const router = Router()

router.get('/', getCountries)

router.post('/', [
    validarJWT,
    isSuperAdmin,
    check('name', 'The name is required').not().isEmpty(),
    check('ISO2', 'The ISO2 is required').not().isEmpty(),
    validarCampos
], createCountry)

router.put('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existCountry ),
    check('name', 'The name is required').not().isEmpty(),
    check('ISO2', 'The ISO2 is required').not().isEmpty(),
    validarCampos
], updateCountry)

router.delete('/:id', [
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existCountry ),
    validarCampos
], deleteCountry)

module.exports = router