import path from 'path';
import express from "express";
import mongoose from "mongoose";
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

const supplierSchema = new mongoose.Schema({
    SupplierID: String,
    Name: String,
    Addresses: Array
});

const poolingAuctionSchema = new mongoose.Schema({
    ChallanNo: String,
    Date: Date,
    VehicleNo: String,
    SupplierID: String,
    QuantityInKGS: Number,
    RateINR: Number
});

const salesSchema = new mongoose.Schema({
    InvoiceNo: String,
    Date: Date,
    SupplierID: String,
    ChallanNo: String,
    KgsSold: Number,
    TaxableValue: Number,
    GST: String,
    Commission: String
});

const Supplier = mongoose.model('Supplier', supplierSchema);
const PoolingAuction = mongoose.model('PoolingAuction', poolingAuctionSchema);
const Sales = mongoose.model('Sales', salesSchema);

app.get(/^(?!\/api).+/, (req, res) => {
    res.send(path.join(__dirname, '../build/index.html'));
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


// POST routes
app.post('/api/suppliers', async (req, res) => {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.send(supplier);
});


// POST entire pooling auction entry
app.post("/api/pooling-auctions", async (req, res) => {
    const { poolingAuction, sales } = req.body;

    // Save the pooling auction entry
    try {
        const newPoolingAuction = new PoolingAuction(poolingAuction);
        await newPoolingAuction.save();

        // Save all sales entries related to this pooling auction
        for (const sale of sales) {
            const newSale = new Sales(sale);
            await newSale.save();
        }

        res.status(201).json({ message: 'Pooling auction and sales entries added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding pooling auction and sales entries' });
    }
});

// GET list of all pooling auctions
app.get("/api/pooling-auctions", async (req, res) => {
    try {
        const poolingAuctionCollection = db.collection('PoolingAuction');
        const poolingAuctions = await poolingAuctionCollection.find().toArray();
        res.json(poolingAuctions);
    } catch (error) {
        console.error('Error in GET /api/pooling-auctions:', error);
        res.status(500).json({ error: 'An error occurred while retrieving pooling auctions' });
    }
});


app.post('/api/sales', async (req, res) => {
    const sales = new Sales(req.body);
    await sales.save();
    res.send(sales);
});

app.get('/api/pooling-auctions/:id', async (req, res) => {
    const poolingAuction = await PoolingAuction.findOne({ ChallanNo: req.params.id }).populate('SupplierID');
    const sales = await Sales.find({ ChallanNo: req.params.id }).populate('SupplierID');
    res.send({ poolingAuction, sales });
});

app.get('/api/suppliers', async (req, res) => {
    const suppliers = await Supplier.find();
    res.send(suppliers);
});

app.get('/api/suppliers/:id', async (req, res) => {
    const supplier = await Supplier.findOne({ SupplierID: req.params.id });
    res.send(supplier);
});


const PORT = process.env.PORT || 8000;

connectToDB(() => {
    app.listen(PORT, () => {
        console.log("Successfully connected to db");
        console.log("Server is listening on port", PORT);
    });
});
