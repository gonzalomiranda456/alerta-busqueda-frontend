import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const Recibir = () => {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm border-0 bg-light">
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
                                {/* Nombre */}
                                <Form.Group className="mb-3" controlId="nombreSuscriptor">
                                    <Form.Label className="fw-bold">Nombre completo</Form.Label>
                                    <Form.Control type="text" placeholder="Ej: María López" required />
                                </Form.Group>

                                {/* Medio de contacto (Email / Teléfono) */}
                                <Row className="mb-3">
                                    <Form.Group as={Col} sm={6} className="mb-3 mb-sm-0" controlId="emailSuscriptor">
                                        <Form.Label className="fw-bold">Correo electrónico</Form.Label>
                                        <Form.Control type="email" placeholder="tucorreo@ejemplo.com" required />
                                    </Form.Group>

                                    <Form.Group as={Col} sm={6} controlId="telefonoSuscriptor">
                                        <Form.Label className="fw-bold">Número de celular</Form.Label>
                                        <Form.Control type="tel" placeholder="Código de área + Número" />
                                    </Form.Group>
                                </Row>

                                {/* Zona de interés */}
                                <Form.Group className="mb-4" controlId="zonaSuscriptor">
                                    <Form.Label className="fw-bold">Zona de interés (Provincia/Ciudad)</Form.Label>
                                    <Form.Select required>
                                        <option value="">Seleccioná tu provincia...</option>
                                        <option value="tucuman">Tucumán</option>
                                        <option value="buenos_aires">Buenos Aires</option>
                                        <option value="cordoba">Córdoba</option>
                                        <option value="santa_fe">Santa Fe</option>
                                        <option value="salta">Salta</option>
                                        {/* Podés agregar más opciones si querés */}
                                    </Form.Select>
                                </Form.Group>

                                {/* Checkbox de términos */}
                                <Form.Group className="mb-4" controlId="terminos">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Acepto recibir notificaciones y comparto mis datos según la política de privacidad." 
                                        required
                                    />
                                </Form.Group>

                                {/* Botón enviar */}
                                <div className="d-grid">
                                    <Button variant="primary" size="lg" type="submit" style={{ backgroundColor: '#0a2f6b', border: 'none' }}>
                                        Activar Alertas
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

export default Recibir;