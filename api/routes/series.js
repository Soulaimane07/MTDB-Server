const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Serie = require('../models/serie')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/images/series/logo')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
})


router.get('/', (req, res, next) => {
    Serie.find()
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

router.post('/', upload.single('logo_Img'), (req, res, next) => {
    const serie = new Serie({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        genre: req.body.genreId,
        logo_Img: req.file.path,
    });
    serie
        .save()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                message: 'POST requests to /series',
                createdSerie: result,
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:serieId', (req, res, next) => {
    const id = req.params.serieId
    Serie.findById(id)
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

router.patch('/:serieId', (req, res, next) => {
    const id = req.params.serieId
    const updateOps = {}

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    Serie.update({_id: id}, { $set: updateOps})
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

router.delete('/:serieId', (req, res, next) => {
    const id = req.params.serieId
    Serie.remove({_id: id})
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