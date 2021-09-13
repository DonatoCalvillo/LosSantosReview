const {Router} = require("express");
const {check} = require("express-validator");
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/category");
const {
    validarCampos,
    validarJWT,
    isSuperAdmin
} = require("../middlewares");
const { existCategory } = require("../middlewares/validate-existence");

const router = Router()

router.get('/', getCategories)

router.post('/', [
    validarJWT,
    isSuperAdmin,
    check('name', 'The name is required').not().isEmpty(),
    validarCampos
], createCategory)

router.put('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom(existCategory),
    check('name', 'The name is required').not().isEmpty(),
    validarCampos
], updateCategory)

router.delete('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom(existCategory),
    validarCampos
], deleteCategory)

module.exports = router