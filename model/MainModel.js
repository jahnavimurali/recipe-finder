
const {MongoClient} = require('mongodb')

const uri = 'mongodb://0.0.0.0:27017'

const dbName ='mydb'

const connect= async ()=>{
    try{
        const client = new MongoClient(uri)
        await client.connect()
        console.log('MongoDB connection successful')

        // access database
        const db = client.db(dbName)
        return db;

    } catch(err){
        console.log(err)
        throw err
    }
}

module.exports = {connect}