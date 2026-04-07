import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDb from './config/db.js'
import errorHandler from './middleware/errorHandler.js'

//import authRoutes from './routes/authRoutes.js'

//Es6 module  _dirname alt
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// init express app
const app = express()

//connect to mongoDb
connectDb()

//middlewares
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization"],
        credentials: true,

    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//routes
//app.use('/api/auth',authRoutes)


app.use(errorHandler)

//404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        statusCode: 404
     })
})


//start the server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`)
    process.exit(1)
})