export const companies = [
    { id: 1, name: "Palm Valley", category: "Contract Farming", coordinates: [10.45373522, 7.487891652] },
    { id: 2, name: "Namalco Nigerian Ltd", category: "Contract Farming", coordinates: [11.12842219, 7.722568084] },
    { id: 3, name: "Miringa Fertilizers and Chemicals Ltd", category: "Fertilizer Company", coordinates: [11.08840636, 7.763713126] },
    { id: 4, name: "Matrix Fertilizer", category: "Fertilizer Company", coordinates: [10.9545495, 7.647366616] },
    { id: 5, name: "Premier Seeds Limited", category: "Seeds Company", coordinates: [11.12822383, 7.723626721] },
    { id: 6, name: "Hulhulde Rice Mill Ltd", category: "Processors", coordinates: [11.12641676, 7.721669195] },
    { id: 7, name: "Tukunyar Gwari", category: "Contract Farming", coordinates: [11.08939869, 7.705638877] },
    { id: 8, name: "Value Seeds Limited", category: "Seeds Company", coordinates: [11.22046477, 7.778940127] },
    { id: 9, name: "Nagari Seeds", category: "Seeds Company", coordinates: [11.15288219, 7.715271236] },
    { id: 10, name: "Alhaji Salisu Nuhu and Sons", category: "Off-taker", coordinates: [11.12311844, 7.714104941] },
    { id: 11, name: "Olam", category: "Aggregator", coordinates: [10.22984872, 7.347274609] },
    { id: 12, name: "Hybrid Feeds", category: "Aggregator", coordinates: [] }, // No coordinates available
    { id: 13, name: "Tomato Jos", category: "Processors", coordinates: [10.71846631, 7.568827263] },
];

// Extract unique categories for the dropdown
export const companyCategories = [...new Set(companies.map((c) => c.category))];
