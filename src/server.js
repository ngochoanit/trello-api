import express from 'express'
import { mapOrder } from './utilities/mapOrder'
const app = express()
const hostname = 'localhost'
const port = 3000
app.get('/', function (req, res) {
    mapOrder([1, 2, 3], 2)
    res.send('Hello World')
})

app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`)
})