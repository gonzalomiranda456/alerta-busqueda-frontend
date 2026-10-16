import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_PROVINCIAS = import.meta.env.VITE_API_PROVINCIAS;
const API_DEPARTAMENTOS = import.meta.env.VITE_API_DEPARTAMENTOS;

const Recibir = () => {
  const sesionGuardada = localStorage.getItem('sesionActiva');
  const usuario = sesionGuardada ? JSON.parse(sesionGuardada) : null;
  const estaLogueado = usuario !== null;
  const [listaProvincias, setListaProvincias] = useState([]);
  const [cargandoProvincias, setCargandoProvincias] = useState(true);
  const [listaDepartamentos, setListaDepartamentos] = useState([]);
  const [cargandoDepartamentos, setCargandoDepartamentos] = useState(false);
  const [nombre, setNombre] = useState(usuario ? usuario.nombre : '');
  const [email, setEmail] = useState(usuario ? usuario.email : '');
  const [telefono, setTelefono] = useState('');
  const [provincia, setProvincia] = useState(usuario?.provincia ? usuario.provincia : '');
  const [departamento, setDepartamento] = useState('');

  useEffect(() => {
    const obtenerProvincias = async () => {
      try {
        const response = await axios.get(API_PROVINCIAS);
        const provinciasOrdenadas = response.data.provincias.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        setListaProvincias(provinciasOrdenadas);
        setCargandoProvincias(false);
      } catch (error) {
        console.error("Error API Provincias:", error);
        setCargandoProvincias(false);
      }
    };
    obtenerProvincias();
  }, []);

  useEffect(() => {
    if (provincia === '') {
      setListaDepartamentos([]);
      setDepartamento('');
      return;
    }

    const obtenerDepartamentos = async () => {
      setCargandoDepartamentos(true);
      try {
        const response = await axios.get(`${API_DEPARTAMENTOS}?provincia=${provincia}&max=500`);
        const departamentosOrdenados = response.data.departamentos.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        setListaDepartamentos(departamentosOrdenados);
        setCargandoDepartamentos(false);
      } catch (error) {
        console.error("Error API Departamentos:", error);
        setCargandoDepartamentos(false);
      }
    };
    obtenerDepartamentos();
  }, [provincia]);
  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!estaLogueado) return;

    Swal.fire({
      icon: 'success',
      title: '¡Suscripción exitosa!',
      text: `A partir de ahora recibirás alertas de ${departamento}, ${provincia} en ${email}.`,
      confirmButtonColor: '#0a2f6b'
    });
  };
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
                {!estaLogueado && (
                  <Alert variant="warning" className="d-flex align-items-center mb-4 border border-2 border-dark shadow-sm" style={{ borderRadius: '10px' }}>
                    <i className="bi bi-exclamation-triangle-fill fs-1 me-3 text-warning-emphasis"></i>
                    <div>
                      <strong className="d-block fs-5 text-dark">Acceso Restringido</strong>
                      <span className="text-dark">Necesitás iniciar sesión para suscribirte a las alertas de tu zona.</span>
                    </div>
                  </Alert>
                )}

                <Form onSubmit={manejarSubmit}>
                  <Form.Group className="mb-3" controlId="nombreSuscriptor">
                    <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Nombre completo</Form.Label>
                    <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="border border-2 border-dark" style={{ borderRadius: '8px' }} disabled={!estaLogueado} />
                  </Form.Group>

                  <Row className="mb-3">
                    <Form.Group as={Col} sm={6} className="mb-3 mb-sm-0" controlId="emailSuscriptor">
                      <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Correo electrónico</Form.Label>
                      <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border border-2 border-dark" style={{ borderRadius: '8px' }} disabled={!estaLogueado} />
                    </Form.Group>

                    <Form.Group as={Col} sm={6} controlId="telefonoSuscriptor">
                      <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Número de celular</Form.Label>
                      <Form.Control type="tel" placeholder="Código de área + Número" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="border border-2 border-dark" style={{ borderRadius: '8px' }} disabled={!estaLogueado} />
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
                        disabled={cargandoProvincias || !estaLogueado}
                      >
                        <option value="">
                          {cargandoProvincias ? 'Cargando...' : 'Seleccioná tu provincia...'}
                        </option>
                        {listaProvincias.map((prov) => (
                          <option key={prov.id} value={prov.nombre}>{prov.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} sm={6} controlId="departamentoSuscriptor">
                      <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Departamento</Form.Label>
                      <Form.Select
                        required
                        className="border border-2 border-dark"
                        style={{ borderRadius: '8px' }}
                        value={departamento}
                        onChange={(e) => setDepartamento(e.target.value)}
                        disabled={cargandoDepartamentos || listaDepartamentos.length === 0 || !estaLogueado}
                      >
                        <option value="">
                          {cargandoDepartamentos ? 'Buscando...' : (provincia === '' ? 'Elegí una provincia' : 'Seleccioná...')}
                        </option>
                        {listaDepartamentos.map((dep) => (
                          <option key={dep.id} value={dep.nombre}>{dep.nombre}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-4" controlId="terminos">
                    <Form.Check
                      type="checkbox"
                      label="Acepto recibir notificaciones y comparto mis datos según la política de privacidad."
                      required
                      disabled={!estaLogueado}
                    />
                  </Form.Group>

                  <div className="d-grid mt-5">
                    <Button
                      variant={estaLogueado ? "primary" : "secondary"}
                      size="lg"
                      type="submit"
                      disabled={!estaLogueado}
                      className="rounded-pill fw-bold shadow-sm d-flex justify-content-center align-items-center border border-2 border-dark"
                      style={{ backgroundColor: estaLogueado ? '#0a2f6b' : '#6c757d', transition: 'transform 0.2s ease' }}
                    >
                      <i className={`bi ${estaLogueado ? 'bi-bell-fill' : 'bi-lock-fill'} me-2 fs-5`}></i>
                      {estaLogueado ? 'Activar Alertas' : 'Iniciá sesión para activar'}
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