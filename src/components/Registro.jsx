import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const Registro = () => {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-4 p-md-5">
                            <h2 className="text-center fw-bold mb-4" style={{ color: '#0a2f6b' }}>
                                Registrar nueva búsqueda
                            </h2>
                            <p className="text-center text-secondary mb-3">
                                Por favor, completá los datos de la persona con la mayor precisión posible.
                            </p>

                            <Alert variant="warning" className="d-flex align-items-center mb-4">
                                <i className="bi bi-exclamation-triangle-fill fs-4 me-3 text-warning-emphasis"></i>
                                <div>
                                    <strong>Aviso importante:</strong> Todos los casos registrados serán revisados y verificados por un administrador antes de hacerse públicos en la plataforma.
                                </div>
                            </Alert>

                            <Form>
                                <Form.Group className="mb-3" controlId="nombre">
                                    <Form.Label className="fw-bold">Nombre y Apellido</Form.Label>
                                    <Form.Control type="text" placeholder="Ej: Juan Pérez" required />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} sm={6} controlId="edad" className="mb-3 mb-sm-0">
                                        <Form.Label className="fw-bold">Edad aproximada</Form.Label>
                                        <Form.Control type="number" placeholder="Ej: 35" required />
                                    </Form.Group>

                                    <Form.Group as={Col} sm={6} controlId="fecha">
                                        <Form.Label className="fw-bold">Fecha de desaparición</Form.Label>
                                        <Form.Control type="date" required />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="ubicacion">
                                    <Form.Label className="fw-bold">Última ubicación conocida</Form.Label>
                                    <Form.Control type="text" placeholder="Barrio, Ciudad, Provincia" required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="descripcion">
                                    <Form.Label className="fw-bold">Descripción física y vestimenta</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Detalles sobre altura, contextura, ropa que llevaba puesta..." required />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="foto">
                                    <Form.Label className="fw-bold">Subir fotografía</Form.Label>
                                    <Form.Control type="file" accept="image/*" />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="primary" size="lg" type="submit" style={{ backgroundColor: '#0a2f6b', border: 'none' }}>
                                        Publicar Búsqueda
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Registro;