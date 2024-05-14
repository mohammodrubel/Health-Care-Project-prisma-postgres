export const patientFilterableFields = ['name','email','searchTerm','contactNumber','address ']
export  const patientSearchableFields = ["name", "email"]

export type PatientUpdateType = {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
    gender: "MALE" | "FEMALE";
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    medicalReport: {
        id: string;
        patientId: string;
        reportName: string;
        reportLink: string;
        createdAt: string;
        updatedAt: string | null;
    }[];
    patientHealthData: {
        id: string;
        patientId: string;
        gender: "MALE" | "FEMALE" | "OTHER";
        dateOfBirth: string;
        bloodGroup: string;
        hasAllergies: boolean;
        hasDiabetes: boolean | null;
        height: number | null;
        weight: number | null;
        smokingStatus: boolean;
        dietaryPreferences: string | null;
        pregnancyStatus: string | null;
        mentalHealthHistory: string | null;
        immunizationStatus: string | null;
        hasPastSurgeries: boolean | null;
        recentAnxiety: string | null;
        recentDepression: string | null;
        maritalStatus: "MARRIED" | "UNMARRIED" ;
        createdAt: string | null;
        updatedAt: string | null;
    };
};
