import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Swal from 'sweetalert2'; 

const API_PROVINCIAS = import.meta.env.VITE_API_PROVINCIAS;
const API_DEPARTAMENTOS = import.meta.env.VITE_API_DEPARTAMENTOS;

const Recibir = () => {
    const [listaProvincias, setListaProvincias] = useState([]);
    const [provincia, setProvincia] = useState('');
    const [cargandoProvincias, setCargandoProvincias] = useState(true);
    const [listaDepartamentos, setListaDepartamentos] = useState([]);
    const [departamento, setDepartamento] = useState('');
    const [cargandoDepartamentos, setCargandoDepartamentos] = useState(false);

    useEffect(() => {
        const obtenerProvincias = async () => {
            try {
                const response = await axios.get(API_PROVINCIAS);
                const provinciasOrdenadas = response.data.provincias.sort((a, b) => 
                    a.nombre.localeCompare(b.nombre)
                );
                setListaProvincias(provinciasOrdenadas);
                setCargandoProvincias(false);
            } catch (error) {
                console.error("Error API Provincias:", error);
                setCargandoProvincias(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al cargar las provincias. Por favor, intentá más tarde.',
                    confirmButtonColor: '#0a2f6b'
                });
            }
        };
        obtenerProvincias();
    }, []);

    useEffect(() => {
        if (provincia === '') {
            setListaDepartamentos([]);
            setDepartamento('');
            return;
        }

        const obtenerDepartamentos = async () => {
            setCargandoDepartamentos(true);
            try {
                const response = await axios.get(`${API_DEPARTAMENTOS}?provincia=${provincia}&max=500`);
                
                const departamentosOrdenados = response.data.departamentos.sort((a, b) => 
                    a.nombre.localeCompare(b.nombre)
                );
                
                setListaDepartamentos(departamentosOrdenados);
                setCargandoDepartamentos(false);
            } catch (error) {
                console.error("Error API Departamentos:", error);
                setCargandoDepartamentos(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'No pudimos cargar los departamentos de esta provincia.',
                    confirmButtonColor: '#0a2f6b'
                });
            }
        };
        obtenerDepartamentos();
    }, [provincia]);

    return (
        <>
            <img src="/img/Logo_Fondo_Blanco.png" alt="Fondo" className="fondo-marca-agua" />

            <Container className="py-5" style={{ minHeight: '80vh', position: 'relative', zIndex: 1, marginTop: '60px' }}>
                <Helmet>
                    <title>Recibir Alertas | Alerta Búsqueda</title>
                    <meta name="description" content="Suscribite a nuestro sistema de alertas para recibir notificaciones sobre búsquedas prioritarias en tu provincia o ciudad." />
                </Helmet>
                
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-sm border border-2 border-dark" style={{ borderRadius: '15px', backgroundColor: '#e6f2ff' }}>
                            <Card.Body className="p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <i className="bi bi-bell-fill text-primary" style={{ fontSize: '3rem' }}></i>
                                    <h2 className="fw-bold mt-2" style={{ color: '#0a2f6b' }}>
                                        Suscribirse a las Alertas
                                    </h2>
                                    <p className="text-secondary">
                                        Recibí notificaciones inmediatas sobre nuevas búsquedas directamente en tu correo electrónico o celular.
                                    </p>
                                </div>

                                <Form>
                                    <Form.Group className="mb-3" controlId="nombreSuscriptor">
                                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Nombre completo</Form.Label>
                                        <Form.Control type="text" placeholder="Ej: María López" required className="border border-2 border-dark" style={{ borderRadius: '8px' }} />
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} sm={6} className="mb-3 mb-sm-0" controlId="emailSuscriptor">
                                            <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Correo electrónico</Form.Label>
                                            <Form.Control type="email" placeholder="tucorreo@ejemplo.com" required className="border border-2 border-dark" style={{ borderRadius: '8px' }} />
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} controlId="telefonoSuscriptor">
                                            <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Número de celular</Form.Label>
                                            <Form.Control type="tel" placeholder="Código de área + Número" className="border border-2 border-dark" style={{ borderRadius: '8px' }} />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-4">
                                        <Form.Group as={Col} sm={6} className="mb-3 mb-sm-0" controlId="provinciaSuscriptor">
                                            <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Provincia</Form.Label>
                                            <Form.Select 
                                                required 
                                                className="border border-2 border-dark"
                                                style={{ borderRadius: '8px' }}
                                                value={provincia}
                                                onChange={(e) => setProvincia(e.target.value)}
                                                disabled={cargandoProvincias}
                                            >
                                                <option value="">
                                                    {cargandoProvincias ? 'Cargando provincias...' : 'Seleccioná tu provincia...'}
                                                </option>
                                                {listaProvincias.map((prov) => (
                                                    <option key={prov.id} value={prov.nombre}>{prov.nombre}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} controlId="departamentoSuscriptor">
                                            <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Departamento</Form.Label>
                                            <Form.Select 
                                                required 
                                                className="border border-2 border-dark"
                                                style={{ borderRadius: '8px' }}
                                                value={departamento}
                                                onChange={(e) => setDepartamento(e.target.value)}
                                                disabled={cargandoDepartamentos || listaDepartamentos.length === 0}
                                            >
                                                <option value="">
                                                    {cargandoDepartamentos 
                                                        ? 'Buscando departamentos...' 
                                                        : (provincia === '' ? 'Primero elegí una provincia' : 'Seleccioná tu departamento...')}
                                                </option>
                                                {listaDepartamentos.map((dep) => (
                                                    <option key={dep.id} value={dep.nombre}>{dep.nombre}</option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>

                                    <Form.Group className="mb-4" controlId="terminos">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Acepto recibir notificaciones y comparto mis datos según la política de privacidad." 
                                            required
                                        />
                                    </Form.Group>

                                    <div className="d-grid mt-5">
                                        <Button 
                                            variant="primary" 
                                            size="lg" 
                                            type="submit" 
                                            className="rounded-pill fw-bold shadow-sm d-flex justify-content-center align-items-center border border-2 border-dark"
                                            style={{ backgroundColor: '#0a2f6b', transition: 'transform 0.2s ease' }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            <i className="bi bi-bell-fill me-2 fs-5"></i> Activar Alertas
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Recibir;