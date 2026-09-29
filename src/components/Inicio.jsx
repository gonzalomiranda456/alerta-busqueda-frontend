import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const Inicio = () => {
    return (
        <Container className="py-5">
            <Helmet>
                <title>Inicio | Alerta Búsqueda</title>
                <meta name="description" content="Plataforma de difusión y centralización de búsquedas de personas desaparecidas en Argentina. Tu colaboración hace la diferencia." />
            </Helmet>
            
            <Row className="align-items-center mb-5 text-center text-md-start">
                <Col md={6} className="mb-4 mb-md-0">
                    <h1 className="fw-bold" style={{ color: '#0a2f6b', fontSize: '3rem' }}>
                        Encontrarnos es <br className="d-none d-md-block" /> tarea de todos
                    </h1>
                    <p className="lead text-secondary mt-3 mb-4">
                        Plataforma de difusión y centralización de búsquedas de personas desaparecidas. Tu colaboración puede hacer la diferencia.
                    </p>
                    <div className="d-grid d-md-flex gap-3">
                        <Button variant="primary" size="lg" href="/busqueda" className="fw-bold rounded-pill px-4" style={{ backgroundColor: '#0a2f6b', border: 'none' }}>
                            Ver búsquedas activas
                        </Button>
                        <Button variant="outline-primary" size="lg" href="/registro" className="fw-bold rounded-pill px-4">
                            Registrar caso
                        </Button>
                    </div>
                </Col>
                <Col md={6}>
                    <img 
                        src="/img/logo-encabezado2 (2).png" 
                        alt="Ilustración principal" 
                        className="img-fluid rounded shadow-sm"
                    />
                </Col>
            </Row>

            {/* SECCIÓN INFORMACIÓN / BENEFICIOS */}
            <h2 className="text-center fw-bold mb-4" style={{ color: '#0a2f6b' }}>¿Cómo podés ayudar?</h2>
            <Row className="g-4">
                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm text-center p-3">
                        <Card.Body>
                            <i className="bi bi-eye text-primary" style={{ fontSize: '3rem' }}></i>
                            <Card.Title className="fw-bold mt-3">Mantenete alerta</Card.Title>
                            <Card.Text className="text-secondary">
                                Revisá los casos activos en tu zona y compartí la información en tus redes sociales.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm text-center p-3">
                        <Card.Body>
                            <i className="bi bi-bell text-primary" style={{ fontSize: '3rem' }}></i>
                            <Card.Title className="fw-bold mt-3">Recibí notificaciones</Card.Title>
                            <Card.Text className="text-secondary">
                                Suscribite a nuestro sistema de alertas para enterarte de búsquedas prioritarias al instante.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm text-center p-3">
                        <Card.Body>
                            <i className="bi bi-shield-check text-primary" style={{ fontSize: '3rem' }}></i>
                            <Card.Title className="fw-bold mt-3">Aportá datos</Card.Title>
                            <Card.Text className="text-secondary">
                                Si tenés información sobre alguna persona, contactate inmediatamente con las autoridades.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Inicio;