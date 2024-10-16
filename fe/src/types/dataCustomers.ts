export type Customer = {
    customerID: number;        
    gender: string; 
    age: number;               
    annual_income: number;     
    spending_score: number;    
    profession: string;        
    work_experience: number;   
    family_size: number;       
};

export type CustomersResponse = {
    data: Customer[];         
    pageSize: number;         
    currentPage: number;      
    totalPages: number;       
    totalDocuments: number;   
};
