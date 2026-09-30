import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <>
      <img src="/img/Logo_Fondo_blanco.png" alt="Fondo" className="fondo-marca-agua" />

      <Container className="py-5" style={{ minHeight: '80vh' }}>
        <Helmet>
          <title>Inicio | Alerta Búsqueda</title>
          <meta name="description" content="Plataforma de difusión y centralización de búsquedas de personas desaparecidas en Argentina." />
        </Helmet>

        <div className="text-center mb-5 mt-4">
          <h1 className="fw-bolder" style={{ color: '#0a2f6b', fontSize: '2.8rem', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
            Aproximadamente 10.000 Argentinos se pierden anualmente <br className="d-none d-md-block" />
            <span style={{ color: '#00bfff' }}>tu ayuda puede marcar la diferencia.</span>
          </h1>
        </div>

        <div className="mb-5">
          <h2 className="fw-bold mb-4" style={{ color: '#0a2f6b' }}>Búsquedas Recientes</h2>
          <Row>
            {/* Ficha 1 */}
            <Col md={6} lg={4} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <Card.Img variant="top" src="https://via.placeholder.com/400x300?text=Foto+Desaparecido" />
                <Card.Body>
                  <Card.Title className="fw-bold">Juan Pérez</Card.Title>
                  <Card.Text>
                    <strong>Visto por última vez:</strong> San Miguel de Tucumán<br />
                    <strong>Fecha:</strong> 25/09/2026<br />
                    <strong>Edad:</strong> 34 años
                  </Card.Text>
                  <Button as={Link} to="/busqueda" variant="outline-primary" className="w-100 fw-bold">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <Card.Img variant="top" src="https://via.placeholder.com/400x300?text=Foto+Desaparecida" />
                <Card.Body>
                  <Card.Title className="fw-bold">María Gómez</Card.Title>
                  <Card.Text>
                    <strong>Visto por última vez:</strong> Córdoba Capital<br />
                    <strong>Fecha:</strong> 28/09/2026<br />
                    <strong>Edad:</strong> 22 años
                  </Card.Text>
                  <Button as={Link} to="/busqueda" variant="outline-primary" className="w-100 fw-bold">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={12} lg={4} className="mb-4 d-flex align-items-center justify-content-center">
              <Button as={Link} to="/busqueda" variant="primary" size="lg" className="px-5 py-3 shadow-sm rounded-pill" style={{ backgroundColor: '#0a2f6b', border: 'none' }}>
                Ver todas las búsquedas <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </Col>
          </Row>
        </div>

        <div className="mb-5">
          <h2 className="fw-bold mb-4" style={{ color: '#0a2f6b' }}>Preguntas Frecuentes</h2>
          <Accordion className="shadow-sm">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="fw-bold">¿Qué hago si un familiar desaparece?</Accordion.Header>
              <Accordion.Body>
                Hacé la denuncia de inmediato en la comisaría más cercana, fiscalía o juzgado. <strong>No es necesario esperar 24 ni 48 horas.</strong> Llevá la foto más reciente que tengas.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="fw-bold">¿Cómo puedo aportar información de forma anónima?</Accordion.Header>
              <Accordion.Body>
                Podés comunicarte a la línea 134 del Ministerio de Seguridad para realizar denuncias completamente anónimas, o usar el formulario de contacto en la página de cada búsqueda.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className="fw-bold">¿Cualquiera puede registrar una búsqueda en la web?</Accordion.Header>
              <Accordion.Body>
                Sí, a través de la sección "Registrar Desaparecido". Sin embargo, todos los datos ingresados son validados por un moderador antes de hacerse públicos para evitar información falsa.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </>
  );
};

export default Inicio;