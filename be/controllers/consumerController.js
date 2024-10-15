let { db } = require("../configs/db");
module.exports = class ConsumerController {
    static async getAll(req, res, next) {
        try {
            let data = await db.collection("customers").find({}, {
                projection: {
                    _id: 0
                },
            }).toArray();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}