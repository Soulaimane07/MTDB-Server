const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },

    phone: { type: Number, required: false },
    profile: { type: String, default:'profile', required: false },
    status: { type: String, default:'user', required: false },
})

module.exports = mongoose.model('User', userSchema)
