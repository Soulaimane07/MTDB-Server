const mongoose = require('mongoose')

const genreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true, unique: true },
    bg_Img: { type: String, required: true },
})

module.exports = mongoose.model('Genre', genreSchema)