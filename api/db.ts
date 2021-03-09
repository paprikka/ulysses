import { Db, MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI



let cachedDB: Db = null
export const getDB = async () => {
    if(cachedDB) return cachedDB
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    await client.connect()
    
    cachedDB = client.db('homer-events')
    return cachedDB
}
