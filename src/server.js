import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environtment'

const app = express()



connectDB()
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(env.PORT, env.HOST, () => {
    console.log(`Example app listening at ${env.HOST}:${env.PORT}`)
})