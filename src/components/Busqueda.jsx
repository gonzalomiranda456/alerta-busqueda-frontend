import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';

const Busqueda = () => {
    return (
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-4" style={{ color: '#0a2f6b' }}>Búsquedas Activas</h2>
            
            {/* SECCIÓN DEL BUSCADOR */}
            <Row className="justify-content-center mb-5">
                <Col md={8}>
                    <InputGroup className="shadow-sm">
                        <Form.Control 
                            placeholder="Buscar por nombre, ubicación o características..." 
                            size="lg"
                            className="border-primary"
                        />
                        <Button variant="primary" className="px-4" style={{ backgroundColor: '#0a2f6b', border: 'none' }}>
                            <i className="bi bi-search me-2"></i> Buscar
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            {/* GRILLA DE TARJETAS */}
            <Row className="g-4">
                {/* Tarjeta 1 */}
                <Col md={4} sm={6}>
                    <Card className="h-100 shadow-sm border-0">
                        {/* Si tenés una foto real en la carpeta public, cambiala acá. Ej: src="/img/foto1.jpg" */}
                        <div className="bg-light text-center py-5 rounded-top border-bottom">
                            <i className="bi bi-person-bounding-box text-secondary" style={{ fontSize: '4rem' }}></i>
                        </div>
                        <Card.Body>
                            <Card.Title className="fw-bold fs-4 text-primary">Nombre Apellido</Card.Title>
                            <Card.Text className="text-dark mb-1">
                                <i className="bi bi-geo-alt-fill text-danger me-2"></i> 
                                <strong>Lugar:</strong> Ciudad, Provincia
                            </Card.Text>
                            <Card.Text className="text-dark mb-3">
                                <i className="bi bi-calendar-event-fill text-warning me-2"></i> 
                                <strong>Desaparición:</strong> DD/MM/AAAA
                            </Card.Text>
                            <Button variant="outline-primary" className="w-100 fw-bold">
                                Ver detalles
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                
                {/* Podés copiar y pegar la columna (Col) anterior para agregar más tarjetas a la grilla */}
                
            </Row>
        </Container>
    );
};

export default Busqueda;