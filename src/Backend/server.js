const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://reshav:1234@cluster0.lerct72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/api/data', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("Ecommerce").collection("product");
    const data = await collection.find().toArray();
    res.json(data);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});