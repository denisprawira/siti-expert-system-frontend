import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

class SymptomService {
    async getSymptoms(): Promise<any> {
        try {
            const response: AxiosResponse<any> = await axios.get(
                `${API_BASE_URL}/api/symptom/`
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default SymptomService;
