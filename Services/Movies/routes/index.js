const router = require('express').Router();
const { MoviesCont } = require('../controllers/moviesController');

router.get('/', (req, res) => {
    console.log('ini di router')
})

router.get('/movies', MoviesCont.findAll)
router.post('/movies', MoviesCont.create)
router.get('/movies/:id', MoviesCont.findOne)
router.delete('/movies/:id', MoviesCont.delete)
router.put('/movies/:id', MoviesCont.edit)

module.exports = router;
