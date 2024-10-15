const fs = require('fs');
const csv = require('csv-parser');
let { db, client } = require("../configs/db");
const { DATABASE_NAME, COLLECTION_NAME, CSV_FILE_PATH } = require('../constants/configConstants');
const { validateCustomer } = require('../models/costumers');

async function seedData() {
    try {
        await checkOrCreateDatabase();
        await checkOrCreateCollection();
        const customers = await readCustomersFromCSV();
        await insertCustomers(customers);
        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Error during seeding:', error.message);
    } finally {
        await client.close();
    }
}

async function checkOrCreateDatabase() {
    const dbList = await client.db().admin().listDatabases();
    const databaseExists = dbList.databases.some(database => database.name === DATABASE_NAME);
    if (databaseExists) {
        console.log(`Database ${DATABASE_NAME} exists, dropping it...`);
        await client.db(DATABASE_NAME).dropDatabase();
    }
    console.log(`Creating database ${DATABASE_NAME}...`);
    client.db(DATABASE_NAME);
}

async function checkOrCreateCollection() {
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === COLLECTION_NAME);
    if (collectionExists) {
        console.log(`Collection ${COLLECTION_NAME} exists, dropping it...`);
        await db.collection(COLLECTION_NAME).drop();
    }
    console.log(`Creating collection ${COLLECTION_NAME}...`);
    await db.createCollection(COLLECTION_NAME);
}

function readCustomersFromCSV() {
    return new Promise((resolve, reject) => {
        const customers = [];
        fs.createReadStream(CSV_FILE_PATH)
            .pipe(csv())
            .on('data', (row) => {
                customers.push({
                    customerID: parseInt(row.CustomerID),
                    gender: row.Gender,
                    age: parseInt(row.Age),
                    annual_income: parseFloat(row["Annual Income ($)"]),
                    spending_score: parseFloat(row["Spending Score (1-100)"]),
                    profession: row.Profession,
                    work_experience: parseInt(row["Work Experience"], 10),
                    family_size: parseInt(row["Family Size"], 10)
                });
            })
            .on('end', () => resolve(customers))
            .on('error', (error) => reject(error));
    });
}

async function insertCustomers(customers) {
    if (customers.length > 0) {
        for (const customer of customers) {
            try {
                validateCustomer(customer);
            } catch (error) {
                throw new Error(`Validation error for customer ${JSON.stringify(customer)}: ${error.message}`);
            }
        }
        await db.collection(COLLECTION_NAME).insertMany(customers);
    } else {
        console.log('No customers found in CSV to insert.');
    }
}

seedData();
