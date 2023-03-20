const mongoose = require('mongoose')

const serieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true, unique: true },
    logo_Img: { type: String, required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
})

module.exports = mongoose.model('Serie', serieSchema)