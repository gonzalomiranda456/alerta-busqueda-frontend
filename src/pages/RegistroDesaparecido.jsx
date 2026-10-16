import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const RegistroDesaparecido = () => {
    return (
        <>
            <img src="/img/Logo_Fondo_Blanco.png" alt="Fondo" className="fondo-marca-agua" />
            <Container className="py-5" style={{ minHeight: '80vh', position: 'relative', zIndex: 1, marginTop: '60px' }}>
                <Helmet>
                    <title>Registrar Caso | Alerta Búsqueda</title>
                    <meta name="description" content="Formulario para registrar una nueva búsqueda de una persona desaparecida. Los datos serán verificados por un administrador." />
                </Helmet>
                
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
                            <Card.Body className="p-4 p-md-5">
                                <h2 className="text-center fw-bold mb-4" style={{ color: '#0a2f6b' }}>
                                    Registrar nueva búsqueda
                                </h2>
                                <p className="text-center text-secondary mb-3">
                                    Por favor, completá los datos de la persona con la mayor precisión posible.
                                </p>

                                <Alert variant="warning" className="d-flex align-items-center mb-4" style={{ borderRadius: '10px' }}>
                                    <i className="bi bi-exclamation-triangle-fill fs-4 me-3 text-warning-emphasis"></i>
                                    <div>
                                        <strong>Aviso importante:</strong> Todos los casos registrados serán revisados y verificados por un administrador antes de hacerse públicos en la plataforma.
                                    </div>
                                </Alert>

                                <Form>
                                    <Form.Group className="mb-3" controlId="nombre">
                                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Nombre y Apellido</Form.Label>
                                        <Form.Control type="text" placeholder="Ej: Juan Pérez" required style={{ borderRadius: '8px' }} />
                                    </Form.Group>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} sm={6} controlId="edad" className="mb-3 mb-sm-0">
                                            <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Edad aproximada</Form.Label>
                                            <Form.Control type="number" placeholder="Ej: 35" required style={{ borderRadius: '8px' }} />
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} controlId="fecha">
                                            <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Fecha de desaparición</Form.Label>
                                            <Form.Control type="date" required style={{ borderRadius: '8px' }} />
                                        </Form.Group>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="ubicacion">
                                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Última ubicación conocida</Form.Label>
                                        <Form.Control type="text" placeholder="Barrio, Ciudad, Provincia" required style={{ borderRadius: '8px' }} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="descripcion">
                                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Descripción física y vestimenta</Form.Label>
                                        <Form.Control as="textarea" rows={4} placeholder="Detalles sobre altura, contextura, ropa que llevaba puesta..." required style={{ borderRadius: '8px' }} />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="foto">
                                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Subir fotografía</Form.Label>
                                        <Form.Control type="file" accept="image/*" style={{ borderRadius: '8px' }} />
                                    </Form.Group>

                                    <div className="d-grid mt-5">
                                        <Button 
                                            variant="primary" 
                                            size="lg" 
                                            type="submit" 
                                            className="rounded-pill fw-bold shadow-sm d-flex justify-content-center align-items-center"
                                            style={{ backgroundColor: '#0a2f6b', border: 'none', transition: 'transform 0.2s ease' }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            <i className="bi bi-cloud-arrow-up-fill me-2 fs-5"></i> Publicar Búsqueda
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

export default RegistroDesaparecido;