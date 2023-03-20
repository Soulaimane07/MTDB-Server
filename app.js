const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const usersRoutes = require('./api/routes/users')
const genresRoutes = require('./api/routes/genres')
const seriesRoutes = require('./api/routes/series')
const seasonsRoutes = require('./api/routes/seasons')
const networksRoutes = require('./api/routes/networks')
const ratingRoutes = require('./api/routes/rating')
const episodesRoutes = require('./api/routes/episode')
const moviesRoutes = require('./api/routes/movies')

mongoose.connect('mongodb+srv://Soulaimane:Soulaimane3200@cluster0.gmkoncf.mongodb.net/?retryWrites=true&w=majority' )

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})


/* ********** Routes **************** */

app.use('/users', usersRoutes)
app.use('/genres', genresRoutes)
app.use('/series', seriesRoutes)
app.use('/seasons', seasonsRoutes)
app.use('/Networks', networksRoutes)
app.use('/Rating', ratingRoutes)
app.use('/episodes', episodesRoutes)
app.use('/movies', moviesRoutes)

app.use((req, res, next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app