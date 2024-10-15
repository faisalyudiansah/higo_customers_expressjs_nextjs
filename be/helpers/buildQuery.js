const validator = require('validator');
const { INVALID_QUERY } = require('../constants/errorConstants');

function buildQuery(q) {
    const isValidQuery = (query) => /^[a-zA-Z0-9\s]*$/.test(query);
    const sanitizedQuery = q ? validator.escape(q) : '';
    const query = {};
    if (sanitizedQuery && isValidQuery(sanitizedQuery)) {
        const regex = new RegExp(sanitizedQuery, 'i');
        query.$or = [
            { profession: regex },
            { gender: sanitizedQuery }
        ];
        return query;
    } else {
        const error = new Error(INVALID_QUERY);
        error.name = INVALID_QUERY;
        throw error;
    }
}

module.exports = {
    buildQuery
}