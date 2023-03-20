const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Movie = require('../models/movie')

router.get('/', (req, res, next) => {
    Movie.find()
        .exec()
        .then(docs => {
            // console.log(docs);
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    
})

module.exports = router