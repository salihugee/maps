export interface Company {
    id: string;
    name: string;
    category: string;
    commodity: string;
    officeAddress: string;
    contactPerson: string;
    phoneNumber: string;
    designation: string;
    emailWebsite: string;
    coordinates: [number, number]; // [Latitude, Longitude]
  }
  