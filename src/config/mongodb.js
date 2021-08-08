import { MongoClient } from 'mongodb'
import { env } from '*/config/environtment'
let dbInstance = null
let initClient = null
const uri = env.MONGODB_URI
export const connectDB = async () => {
    const client = new MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    //connent the clien to the server
    initClient = await client.connect()
    //Assign the clientDb to our dbInstance
    dbInstance = client.db(env.DATABASE_NAME)
}
export const getDB = () => {
    if (!dbInstance) throw new Error('Must connect to Database first')
    return dbInstance
}
export const initSession = async () => {
    const session = await initClient.startSession()
    return session
}
