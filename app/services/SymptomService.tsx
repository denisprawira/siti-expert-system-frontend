import axios from 'axios';

class SymptomService {
  async getSymptoms() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/symptom/');
      return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
}

export default SymptomService;