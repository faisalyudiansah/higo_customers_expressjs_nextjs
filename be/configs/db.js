require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const db = client.db(process.env.NODE_ENV === 'test' ? `${process.env.DB_NAME}-test` : `${process.env.DB_NAME}`);

module.exports = {
    db,
    client
};