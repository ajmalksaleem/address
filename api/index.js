import express from 'express'
import { config } from 'dotenv'
import connectToDb from './db/connections.js'
import cookieParser from 'cookie-parser'
import Routes from './routes/index.route.js'
import { ErrorMiddleware } from './utils/error.js'

const app = express()
config()
app.use(cookieParser())
app.use(express.json())

app.use('/api', Routes)
app.use(ErrorMiddleware)

app.listen(process.env.PORT, ()=>{
    console.log('server start running on port :',process.env.PORT)
    connectToDb()
})