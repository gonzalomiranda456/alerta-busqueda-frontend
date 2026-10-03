import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import TarjetaCaso from '../components/TarjetaCaso';

const Busqueda = () => {
  const casosBusqueda = [
    {
      id: 1,
      nombre: "Juan Pérez",
      ubicacion: "San Miguel de Tucumán",
      fecha: "25/09/2026",
      edad: 34,
      imagen: "https://via.placeholder.com/400x300?text=Foto+Juan"
    },
    {
      id: 2,
      nombre: "María Gómez",
      ubicacion: "Córdoba Capital",
      fecha: "28/09/2026",
      edad: 22,
      imagen: "https://via.placeholder.com/400x300?text=Foto+Maria"
    },
    {
      id: 3,
      nombre: "Carlos López",
      ubicacion: "Rosario, Santa Fe",
      fecha: "01/10/2026",
      edad: 45,
      imagen: "https://via.placeholder.com/400x300?text=Foto+Carlos"
    }
  ];

  return (
    <>
      <img src="/img/Logo_Fondo_Blanco.png" alt="Fondo" className="fondo-marca-agua" />

      <Container className="py-5" style={{ minHeight: '80vh', marginTop: '60px' }}>
        <Helmet>
          <title>Búsquedas Activas | Alerta Búsqueda</title>
          <meta name="description" content="Revisá el listado de personas desaparecidas y búsquedas activas. Aportá datos para ayudar a encontrarlos." />
        </Helmet>

        <h2 className="text-center fw-bold mb-5" style={{ color: '#0a2f6b' }}>Búsquedas Activas</h2>

        <Row className="justify-content-center mb-5">
          <Col md={8} lg={7}>
            <div className="d-flex bg-white rounded-pill shadow-sm p-2" style={{ border: '1px solid #e6f2ff' }}>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre, ubicación o características..."
                className="border-0 shadow-none bg-transparent ms-3"
                style={{ fontSize: '1.05rem' }}
              />
              <Button 
                className="rounded-pill px-4 fw-bold d-flex align-items-center" 
                style={{ backgroundColor: '#0a2f6b', border: 'none' }}
              >
                <i className="bi bi-search me-2"></i> Buscar
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="g-4">
          {casosBusqueda.map((caso) => (
            <Col xs={12} sm={6} md={4} xl={3} key={caso.id}>
              <TarjetaCaso
                nombre={caso.nombre}
                ubicacion={caso.ubicacion}
                fecha={caso.fecha}
                edad={caso.edad}
                imagen={caso.imagen}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Busqueda;