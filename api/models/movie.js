const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true, unique: true },
    logo_Img: { type: String, required: true },
    card_Img: { type: String, required: true },
    bg_Img: { type: String, required: true },
    trailer: { type: String, required: true },
    story: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
})

module.exports = mongoose.model('Movie', movieSchema)