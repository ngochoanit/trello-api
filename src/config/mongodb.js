import { MongoClient } from 'mongodb'
import { env } from '*/config/environtment'
let dbInstance = null;

const uri = env.MONGODB_URI
console.log(env.MONGODB_URI)


export const connectDB = async () => {
    const client = new MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    //connent the clien to the server
    await client.connect()
    //Assign the clientDb to our dbInstance
    dbInstance = client.db(env.DATABASE_NAME)

}
export const getDB = () => {
    if (!dbInstance) throw new Error('Must connect to Database first')
    return dbInstance
}
