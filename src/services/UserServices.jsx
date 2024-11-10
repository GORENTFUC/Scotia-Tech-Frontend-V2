import axios from 'axios';

class ApiService {
  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL; 
  }

  async programsByFaculty(facultadId) {
    try {
      const response = await axios.get(`${this.apiUrl}/program/Programs`, {
        params: {
            facultadId: facultadId
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching programs:", error);
      throw error;
    }
  }
};

export default new ApiService(); 
