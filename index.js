const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const bookController = require('./controllers/Book')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/Book', bookController)


// db connection 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => console.log('DB connected')) 
    .catch(err => console.error(err));

const PORT = process.env.PORT

app.listen(PORT, console.log(`listening on port ${PORT}`))

module.exports = app