export interface Company {
    id: string;
    name: string;
    category: string;
    commodity: string[];
    officeAddress: string;
    contactPerson: string;
    phoneNumber: string;
    designation: string;
    emailWebsite: string;
    coordinates: [number, number];
    companyName?: string;
}
export interface MarkerCluster extends L.Layer {
    getChildCount(): number;
    getAllChildMarkers(): L.Marker[];
}
