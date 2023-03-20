const mongoose = require('mongoose')

const episodeScheema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true, unique: true },
    card_Img: { type: String, required: true },
    story: { type: String, required: true },
    video: { type: String, required: true },
    season: { type: mongoose.Schema.Types.ObjectId, ref: 'Season', required: true },
})

module.exports = mongoose.model('Episode', episodeScheema)