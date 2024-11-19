import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import fondo from '../Fondo.png';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Container, Card, CardBody, FormFeedback, Input, Label } from 'reactstrap';
import UserServices from '../services/UserServices';

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
    const navigate = useNavigate();


    const fetchFaculties = async () => {
        try {
            const response = await UserServices.faculties();
            if (response && response.data) {
                setFaculties(response.data.data);
            }
        } catch (error) {
            console.error("Error en el consumo", error);
        }
    };

    const fetchProgramsByFaculty = async (facultadId) => {
        try {
            const response = await UserServices.programsByFaculty(facultadId);
            if (response && response.data) {
                (response.data.data); // Asegurarse de acceder correctamente a los datos
            }
        } catch (error) {
            console.error("Error al obtener los programas:", error);
        }
    };

    useEffect(() => {
        fetchFaculties();
    }, []);

    const shouldShowFacultyAndProgram = formData.role === '3' || formData.role === '4';

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'role') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                ...(value !== '3' && value !== '4' ? { faculty: '', program: '' } : {})
            }));
            setPrograms([]);
        } else if (name === 'documentNumber') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                password: value
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleChangeFacul = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'faculty') {
            fetchProgramsByFaculty(value);
        }
    };

    const validateForm = () => {
        let formErrors = {};
        let valid = true;

        if (!formData.firstName) {
            formErrors.firstName = "El nombre es requerido.";
            valid = false;
        }
        if (!formData.firstLastName) {
            formErrors.firstLastName = "El apellido es requerido.";
            valid = false;
        }
        if (!formData.documentNumber) {
            formErrors.documentNumber = "El número de documento es requerido.";
            valid = false;
        }
        if (!formData.password) {
            formErrors.password = "La contraseña es requerida.";
            valid = false;
        }
        if (!formData.email) {
            formErrors.email = "El correo electrónico es requerido.";
            valid = false;
        }

        setErrors(formErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const user = {
                nombre: formData.firstName,
                apellido: formData.firstLastName,
                identificacion: formData.documentNumber,
                email: formData.email,
                password: formData.password,
                rol: formData.role,
                facultad: formData.faculty,
                programa: formData.program
            };

            try {
                await UserServices.register(user);
            } catch (error) {
                console.error("Error al obtener los programas:", error);
            }
        }
    };


    const styles = {
        page: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f8f9fa',
            backgroundImage: `url(${fondo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        container: {
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        form: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
        },
        button: {
            gridColumn: '1 / -1',
            padding: '10px',
            backgroundColor: '#153949',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        errorText: {
            color: 'red',
            fontSize: '12px',
        },
        title: {
            textAlign: 'center',
            fontWeight: 'bold',
        },
        important: {
            color: 'red',
            textAlign: 'center',
        }
    };

    return (
        <div className="registro-page" style={styles.page}>
            <Container style={styles.container}>
                <Card style={styles.card}>
                    <CardBody>
                        <h2 style={styles.title}>Administración Registros de Usuarios</h2>
                        <p style={styles.important}>Importante: Debes ingresar los datos exactamente como se muestran en el documento reportado.</p>
                        <Form onSubmit={handleSubmit} style={styles.form}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    className="form-control mt-3"
                                    name="firstName"
                                    placeholder="Nombre"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    invalid={!!errors.firstName}
                                />
                                <FormFeedback>{errors.firstName}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Input
                                    type="text"
                                    className="form-control mt-3"
                                    name="firstLastName"
                                    placeholder="Apellido"
                                    value={formData.firstLastName}
                                    onChange={handleChange}
                                    invalid={!!errors.firstLastName}
                                />
                                <FormFeedback>{errors.firstLastName}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Input
                                    type="text"
                                    className="form-control mt-3"
                                    name="documentNumber"
                                    placeholder="Número de documento"
                                    value={formData.documentNumber}
                                    onChange={handleChange}
                                    invalid={!!errors.documentNumber}
                                />
                                <FormFeedback>{errors.documentNumber}</FormFeedback>
                            </FormGroup>

                            { }
                            <FormGroup>
                                <Input
                                    type="text"
                                    className="form-control mt-3"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    disabled
                                />
                            </FormGroup>

                            <FormGroup>
                                <Input
                                    type="email"
                                    className="form-control mt-3"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    value={formData.email}
                                    onChange={handleChange}
                                    invalid={!!errors.email}
                                />
                                <FormFeedback>{errors.email}</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Input
                                    type="select"
                                    className="form-control mt-3"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option disabled value="">Selecciona un rol</option>
                                    <option value="2">Decano</option>
                                    <option value="3">Director de programa</option>
                                    <option value="4">Docente</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="select"
                                    className="form-control mt-3"
                                    name="faculty"
                                    value={formData.faculty}
                                    onChange={handleChangeFacul}
                                >
                                    <option disabled value="">Selecciona una facultad</option>
                                    {faculties.map((facultad) => (
                                        <option key={facultad.facultyId} value={facultad.facultyId}>
                                            {facultad.name}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>


                            {shouldShowFacultyAndProgram && (
                                <>

                                    <FormGroup>
                                        <Input
                                            type="select"
                                            className="form-control mt-3"
                                            name="program"
                                            value={formData.program}
                                            onChange={handleChange}
                                        >
                                            <option disabled value="">Selecciona un programa</option>
                                            {programs.map((program) => (
                                                <option key={program.id} value={program.id}>
                                                    {program.name}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </>
                            )}

                            <Button type="submit" style={styles.button}>Registrar</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default Registro;
