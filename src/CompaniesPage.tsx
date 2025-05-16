import React, { useState } from "react";
import { companies as initialCompanies } from "./data/companies";
import * as XLSX from "xlsx";

interface Company {
    id: number;
    name: string;
    category: string;
    commodity: string[];
    officeAddress: string;
    contactPerson: string;
    phoneNumber: string;
    designation: string;
    emailWebsite: string;
    coordinates: number[];
}

const CompaniesPage: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>(initialCompanies);
    const [newCompany, setNewCompany] = useState<Partial<Company>>({});
    const [editingCompany, setEditingCompany] = useState<Company | null>(null);

    // Dropdown options for category and commodity
    const categoryOptions = ["Contract Farming", "Fertilizer Company", "Seeds Company", "Processors", "Aggregator", "Mechanization"];
    const commodityOptions = ["Wheat", "Corn", "Rice", "Soybeans", "Cotton"];

    // Handle input changes for new or editing company
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof Company
    ) => {
        if (editingCompany) {
            setEditingCompany({ ...editingCompany, [field]: e.target.value });
        } else {
            setNewCompany({ ...newCompany, [field]: e.target.value });
        }
    };

    // Handle file upload and parse data
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData: any[] = XLSX.utils.sheet_to_json(sheet);

            // Validate and format the parsed data
            const formattedData: Company[] = parsedData.map((item, index) => ({
                id: companies.length + index + 1, // Generate unique IDs
                name: item.name || "",
                category: item.category || "",
                commodity: item.commodity ? item.commodity.split(",").map((c: string) => c.trim()) : [],
                officeAddress: item.officeAddress || "",
                contactPerson: item.contactPerson || "",
                phoneNumber: item.phoneNumber || "",
                designation: item.designation || "",
                emailWebsite: item.emailWebsite || "",
                coordinates: item.coordinates
                    ? item.coordinates.split(",").map((coord: string) => parseFloat(coord.trim()))
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
        setCompanies([...companies, { ...newCompany, id: newId } as Company]);
        setNewCompany({});
    };

    // Update an existing company
    const handleUpdateCompany = () => {
        if (!editingCompany) return;
        setCompanies(companies.map((c) => (c.id === editingCompany.id ? editingCompany : c)));
        setEditingCompany(null);
    };

    // Delete a company
    const handleDeleteCompany = (id: number) => {
        setCompanies(companies.filter((c) => c.id !== id));
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-gray-200">
            <h1 className="text-3xl font-bold text-center text-green-400 mb-8">
                🌾 Manage Companies
            </h1>

            {/* Import Data Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">Import Data</h2>
                <input
                    type="file"
                    accept=".xlsx, .csv"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
                />
            </div>

            {/* Add or Edit Company Form */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">
                    {editingCompany ? "Edit Company" : "Add New Company"}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={editingCompany ? editingCompany.name : newCompany.name || ""}
                        onChange={(e) => handleInputChange(e, "name")}
                        className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500"
                    />
                    <select
                        value={editingCompany ? editingCompany.category : newCompany.category || ""}
                        onChange={(e) => handleInputChange(e, "category")}
                        className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500"
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        {categoryOptions.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <select
                        value={editingCompany ? editingCompany.commodity.join(", ") : newCompany.commodity?.join(", ") || ""}
                        onChange={(e) => handleInputChange(e, "commodity")}
                        className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500"
                    >
                        <option value="" disabled>
                            Select Commodity
                        </option>
                        {commodityOptions.map((commodity) => (
                            <option key={commodity} value={commodity}>
                                {commodity}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Office Address"
                        value={editingCompany ? editingCompany.officeAddress : newCompany.officeAddress || ""}
                        onChange={(e) => handleInputChange(e, "officeAddress")}
                        className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        placeholder="Contact Person"
                        value={editingCompany ? editingCompany.contactPerson : newCompany.contactPerson || ""}
                        onChange={(e) => handleInputChange(e, "contactPerson")}
                        className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={editingCompany ? editingCompany.phoneNumber : newCompany.phoneNumber || ""}
                        onChange={(e) => handleInputChange(e, "phoneNumber")}
                        className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        placeholder="Designation"
                        value={editingCompany ? editingCompany.designation : newCompany.designation || ""}
                        onChange={(e) => handleInputChange(e, "designation")}
                        className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        placeholder="Email/Website"
                        value={editingCompany ? editingCompany.emailWebsite : newCompany.emailWebsite || ""}
                        onChange={(e) => handleInputChange(e, "emailWebsite")}
                        className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        placeholder="Coordinates (e.g., 10.123, 7.456)"
                        value={
                            editingCompany
                                ? editingCompany.coordinates.join(", ")
                                : newCompany.coordinates?.join(", ") || ""
                        }
                        onChange={(e) => {
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
                            } else {
                                setNewCompany({
                                    ...newCompany,
                                    coordinates: coordinateArray.map((coord) => parseFloat(coord)),
                                });
                            }
                        }}
                        className="border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mt-6 flex space-x-4">
                    {editingCompany ? (
                        <>
                            <button
                                onClick={handleUpdateCompany}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Update Company
                            </button>
                            <button
                                onClick={() => setEditingCompany(null)}
                                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleAddCompany}
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                        >
                            Add Company
                        </button>
                    )}
                </div>
            </div>

            {/* Companies List */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">Companies List</h2>
                <table className="w-full border-collapse border border-gray-600 text-sm">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">Name</th>
                            <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">Category</th>
                            <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">Commodity</th>
                            <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">Office Address</th>
                            <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">Contact Person</th>
                            <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">Phone Number</th>
                            <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">Designation</th>
                            <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">Email/Website</th>
                            <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">Coordinates</th>
                            <th className="border border-gray-600 px-2 py-1 text-left text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company) => (
                            <tr key={company.id} className="hover:bg-gray-700">
                                <td className="border border-gray-600 px-2 py-1 text-gray-200">{company.name}</td>
                                <td className="border border-gray-600 px-2 py-1 text-gray-200">{company.category}</td>
                                <td className="border border-gray-600 px-2 py-1 text-gray-200">{company.commodity.join(", ")}</td>
                                <td className="border border-gray-600 px-2 py-1 text-gray-200">{company.officeAddress}</td>
                                <td className="border border-gray-600 px-2 py-1 text-gray-200">{company.contactPerson}</td>
                                <td className="border border-gray-600 px-2 py-1 text-gray-200">{company.phoneNumber}</td>
                                <td className="border border-gray-600 px-2 py-1 text-gray-200">{company.designation}</td>
                                <td className="border border-gray-600 px-2 py-1 text-gray-200">{company.emailWebsite}</td>
                                <td className="border border-gray-600 px-2 py-1 text-gray-200">
                                    [{company.coordinates[0]}, {company.coordinates[1]}]
                                </td>
                                <td className="border border-gray-600 px-2 py-1">
                                    <button
                                        onClick={() => setEditingCompany(company)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-1"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCompany(company.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompaniesPage;