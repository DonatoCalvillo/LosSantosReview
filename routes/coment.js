const {Router} = require('express')
const logger = require('../helpers/logger')
const { Coment, Review } = require('../models')

const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const id = req.params

        const coments = Comment.find({'review' : id })
                .populate('user', 'name')
                .populate('review', 'title')
       

        res.json({
            coments
        })

    } catch (error) {
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
})

router.post('/', async (req, res) => {
    try{
        const {
            coment,
            user,
            review
        } = req.body

        const data = {
            coment,
            user,
            review
        }
        const newComent = Coment(data)
        await newComent.save()

        res.status(201).json(coment)
        logger.info(`Se creo correctamente el comentario del usuario ${user}`)

    }catch(err){
        logger.error(`Error: ${error}`)
        res.status(500).json({
            msg: `Hable con el administrador: ${error}`
        })
    }
})

module.exports = router