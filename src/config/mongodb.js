import { MongoClient } from 'mongodb'
import { env } from '*/config/environtment'

const uri = env.MONGODB_URI
console.log(env.MONGODB_URI)


export const connectDB = async () => {
    const client = new MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    try {
        //connent the clien to the server
        await client.connect()
        console.log('connected successfully to server')

        //list databases
        await listDatabases(client)
    }
    catch (e) {
        console.log(e)
    }
    finally {
        //ensures that client will close finish/error
        await client.close()
    }
}
const listDatabases = async (client) => {
    const databaseList = await client.db().admin().listDatabases()
    databaseList.databases.forEach(database => {
        console.log(database)
    })
}