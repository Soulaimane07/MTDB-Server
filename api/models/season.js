const mongoose = require('mongoose')

const seasonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serie: { type: mongoose.Schema.Types.ObjectId, ref: 'Serie', required: true },
    bg_Img: { type: String, required: true },
    card_Img: { type: String, required: true },
    trailer: { type: String, required: true },
    story: { type: String, required: true },
    year: { type: Number, required: true },
})

module.exports = mongoose.model('Season', seasonSchema)