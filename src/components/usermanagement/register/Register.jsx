import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import fondo from '../Fondo.png';
import '../App.css';
import './Registro.styles.css';
import RegistroForm from './RegistroForm';
import { fetchFaculties, fetchProgramsByFaculty, submitForm } from './api';
import { validateForm } from './validations';
import Swal from 'sweetalert2';

function Registro() {
    const [formData, setFormData] = useState({
        firstName: '',
        firstLastName: '',
        documentNumber: '',
        password: '',
        email: '',
        role: '',
        faculty: '',
        program: ''
    });

    const [faculties, setFaculties] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchFaculties(setFaculties, setErrors);
    }, []);

    const handleChange = (e) => {
        // Aquí va la lógica de cambio en el formulario
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm(formData, setErrors)) {
            await submitForm(formData);
        }
    };

    return (
        <div className="registro-page" style={{ backgroundImage: `url(${fondo})` }}>
            <Container className="registro-container">
                <Card>
                    <CardBody>
                        <h2>Administración Registros de Usuarios</h2>
                        <p>Importante: Debes ingresar los datos exactamente como se muestran en el documento reportado.</p>
                        <RegistroForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            faculties={faculties}
                            programs={programs}
                            errors={errors}
                        />
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default Registro;
