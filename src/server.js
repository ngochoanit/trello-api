import express from 'express'
import { mapOrder } from '*/utilities/mapOrder.js'
const app = express()
const hostname = 'localhost'
const port = 3000
app.get('/', function (req, res) {
    mapOrder([{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }], [{ 'id': 1 }, { 'id': 3 }, { 'id': 2 }], 'id')
    res.send('Hello World')
})

app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`)
})