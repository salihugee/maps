import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { companies as initialCompanies } from "./data/companies";
import * as XLSX from "xlsx";
const CompaniesPage = () => {
    const [companies, setCompanies] = useState(initialCompanies);
    const [newCompany, setNewCompany] = useState({});
    const [editingCompany, setEditingCompany] = useState(null);
    // Dropdown options for category and commodity
    const categoryOptions = ["Contract Farming", "Fertilizer Company", "Seeds Company", "Processors", "Aggregator", "Mechanization"];
    const commodityOptions = ["Wheat", "Corn", "Rice", "Soybeans", "Cotton"];
    // Handle input changes for new or editing company
    const handleInputChange = (e, field) => {
        if (editingCompany) {
            setEditingCompany({ ...editingCompany, [field]: e.target.value });
        }
        else {
            setNewCompany({ ...newCompany, [field]: e.target.value });
        }
    };
    // Handle file upload and parse data
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target?.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            // Validate and format the parsed data
            const formattedData = parsedData.map((item, index) => ({
                id: companies.length + index + 1, // Generate unique IDs
                name: item.name || "",
                category: item.category || "",
                commodity: item.commodity ? item.commodity.split(",").map((c) => c.trim()) : [],
                officeAddress: item.officeAddress || "",
                contactPerson: item.contactPerson || "",
                phoneNumber: item.phoneNumber || "",
                designation: item.designation || "",
                emailWebsite: item.emailWebsite || "",
                coordinates: item.coordinates
                    ? item.coordinates.split(",").map((coord) => parseFloat(coord.trim()))
                    : [0, 0], // Default coordinates if not provided
            }));
            // Update the state with the new data
            setCompanies((prevCompanies) => [...prevCompanies, ...formattedData]);
        };
        reader.readAsArrayBuffer(file);
    };
    // Add a new company
    const handleAddCompany = () => {
        if (!newCompany.name || !newCompany.category) {
            alert("Name and Category are required!");
            return;
        }
        const newId = companies.length > 0 ? Math.max(...companies.map((c) => c.id)) + 1 : 1;
        setCompanies([...companies, { ...newCompany, id: newId }]);
        setNewCompany({});
    };
    // Update an existing company
    const handleUpdateCompany = () => {
        if (!editingCompany)
            return;
        setCompanies(companies.map((c) => (c.id === editingCompany.id ? editingCompany : c)));
        setEditingCompany(null);
    };
    // Delete a company
    const handleDeleteCompany = (id) => {
        setCompanies(companies.filter((c) => c.id !== id));
    };
    return (_jsxs("div", { className: "p-6 bg-gray-900 min-h-screen text-gray-200", children: [_jsx("h1", { className: "text-3xl font-bold text-center text-green-400 mb-8", children: "\uD83C\uDF3E Manage Companies" }), _jsxs("div", { className: "bg-gray-800 p-6 rounded-lg shadow-lg mb-8", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-300 mb-4", children: "Import Data" }), _jsx("input", { type: "file", accept: ".xlsx, .csv", onChange: handleFileUpload, className: "block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600" })] }), _jsxs("div", { className: "bg-gray-800 p-6 rounded-lg shadow-lg mb-8", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-300 mb-4", children: editingCompany ? "Edit Company" : "Add New Company" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx("input", { type: "text", placeholder: "Name", value: editingCompany ? editingCompany.name : newCompany.name || "", onChange: (e) => handleInputChange(e, "name"), className: "border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500" }), _jsxs("select", { value: editingCompany ? editingCompany.category : newCompany.category || "", onChange: (e) => handleInputChange(e, "category"), className: "border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500", children: [_jsx("option", { value: "", disabled: true, children: "Select Category" }), categoryOptions.map((category) => (_jsx("option", { value: category, children: category }, category)))] }), _jsxs("select", { value: editingCompany ? editingCompany.commodity.join(", ") : newCompany.commodity?.join(", ") || "", onChange: (e) => handleInputChange(e, "commodity"), className: "border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500", children: [_jsx("option", { value: "", disabled: true, children: "Select Commodity" }), commodityOptions.map((commodity) => (_jsx("option", { value: commodity, children: commodity }, commodity)))] }), _jsx("input", { type: "text", placeholder: "Office Address", value: editingCompany ? editingCompany.officeAddress : newCompany.officeAddress || "", onChange: (e) => handleInputChange(e, "officeAddress"), className: "border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500" }), _jsx("input", { type: "text", placeholder: "Contact Person", value: editingCompany ? editingCompany.contactPerson : newCompany.contactPerson || "", onChange: (e) => handleInputChange(e, "contactPerson"), className: "border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500" }), _jsx("input", { type: "text", placeholder: "Phone Number", value: editingCompany ? editingCompany.phoneNumber : newCompany.phoneNumber || "", onChange: (e) => handleInputChange(e, "phoneNumber"), className: "border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500" }), _jsx("input", { type: "text", placeholder: "Designation", value: editingCompany ? editingCompany.designation : newCompany.designation || "", onChange: (e) => handleInputChange(e, "designation"), className: "border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500" }), _jsx("input", { type: "text", placeholder: "Email/Website", value: editingCompany ? editingCompany.emailWebsite : newCompany.emailWebsite || "", onChange: (e) => handleInputChange(e, "emailWebsite"), className: "border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500" }), _jsx("input", { type: "text", placeholder: "Coordinates (e.g., 10.123, 7.456)", value: editingCompany
                                    ? editingCompany.coordinates.join(", ")
                                    : newCompany.coordinates?.join(", ") || "", onChange: (e) => {
                                    const input = e.target.value;
                                    const coordinateArray = input
                                        .split(",")
                                        .map((coord) => coord.trim())
                                        .filter((coord) => !isNaN(parseFloat(coord))); // Filter out invalid values
                                    if (editingCompany) {
                                        setEditingCompany({
                                            ...editingCompany,
                                            coordinates: coordinateArray.map((coord) => parseFloat(coord)),
                                        });
                                    }
                                    else {
                                        setNewCompany({
                                            ...newCompany,
                                            coordinates: coordinateArray.map((coord) => parseFloat(coord)),
                                        });
                                    }
                                }, className: "border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500" })] }), _jsx("div", { className: "mt-6 flex space-x-4", children: editingCompany ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleUpdateCompany, className: "bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600", children: "Update Company" }), _jsx("button", { onClick: () => setEditingCompany(null), className: "bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600", children: "Cancel" })] })) : (_jsx("button", { onClick: handleAddCompany, className: "bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600", children: "Add Company" })) })] }), _jsxs("div", { className: "bg-gray-800 p-6 rounded-lg shadow-lg", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-300 mb-4", children: "Companies List" }), _jsxs("table", { className: "w-full border-collapse border border-gray-600 text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-700", children: [_jsx("th", { className: "border border-gray-600 px-2 py-1 text-left text-gray-300", children: "Name" }), _jsx("th", { className: "border border-gray-600 px-2 py-1 text-left text-gray-300", children: "Category" }), _jsx("th", { className: "border border-gray-600 px-2 py-1 text-left text-gray-300", children: "Commodity" }), _jsx("th", { className: "border border-gray-600 px-2 py-1 text-left text-gray-300", children: "Office Address" }), _jsx("th", { className: "border border-gray-600 px-2 py-1 text-left text-gray-300", children: "Contact Person" }), _jsx("th", { className: "border border-gray-600 px-2 py-1 text-left text-gray-300", children: "Phone Number" }), _jsx("th", { className: "border border-gray-600 px-2 py-1 text-left text-gray-300", children: "Designation" }), _jsx("th", { className: "border border-gray-600 px-2 py-1 text-left text-gray-300", children: "Email/Website" }), _jsx("th", { className: "border border-gray-600 px-2 py-1 text-left text-gray-300", children: "Coordinates" }), _jsx("th", { className: "border border-gray-600 px-2 py-1 text-left text-gray-300", children: "Actions" })] }) }), _jsx("tbody", { children: companies.map((company) => (_jsxs("tr", { className: "hover:bg-gray-700", children: [_jsx("td", { className: "border border-gray-600 px-2 py-1 text-gray-200", children: company.name }), _jsx("td", { className: "border border-gray-600 px-2 py-1 text-gray-200", children: company.category }), _jsx("td", { className: "border border-gray-600 px-2 py-1 text-gray-200", children: company.commodity.join(", ") }), _jsx("td", { className: "border border-gray-600 px-2 py-1 text-gray-200", children: company.officeAddress }), _jsx("td", { className: "border border-gray-600 px-2 py-1 text-gray-200", children: company.contactPerson }), _jsx("td", { className: "border border-gray-600 px-2 py-1 text-gray-200", children: company.phoneNumber }), _jsx("td", { className: "border border-gray-600 px-2 py-1 text-gray-200", children: company.designation }), _jsx("td", { className: "border border-gray-600 px-2 py-1 text-gray-200", children: company.emailWebsite }), _jsxs("td", { className: "border border-gray-600 px-2 py-1 text-gray-200", children: ["[", company.coordinates[0], ", ", company.coordinates[1], "]"] }), _jsxs("td", { className: "border border-gray-600 px-2 py-1", children: [_jsx("button", { onClick: () => setEditingCompany(company), className: "bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-1", children: "Edit" }), _jsx("button", { onClick: () => handleDeleteCompany(company.id), className: "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600", children: "Delete" })] })] }, company.id))) })] })] })] }));
};
export default CompaniesPage;
