const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Network = require('../models/network')

router.get('/', (req, res, next) => {
    Network.find()
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
    const network = new Network({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        logo_Img: req.body.logo_Img,
        bg_Img: req.body.bg_Img,
        video: req.body.video,
    });
    network
        .save()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                message: 'POST requests to /networks',
                createdNetwork: result,
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:genreId', (req, res, next) => {
    const id = req.params.genreId
    Network.findById(id)
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

router.patch('/:genreId', (req, res, next) => {
    const id = req.params.genreId
    const updateOps = {}

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Network.update({_id: id}, { $set: updateOps})
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

router.delete('/:genreId', (req, res, next) => {
    const id = req.params.genreId
    Network.remove({_id: id})
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