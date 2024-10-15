module.exports = {
    paginate: (query, page, limit) => {
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        const skip = (pageNumber - 1) * pageSize;
        return {
            query,
            options: {
                skip,
                limit: pageSize,
            },
        };
    },
    createPaginatedResponse: (data, pageSize, currentPage, totalDocuments) => {
        const totalPages = Math.ceil(totalDocuments / pageSize);
        return {
            data,
            pageSize,
            currentPage: parseInt(currentPage, 10) || 1,
            totalPages,
            totalDocuments,
        };
    },
};