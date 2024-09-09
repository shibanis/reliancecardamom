import path from 'path';
import express from "express";
import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";
import cors from "cors";
import "dotenv/config";
import { db, connectToDB } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/,(req,res)=>{
    res.send(path.join(__dirname,'../build/index.html'));
})
// API routes
app.get("/api/article/:name", async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404).send(`Requested article does not exist!`);
    }
});


app.get("/hello", (req, res) => {
    res.send("Hello");
});

const PORT = process.env.PORT || 8000;

connectToDB(() => {
    app.listen(PORT, () => {
        console.log("Successfully connected to db");
        console.log("Server is listening on port", PORT);
    });
});
