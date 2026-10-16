import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Badge } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_CASOS = import.meta.env.VITE_API_CASOS;
const API_PROVINCIAS = import.meta.env.VITE_API_PROVINCIAS;
const API_DEPARTAMENTOS = import.meta.env.VITE_API_DEPARTAMENTOS;

const RegistroDesaparecido = () => {
  const sesionGuardada = localStorage.getItem('sesionActiva');
  const usuario = sesionGuardada ? JSON.parse(sesionGuardada) : null;
  const esAdmin = usuario?.rol === 'admin';
  const estaLogueado = usuario !== null; 
  const [formulario, setFormulario] = useState({
    nombre: '',
    edad: '',
    fecha: '',
    provincia: '',  
    departamento: '', 
    descripcion: ''
  });
  
  const [cargandoEnvio, setCargandoEnvio] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [cargandoProvincias, setCargandoProvincias] = useState(true);
  const [cargandoDepartamentos, setCargandoDepartamentos] = useState(false);
  useEffect(() => {
    if (!esAdmin && estaLogueado) {
      const cargarProvincias = async () => {
        try {
          const respuesta = await axios.get(API_PROVINCIAS);
          const provinciasOrdenadas = respuesta.data.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));
          setProvincias(provinciasOrdenadas);
        } catch (error) {
          console.error("Error cargando provincias:", error);
        }
        setCargandoProvincias(false);
      };
      cargarProvincias();
    }
  }, [esAdmin, estaLogueado]);

  useEffect(() => {
    if (formulario.provincia) {
      const cargarDepartamentos = async () => {
        setCargandoDepartamentos(true);
        try {
          const respuesta = await axios.get(`${API_DEPARTAMENTOS}?provincia=${formulario.provincia}&max=1000`);
          const deptosOrdenados = respuesta.data.departamentos.sort((a, b) => a.nombre.localeCompare(b.nombre));
          setDepartamentos(deptosOrdenados);
        } catch (error) {
          console.error("Error cargando departamentos:", error);
        }
        setCargandoDepartamentos(false);
      };
      cargarDepartamentos();
    } else {
      setDepartamentos([]);
    }
  }, [formulario.provincia]);

  useEffect(() => {
    if (!esAdmin && estaLogueado) {
      const borrador = localStorage.getItem('borradorRegistro');
      if (borrador) {
        setFormulario(JSON.parse(borrador));
      }
    }
  }, [esAdmin, estaLogueado]);

  useEffect(() => {
    if (!esAdmin && estaLogueado) {
      const temporizador = setTimeout(() => {
        localStorage.setItem('borradorRegistro', JSON.stringify(formulario));
      }, 1000);
      return () => clearTimeout(temporizador);
    }
  }, [formulario, esAdmin, estaLogueado]);

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.id]: e.target.value
    });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (!estaLogueado) return; 

    setCargandoEnvio(true);

    try {
      const nuevoCaso = {
        ...formulario,
        ubicacion: `${formulario.departamento}, ${formulario.provincia}`,
        estado: 'pendiente',
        foto: '' 
      };

      await axios.post(API_CASOS, nuevoCaso);

      Swal.fire({
        icon: 'success',
        title: '¡Solicitud enviada!',
        text: 'El caso fue enviado a moderación. Un administrador lo revisará pronto.',
        confirmButtonColor: '#0a2f6b'
      });
      setFormulario({ nombre: '', edad: '', fecha: '', provincia: '', departamento: '', descripcion: '' });
      localStorage.removeItem('borradorRegistro');
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo enviar el caso.' });
    }
    setCargandoEnvio(false);
  };
  const [casosPendientes, setCasosPendientes] = useState([]);
  const [cargandoCasos, setCargandoCasos] = useState(false);

  useEffect(() => {
    if (esAdmin) {
      const cargarPendientes = async () => {
        setCargandoCasos(true);
        try {
          const response = await axios.get(`${API_CASOS}?estado=pendiente`);
          setCasosPendientes(response.data);
        } catch (error) {
          console.error("Error al traer casos:", error);
        }
        setCargandoCasos(false);
      };
      cargarPendientes();
    }
  }, [esAdmin]);

  const aprobarCaso = async (id, nombrePersona) => {
    try {
      await axios.put(`${API_CASOS}/${id}`, { estado: 'publicado' });
      Swal.fire({ icon: 'success', title: '¡Aprobado!', text: `${nombrePersona} ahora es visible en la página principal.`, timer: 2000, showConfirmButton: false });
      setCasosPendientes(casosPendientes.filter(caso => caso.id !== id));
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo aprobar el caso.' });
    }
  };
  return (
    <>
      <img src="/img/Logo_Fondo_Blanco.png" alt="Fondo" className="fondo-marca-agua" />

      <Container className="py-5" style={{ minHeight: '80vh', position: 'relative', zIndex: 1, marginTop: '60px' }}>
        <Helmet>
          <title>{esAdmin ? 'Moderación | Alerta Búsqueda' : 'Registrar Caso | Alerta Búsqueda'}</title>
        </Helmet>

        {esAdmin ? (
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <h2 className="fw-bold mb-4" style={{ color: '#0a2f6b' }}>
                <i className="bi bi-shield-lock-fill me-2"></i> Panel de Moderación
              </h2>
              <p className="text-muted mb-4">Revisá las solicitudes enviadas por los usuarios. Al aprobarlas, se publicarán automáticamente en la sección de Búsquedas Activas.</p>

              {cargandoCasos ? (
                <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
              ) : casosPendientes.length === 0 ? (
                <Alert variant="success" className="text-center border-2 border-dark" style={{ borderRadius: '10px' }}>
                  <i className="bi bi-check-circle-fill fs-4 d-block mb-2"></i>
                  <strong>¡Todo al día!</strong> No hay solicitudes pendientes de revisión.
                </Alert>
              ) : (
                casosPendientes.map((caso) => (
                  <Card key={caso.id} className="mb-3 shadow-sm border border-2 border-dark" style={{ borderRadius: '12px' }}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h4 className="fw-bold text-dark m-0">{caso.nombre} <Badge bg="warning" text="dark" className="ms-2 fs-6">Pendiente</Badge></h4>
                        <Button variant="success" className="fw-bold border border-2 border-dark" onClick={() => aprobarCaso(caso.id, caso.nombre)}>
                          <i className="bi bi-check2-circle me-1"></i> Aprobar
                        </Button>
                      </div>
                      <hr className="my-2" />
                      <Row>
                        <Col sm={6}><strong>Edad:</strong> {caso.edad} años</Col>
                        <Col sm={6}><strong>Fecha desap.:</strong> {caso.fecha}</Col>
                        <Col sm={12} className="mt-2"><strong>Ubicación:</strong> {caso.ubicacion}</Col>
                        <Col sm={12} className="mt-2 text-muted"><strong>Descripción:</strong> {caso.descripcion}</Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm border border-2 border-dark" style={{ borderRadius: '15px', backgroundColor: '#e6f2ff' }}>
                <Card.Body className="p-4 p-md-5">
                  <h2 className="text-center fw-bold mb-4" style={{ color: '#0a2f6b' }}>
                    Registrar nueva búsqueda
                  </h2>

                  {!estaLogueado ? (
                    <Alert variant="warning" className="d-flex align-items-center mb-4 border border-2 border-dark shadow-sm" style={{ borderRadius: '10px' }}>
                      <i className="bi bi-exclamation-triangle-fill fs-1 me-3 text-warning-emphasis"></i>
                      <div>
                        <strong className="d-block fs-5 text-dark">Acceso Restringido</strong>
                        <span className="text-dark">No podés subir un caso sin estar registrado. Iniciá sesión o creá una cuenta para continuar.</span>
                      </div>
                    </Alert>
                  ) : (
                    <Alert variant="info" className="d-flex align-items-center mb-4 border border-2 border-dark" style={{ borderRadius: '10px' }}>
                      <i className="bi bi-info-circle-fill fs-4 me-3 text-info-emphasis"></i>
                      <div>
                        <strong>Aviso importante:</strong> Todos los casos registrados serán revisados antes de publicarse.
                      </div>
                    </Alert>
                  )}

                  <Form onSubmit={manejarSubmit}>
                    <Form.Group className="mb-3" controlId="nombre">
                      <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Nombre y Apellido</Form.Label>
                      <Form.Control type="text" placeholder="Ej: Juan Pérez" required className="border border-2 border-dark" style={{ borderRadius: '8px' }} value={formulario.nombre} onChange={manejarCambio} disabled={!estaLogueado || cargandoEnvio} />
                    </Form.Group>

                    <Row className="mb-3">
                      <Form.Group as={Col} sm={6} controlId="edad" className="mb-3 mb-sm-0">
                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Edad aproximada</Form.Label>
                        <Form.Control type="number" placeholder="Ej: 35" required className="border border-2 border-dark" style={{ borderRadius: '8px' }} value={formulario.edad} onChange={manejarCambio} disabled={!estaLogueado || cargandoEnvio} />
                      </Form.Group>

                      <Form.Group as={Col} sm={6} controlId="fecha">
                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Fecha de desaparición</Form.Label>
                        <Form.Control type="date" required className="border border-2 border-dark" style={{ borderRadius: '8px' }} value={formulario.fecha} onChange={manejarCambio} disabled={!estaLogueado || cargandoEnvio} />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} sm={6} controlId="provincia">
                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Provincia</Form.Label>
                        <Form.Select 
                          required 
                          className="border border-2 border-dark" 
                          style={{ borderRadius: '8px' }} 
                          value={formulario.provincia} 
                          onChange={manejarCambio} 
                          disabled={!estaLogueado || cargandoEnvio || cargandoProvincias}
                        >
                          <option value="">{cargandoProvincias ? 'Cargando...' : 'Seleccioná...'}</option>
                          {provincias.map(prov => (
                            <option key={prov.id} value={prov.nombre}>{prov.nombre}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group as={Col} sm={6} controlId="departamento">
                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Departamento</Form.Label>
                        <Form.Select 
                          required 
                          className="border border-2 border-dark" 
                          style={{ borderRadius: '8px' }} 
                          value={formulario.departamento} 
                          onChange={manejarCambio} 
                          disabled={!estaLogueado || cargandoEnvio || cargandoDepartamentos || !formulario.provincia}
                        >
                          <option value="">{cargandoDepartamentos ? 'Cargando...' : 'Seleccioná...'}</option>
                          {departamentos.map(depto => (
                            <option key={depto.id} value={depto.nombre}>{depto.nombre}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="descripcion">
                      <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Descripción física y vestimenta</Form.Label>
                      <Form.Control as="textarea" rows={4} placeholder="Detalles sobre altura, contextura..." required className="border border-2 border-dark" style={{ borderRadius: '8px' }} value={formulario.descripcion} onChange={manejarCambio} disabled={!estaLogueado || cargandoEnvio} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="foto">
                      <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Subir fotografía</Form.Label>
                      <Form.Control type="file" accept="image/*" className="border border-2 border-dark" style={{ borderRadius: '8px' }} disabled={!estaLogueado || cargandoEnvio} />
                    </Form.Group>

                    <div className="d-grid mt-5">
                      <Button variant={estaLogueado ? "primary" : "secondary"} size="lg" type="submit" disabled={!estaLogueado || cargandoEnvio} className="rounded-pill fw-bold shadow-sm d-flex justify-content-center align-items-center border border-2 border-dark" style={{ backgroundColor: estaLogueado ? '#0a2f6b' : '#6c757d' }}>
                        <i className={`bi ${estaLogueado ? 'bi-cloud-arrow-up-fill' : 'bi-lock-fill'} me-2 fs-5`}></i> 
                        {cargandoEnvio ? 'Enviando...' : (estaLogueado ? 'Publicar Búsqueda' : 'Iniciá sesión para publicar')}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default RegistroDesaparecido;
