import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const Recibir = () => {
    const datosZonas = {
        tucuman: ["San Miguel de Tucumán", "Yerba Buena", "Tafí Viejo", "Concepción", "Banda del Río Salí"],
        buenos_aires: ["CABA", "La Plata", "Mar del Plata", "Bahía Blanca", "Quilmes"],
        cordoba: ["Córdoba Capital", "Villa Carlos Paz", "Río Cuarto", "San Francisco"],
        santa_fe: ["Rosario", "Santa Fe Capital", "Rafaela", "Venado Tuerto"],
        salta: ["Salta Capital", "Cafayate", "Tartagal", "Orán"]
    };

    const [provincia, setProvincia] = useState('');
    const [ciudadesDisponibles, setCiudadesDisponibles] = useState([]);
    const [ciudad, setCiudad] = useState('');

    useEffect(() => {
        if (provincia !== '') {
            setCiudadesDisponibles(datosZonas[provincia]);
        } else {
            setCiudadesDisponibles([]);
        }
        setCiudad(''); 
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
                                            >
                                                <option value="">Seleccioná tu provincia...</option>
                                                <option value="tucuman">Tucumán</option>
                                                <option value="buenos_aires">Buenos Aires</option>
                                                <option value="cordoba">Córdoba</option>
                                                <option value="santa_fe">Santa Fe</option>
                                                <option value="salta">Salta</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} controlId="ciudadSuscriptor">
                                            <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Ciudad / Localidad</Form.Label>
                                            <Form.Select 
                                                required 
                                                className="border border-2 border-dark"
                                                style={{ borderRadius: '8px' }}
                                                value={ciudad}
                                                onChange={(e) => setCiudad(e.target.value)}
                                                disabled={ciudadesDisponibles.length === 0}
                                            >
                                                <option value="">
                                                    {provincia === '' ? 'Primero elegí una provincia' : 'Seleccioná tu ciudad...'}
                                                </option>
                                                {ciudadesDisponibles.map((ciudadItem, index) => (
                                                    <option key={index} value={ciudadItem}>{ciudadItem}</option>
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