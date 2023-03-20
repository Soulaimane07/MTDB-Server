const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Genre = require('../models/genre')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/images/genres/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
})


router.get('/', (req, res, next) => {
    Genre.find()
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

router.post('/', upload.single('bg_Img'), (req, res, next) => {
    const genre = new Genre({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        bg_Img: req.file.path,
    });
    genre
        .save()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                message: 'POST requests to /genres',
                createdGenre: result,
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
    Genre.findById(id)
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

    Genre.update({_id: id}, { $set: updateOps})
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
    Genre.remove({_id: id})
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