const router = require('express').Router();
const { TvSeriesCont } = require('../controllers/TvSeriesController');

router.get('/', (req, res) => {
    console.log('ini di router tv seeries')
})

router.get('/TvSeries', TvSeriesCont.findAll)
router.post('/TvSeries', TvSeriesCont.create)
router.get('/TvSeries/:id', TvSeriesCont.findOne)
router.delete('/TvSeries/:id', TvSeriesCont.delete)
router.put('/TvSeries/:id', TvSeriesCont.edit)

module.exports = router;
