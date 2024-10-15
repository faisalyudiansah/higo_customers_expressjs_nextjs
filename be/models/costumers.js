const Customer = {
    customerID: Number,
    gender: String,
    age: Number,
    annual_income: Number,
    spending_score: Number,
    profession: String,
    work_experience: Number,
    family_size: Number
};

function validateCustomer(customer) {
    if (typeof customer !== 'object' || customer === null) {
        throw new Error('Customer must be an object');
    }
    for (const key in Customer) {
        if (!customer.hasOwnProperty(key)) {
            throw new Error(`Missing property: ${key}`);
        }
        switch (key) {
            case 'customerID':
                if (typeof customer.customerID !== 'number' || customer.customerID <= 0) {
                    throw new Error('customerID must be a positive number');
                }
                break;
            case 'gender':
                const validGenders = ['Male', 'Female', 'Other'];
                if (typeof customer.gender !== 'string' || !validGenders.includes(customer.gender)) {
                    throw new Error(`gender must be one of: ${validGenders.join(', ')}`);
                }
                break;
            case 'age':
                if (typeof customer.age !== 'number' || customer.age < 0 || customer.age > 120) {
                    throw new Error('age must be a number between 0 and 120');
                }
                break;
            case 'annual_income':
                if (typeof customer.annual_income !== 'number' || customer.annual_income < 0) {
                    throw new Error('annual_income must be a non-negative number');
                }
                break;
            case 'spending_score':
                if (typeof customer.spending_score !== 'number') {
                    throw new Error('spending_score must be a number');
                }
                break;
            case 'profession':
                if (typeof customer.profession !== 'string') {
                    throw new Error('profession must be a string');
                }
                break;
            case 'work_experience':
                if (typeof customer.work_experience !== 'number' || customer.work_experience < 0) {
                    throw new Error('work_experience must be a non-negative number');
                }
                break;
            case 'family_size':
                if (typeof customer.family_size !== 'number' || customer.family_size < 0) {
                    throw new Error('family_size must be a non-negative number');
                }
                break;
            default:
                break;
        }
    }
}

module.exports = {
    validateCustomer
}