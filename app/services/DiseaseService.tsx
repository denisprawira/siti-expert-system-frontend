import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

interface Patient {
    name: string;
    age: number;
    sex: string;
    address: string;
    email: string;
}

interface DiseaseServiceResponse {
    status: string;
    code: number;
    data: any;
}

class DiseaseService {
    async getDiagnose(patient: Patient, symptoms: any): Promise<any> {
        try {
            const data = { patient, symptoms };
            const response: AxiosResponse<DiseaseServiceResponse> =
                await axios.post(`${API_BASE_URL}/api/disease/diagnose`, {
                    data,
                });

            return response.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getDiseases(): Promise<any> {
        try {
            const response: AxiosResponse<DiseaseServiceResponse> =
                await axios.get(`${API_BASE_URL}/api/disease/`);

            const str = JSON.stringify(response.data, null, 4);
            console.log(str);
            return response.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default DiseaseService;
