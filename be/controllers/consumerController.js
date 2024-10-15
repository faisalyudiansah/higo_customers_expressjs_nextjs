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
};
