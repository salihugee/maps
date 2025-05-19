import { Company } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
    console.error('VITE_API_URL environment variable is not defined');
}

// Helper function to check if the response is JSON
async function parseJSON(response: Response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }
    throw new TypeError("Response is not JSON");
}

// Company related API calls
export const getCompanies = async (): Promise<Company[]> => {
    try {
        if (!API_BASE_URL) {
            throw new Error('API URL is not configured');
        }
        
        const response = await fetch(`${API_BASE_URL}/companies`);
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Failed to fetch companies: ${response.status} ${response.statusText}${
                    errorText ? ` - ${errorText}` : ''
                }`
            );
        }

        const data = await parseJSON(response);
        
        if (!Array.isArray(data)) {
            throw new Error('Invalid response format: Expected an array of companies');
        }

        return data;
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw error instanceof Error ? error : new Error('Unknown error occurred while fetching companies');
    }
};

export const createCompany = async (companyData: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/companies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(companyData),
        });
        if (!response.ok) throw new Error('Failed to create company');
        return await response.json();
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};

export const updateCompany = async (id: number, companyData: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(companyData),
        });
        if (!response.ok) throw new Error('Failed to update company');
        return await response.json();
    } catch (error) {
        console.error('Error updating company:', error);
        throw error;
    }
};

export const deleteCompany = async (id: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete company');
        return await response.json();
    } catch (error) {
        console.error('Error deleting company:', error);
        throw error;
    }
};
