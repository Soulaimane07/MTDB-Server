const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Rating = require('../models/rating')

router.get('/', (req, res, next) => {
    Rating.find()
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

router.post('/', (req, res, next) => {
    const rating = new Rating({
        _id: new mongoose.Types.ObjectId(),
        imdb: req.body.imdb,
        rt: req.body.rt,
        rating: req.body.rating,
        season: req.body.seasonId,
    });
    rating
        .save()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                message: 'POST requests to /ratings',
                createdRating: result,
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:ratingId', (req, res, next) => {
    const id = req.params.ratingId
    Rating.findById(id)
        .exec()
        .then(doc => { 
            if (doc) {
               res.status(200).json({doc})
            } else {
               res.status(404).json({message: 'Not Found'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.patch('/:ratingId', (req, res, next) => {
    const id = req.params.ratingId
    const updateOps = {}

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Rating.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => { 
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        }) 
})

router.delete('/:ratingId', (req, res, next) => {
    const id = req.params.ratingId
    Rating.remove({_id: id})
        .exec()
        .then(res => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            }) 
        })
})

module.exports = router