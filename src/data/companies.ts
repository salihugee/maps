export const companies = [
    { id: 1, name: "Kaduna Agro Ltd", category: "Agriculture", coordinates: [10.5400, 7.4400] },
    { id: 2, name: "Zaria Milling Co.", category: "Manufacturing", coordinates: [11.0855, 7.7190] },
    { id: 3, name: "Fertilizer Suppliers", category: "Fertilizer Company", coordinates: [10.4900, 7.4300] },
    { id: 4, name: "Grain Aggregators", category: "Aggregators", coordinates: [10.5500, 7.4500] },
    { id: 5, name: "Seed Distributors", category: "Seeds Company", coordinates: [9.5833, 8.3167] },
    // Add more companies...
  ];
  
  // Extract unique categories for the dropdown
  export const companyCategories = [...new Set(companies.map((c) => c.category))];
  