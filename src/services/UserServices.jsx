import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


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
      return response;
    } catch (error) {
      console.error("Error fetching programs:", error);
      throw error;
    }
  }
  
  async faculties() {
    try {
        const response = await axios.get(`${this.apiUrl}/program/faculties`);
        return response; 
    } catch (error) {
        console.error("Error al obtener las facultades:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al cargar las facultades.',
            confirmButtonText: 'Aceptar'
        });
    }
}

async register(user, navigate){
    const response = await axios.post(`${this.apiUrl}/user/register`, user, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const { status, message } = response.data; 

    if (status === 200 || status === 201) {
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: message || 'El usuario ha sido registrado correctamente.',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            navigate("/"); 
        });
    }
    if (status === 400) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el registro',
            text: message || 'No se pudo registrar el usuario, por favor inténtalo nuevamente.',
            confirmButtonText: 'Aceptar'
        });
    }
} catch (error) {
    Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: error.response?.data?.message || 'No se pudo registrar el usuario, por favor inténtalo nuevamente.',
        confirmButtonText: 'Aceptar'
    });
}


};

export default new ApiService(); 
