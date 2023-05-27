import axios from 'axios';

class DiseaseService {
  async getDiagnose(data:any) {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/disease/getDiagnose', { data });
      return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  async getDiseases() {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/disease/getDiseases');
      return response.data;
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
}

export default DiseaseService;

