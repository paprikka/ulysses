import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


client.connect((err) => {
    const collection = client.db('test').collection('devices')
    // perform actions on the collection object
    client.close()
})
