require('dotenv').config()
require('express-async-errors')

const express = require('express');
const app = express();


const errorHandlerMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        //await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server is listen on port: ${PORT}...`)
        })
    } catch (error) {
        console.error(error)
    }
}

start()