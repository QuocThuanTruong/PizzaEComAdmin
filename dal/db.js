const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://web:Web123456@cluster0.smrwq.mongodb.net/FinalProject?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

let database;

async function connectDb(){
    await client.connect();
    // Establish and verify connection
    database = await client.db("FinalProject");
    console.log('Db connected!');
}

console.log('RUNNING DB...');

connectDb();

const db = () => database;

module.exports.db = db;