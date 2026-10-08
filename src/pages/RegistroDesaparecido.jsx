import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

const RegistroDesaparecido = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    edad: '',
    fecha: '',
    ubicacion: '',
    descripcion: ''
  });

  useEffect(() => {
    const borrador = localStorage.getItem('borradorRegistro');
    if (borrador) {
      setFormulario(JSON.parse(borrador));
    }
  }, []);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      localStorage.setItem('borradorRegistro', JSON.stringify(formulario));
    }, 1000);

    return () => clearTimeout(temporizador);
  }, [formulario]);

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.id]: e.target.value
    });
  };

  return (
    <>
      <img src="/img/Logo_Fondo_Blanco.png" alt="Fondo" className="fondo-marca-agua" />

      <Container className="py-5" style={{ minHeight: '80vh', position: 'relative', zIndex: 1, marginTop: '60px' }}>
        <Helmet>
          <title>Registrar Caso | Alerta Búsqueda</title>
        </Helmet>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm border border-2 border-dark" style={{ borderRadius: '15px', backgroundColor: '#e6f2ff' }}>
              <Card.Body className="p-4 p-md-5">
                <h2 className="text-center fw-bold mb-4" style={{ color: '#0a2f6b' }}>
                  Registrar nueva búsqueda
                </h2>

                <Alert variant="warning" className="d-flex align-items-center mb-4 border border-2 border-dark" style={{ borderRadius: '10px' }}>
                  <i className="bi bi-exclamation-triangle-fill fs-4 me-3 text-warning-emphasis"></i>
                  <div>
                    <strong>Aviso importante:</strong> Todos los casos registrados serán revisados. Tus borradores se guardan automáticamente.
                  </div>
                </Alert>

                <Form>
                  <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Nombre y Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      required
                      className="border border-2 border-dark"
                      style={{ borderRadius: '8px' }}
                      value={formulario.nombre}
                      onChange={manejarCambio}
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Form.Group as={Col} sm={6} controlId="edad" className="mb-3 mb-sm-0">
                      <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Edad aproximada</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ej: 35"
                        required
                        className="border border-2 border-dark"
                        style={{ borderRadius: '8px' }}
                        value={formulario.edad}
                        onChange={manejarCambio}
                      />
                    </Form.Group>

                    <Form.Group as={Col} sm={6} controlId="fecha">
                      <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Fecha de desaparición</Form.Label>
                      <Form.Control
                        type="date"
                        required
                        className="border border-2 border-dark"
                        style={{ borderRadius: '8px' }}
                        value={formulario.fecha}
                        onChange={manejarCambio}
                      />
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="ubicacion">
                    <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Última ubicación conocida</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Barrio, Ciudad, Provincia"
                      required
                      className="border border-2 border-dark"
                      style={{ borderRadius: '8px' }}
                      value={formulario.ubicacion}
                      onChange={manejarCambio}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="descripcion">
                    <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Descripción física y vestimenta</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Detalles sobre altura, contextura..."
                      required
                      className="border border-2 border-dark"
                      style={{ borderRadius: '8px' }}
                      value={formulario.descripcion}
                      onChange={manejarCambio}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="foto">
                    <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Subir fotografía</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      className="border border-2 border-dark"
                      style={{ borderRadius: '8px' }}
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