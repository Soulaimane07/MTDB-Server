const mongoose = require('mongoose')

const networkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true, unique: true },
    logo_Img: { type: String, required: true },
    bg_Img: { type: String, required: true },
    video: { type: String, required: true },
})

module.exports = mongoose.model('Network', networkSchema)