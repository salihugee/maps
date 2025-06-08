import { Company } from '../types';
export declare const getCompanies: () => Promise<Company[]>;
export declare const createCompany: (companyData: any) => Promise<any>;
export declare const updateCompany: (id: number, companyData: any) => Promise<any>;
export declare const deleteCompany: (id: number) => Promise<any>;
