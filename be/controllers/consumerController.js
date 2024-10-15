const { db } = require("../configs/db");
const { COLLECTION_NAME } = require("../constants/customerConstants");
const { paginate, createPaginatedResponse } = require("../helpers/paginationHelper");
const { buildQuery } = require('../helpers/buildQuery');

module.exports = class ConsumerController {
    static async getAll(req, res, next) {
        try {
            const { page, limit, q } = req.query;
            let query = {}
            if (q) {
                query = buildQuery(q)
            }
            const { options } = paginate(query, page, limit);
            const data = await db.collection(COLLECTION_NAME)
                .find(query, { projection: { _id: 0 } })
                .skip(options.skip)
                .limit(options.limit)
                .toArray();
            const totalDocuments = await db.collection(COLLECTION_NAME).countDocuments(query);
            const paginatedResponse = createPaginatedResponse(data, options.limit, page, totalDocuments);
            res.status(200).json(paginatedResponse);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getGenderData(req, res, next) {
        try {
            const genderData = await db.collection(COLLECTION_NAME)
                .aggregate([
                    {
                        $group: {
                            _id: "$gender",
                            count: { $sum: 1 }
                        }
                    }
                ])
                .toArray();
            const formattedData = genderData.map(item => ({
                gender: item._id,
                count: item.count
            }));
            res.status(200).json(formattedData);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getAgeDistribution(req, res, next) {
        try {
            const ageGroups = [
                { range: "0-20", count: 0 },
                { range: "21-40", count: 0 },
                { range: "41-60", count: 0 },
                { range: "61+", count: 0 },
            ];
            const customers = await db.collection(COLLECTION_NAME).find({}).toArray();
            customers.forEach(customer => {
                const age = customer.age;
                if (age <= 20) {
                    ageGroups[0].count++;
                } else if (age <= 40) {
                    ageGroups[1].count++;
                } else if (age <= 60) {
                    ageGroups[2].count++;
                } else {
                    ageGroups[3].count++;
                }
            });
            res.status(200).json(ageGroups);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};
