import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environtment'

connectDB()
    .then(() => console.log('Connected successfully to database server'))
    .then(() => bootServer())
    .catch(error => {
        console.log(error)
        process.exit(1)
    })

const bootServer = () => {
    const app = express()

    app.get('/broad', async (req, res) => {
        res.send('Hello World')
    })
    app.get('/column', async (req, res) => {
        res.send('Hello World')
    })

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Example app listening at ${env.APP_HOST}:${env.APP_PORT}`)
    })
}