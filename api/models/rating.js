const mongoose = require('mongoose')

const ratingScheema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imdb: { type: String, },
    rt: { type: String, },
    rating: { type: String, },
    season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true, unique: true },
})

module.exports = mongoose.model('Rating', ratingScheema)