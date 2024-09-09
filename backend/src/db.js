import { MongoClient } from "mongodb";

let db;

async function connectToDB(cb) {
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.yiwrzcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("Trying connection");


    try {
        await client.connect();
        db = client.db('rccspices');
        console.log("Connected to the database!");
        cb();
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    } 
}

export { db, connectToDB }