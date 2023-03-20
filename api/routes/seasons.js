const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Season = require('../models/season')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.fieldname === 'card_Img'){
            cb(null, 'uploads/images/series/card')
        }
        if(file.fieldname === 'bg_Img'){
            cb(null, 'uploads/images/series/bg')
        }
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
})

router.get('/', (req, res, next) => {
    Season.find()
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

router.post('/', upload.fields([{
        name: 'card_Img', maxCount: 1
    }, {
        name: 'bg_Img', maxCount: 1
    }]) 
  , (req, res, next) => {
    const season = new Season({
        _id: new mongoose.Types.ObjectId(),
        serie: req.body.serieId,
        card_Img: req.files.card_Img[0].path,
        bg_Img: req.files.bg_Img[0].path,
        trailer: 'hello',
        story: req.body.story,
        year: req.body.year,
    });

    
    season
        .save()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                message: 'POST requests to /seasons',
                createdSeason: result,
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
    Season.findById(id)
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

    Season.update({_id: id}, { $set: updateOps})
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
    Season.remove({_id: id})
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