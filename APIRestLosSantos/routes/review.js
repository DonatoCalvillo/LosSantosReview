const {Router} = require('express')
const {check} = require("express-validator")
const { getReviews, createReview, updateReview } = require('../controllers/review')
const { validarJWT, isSuperAdmin, validarCampos } = require('../middlewares')
const { existContent, existUser, existReview } = require('../middlewares/validate-existence')

const router = Router()

router.get('/', getReviews)

router.post('/', [
    validarJWT,
    isSuperAdmin,
    check('title', 'The title is required').not().isEmpty(),
    check('subtitle', 'The subtitle is required').not().isEmpty(),
    check('body', 'The body is required').not().isEmpty(),
    check('content', 'The content is required').not().isEmpty(),
    check('user', 'The user is required').not().isEmpty(),
    check('user').custom( existUser ),
    check('content').custom( existContent ),
    validarCampos
],createReview)

router.put('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existReview ),
    check('title', 'The title is required').not().isEmpty(),
    check('subtitle', 'The subtitle is required').not().isEmpty(),
    check('body', 'The body is required').not().isEmpty(),
    check('content', 'The content is required').not().isEmpty(),
    check('user', 'The user is required').not().isEmpty(),
    check('user').custom( existUser ),
    check('content').custom( existContent ),
    validarCampos
], updateReview)

router.delete('/:id',[
    validarJWT,
    isSuperAdmin,
    check('id', 'This is not a valid Mongo id').isMongoId(),
    check('id').custom( existReview ),
    validarCampos
])

module.exports = router