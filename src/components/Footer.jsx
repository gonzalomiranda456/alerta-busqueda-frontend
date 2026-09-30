import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <Container>
                <Row>
                    <Col md={6} className="mb-3 mb-md-0">
                        <h5 className="fw-bold text-info">Alerta Búsqueda</h5>
                        <p className="mb-0 text-secondary" style={{ fontSize: '0.9rem' }}>
                            Plataforma dedicada a la difusión y centralización de búsquedas de personas en Argentina. Tu compromiso nos ayuda a encontrarlos.
                        </p>
                    </Col>
                    <Col md={3} className="mb-3 mb-md-0">
                        <h5 className="fw-bold">Enlaces Rápidos</h5>
                        <ul className="list-unstyled text-secondary" style={{ fontSize: '0.9rem' }}>
                            <li><a href="/busqueda" className="text-decoration-none text-secondary">Búsquedas Activas</a></li>
                            <li><a href="/registro" className="text-decoration-none text-secondary">Registrar Caso</a></li>
                            <li><a href="/recibir" className="text-decoration-none text-secondary">Alertas por Zona</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5 className="fw-bold">Líneas de Ayuda</h5>
                        <ul className="list-unstyled text-secondary" style={{ fontSize: '0.9rem' }}>
                            <li><i className="bi bi-telephone-fill me-2"></i>Línea 134 (Denuncias)</li>
                            <li><i className="bi bi-telephone-fill me-2"></i>Línea 145 (Trata de personas)</li>
                        </ul>
                    </Col>
                </Row>
                <hr className="border-secondary" />
                <Row>
                    <Col className="text-center text-secondary" style={{ fontSize: '0.85rem' }}>
                        &copy; {new Date().getFullYear()} Alerta Búsqueda. Todos los derechos reservados. | Proyecto Práctica Profesional Supervisada.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;