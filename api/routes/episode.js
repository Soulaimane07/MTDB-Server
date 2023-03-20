const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Episode = require('../models/episode')

router.get('/', (req, res, next) => {
    Episode.find()
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
    const episode = new Episode({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        card_Img: req.body.card_Img,
        story: req.body.story,
        video: req.body.video,
        season: req.body.seasonId
    });
    episode
        .save()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                message: 'POST requests to /episodes',
                createdEpisode: result,
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:episodeId', (req, res, next) => {
    const id = req.params.episodeId
    Episode.findById(id)
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

router.patch('/:episodeId', (req, res, next) => {
    const id = req.params.episodeId
    const updateOps = {}

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Episode.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => { 
            // console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        }) 
})

router.delete('/:episodeId', (req, res, next) => {
    const id = req.params.episodeId
    Episode.remove({_id: id})
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