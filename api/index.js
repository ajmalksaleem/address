import express from 'express'
import { config } from 'dotenv'
import connectToDb from './db/connections.js'
import cookieParser from 'cookie-parser'
import Routes from './routes/index.route.js'
import { ErrorMiddleware } from './utils/error.js'
import path from 'path';

const app = express()
config()
app.use(cookieParser())
app.use(express.json())

app.listen(process.env.PORT, ()=>{
    console.log('server start running on port :',process.env.PORT)
    connectToDb()
})

const __dirname = path.resolve()

app.use('/api', Routes)

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use(ErrorMiddleware)

