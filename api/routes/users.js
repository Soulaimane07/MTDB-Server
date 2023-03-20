const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/images/users/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
})


router.get('/', (req, res, next) => {
    User.find()
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

router.post('/', upload.single('profile'), (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        pass: req.body.pass,
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        // profile: if(req.file.path == undefined){req.file.path }
    });
    user
        .save()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                message: 'POST requests to /users',
                createdUser: result,
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId
    User.findById(id)
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

router.patch('/:userId', upload.single('profile'), (req, res, next) => {
    const id = req.params.userId
    const updateOps = {}

    for(const ops of req.body) {
        ops.propName === 'profile' ? updateOps['profile'] = req.file.path : updateOps[ops.propName] = ops.value
        // updateOps[ops.propName] = ops.value
    }

    User.update({_id: id}, { $set: updateOps})
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

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId
    User.remove({_id: id})
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