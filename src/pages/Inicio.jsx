import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Accordion, Button, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import TarjetaCaso from '../components/TarjetaCaso';
import axios from 'axios';

const API_CASOS = import.meta.env.VITE_API_CASOS;

const Inicio = () => {
  const scrollRef = useRef(null);
  
  const [casosRecientes, setCasosRecientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [tituloSeccion, setTituloSeccion] = useState("Últimas Búsquedas Nacionales");

  useEffect(() => {
    const obtenerCasos = async () => {
      setCargando(true);
      try {
        const response = await axios.get(`${API_CASOS}?estado=publicado`);
        let casosPublicados = response.data;
        casosPublicados.sort((a, b) => b.id - a.id);
        const sesionGuardada = localStorage.getItem('sesionActiva');
        const usuario = sesionGuardada ? JSON.parse(sesionGuardada) : null;

        if (usuario && usuario.provincia) {
          const casosZona = casosPublicados.filter(caso => caso.ubicacion.includes(usuario.provincia));
          
          if (casosZona.length > 0) {
            setCasosRecientes(casosZona.slice(0, 8)); // Máximo 8 tarjetas
            setTituloSeccion(`Búsquedas Activas en ${usuario.provincia}`);
          } else {
            setCasosRecientes(casosPublicados.slice(0, 8));
            setTituloSeccion(`Últimas Búsquedas (Sin casos en ${usuario.provincia})`);
          }
        } else {
          setCasosRecientes(casosPublicados.slice(0, 8));
          setTituloSeccion("Últimas Búsquedas Nacionales");
        }

      } catch (error) {
        console.error("Error al traer los casos de inicio:", error);
      }
      setCargando(false);
    };

    obtenerCasos();
  }, []);

  return (
    <>
      <img src="/img/Logo_Fondo_Blanco.png" alt="Fondo" className="fondo-marca-agua" />

      <Container className="py-5" style={{ minHeight: '80vh' }}>
        <Helmet>
          <title>Inicio | Alerta Búsqueda</title>
          <meta name="description" content="Plataforma de difusión y centralización de búsquedas de personas desaparecidas en Argentina." />
        </Helmet>

        <div className="text-center mb-5 mt-4">
          <h1 className="fw-bolder" style={{ color: '#0a2f6b', fontSize: '2.8rem', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
            alrededor de 10.000 Argentinos se pierden anualmente <br className="d-none d-md-block" />
            <span style={{ color: '#00bfff' }}>tu ayuda puede marcar la diferencia.</span>
          </h1>
        </div>

        <div className="mb-5 position-relative">
          <h2 className="fw-bold mb-4" style={{ color: '#0a2f6b' }}>
            {tituloSeccion}
          </h2>

          {!cargando && casosRecientes.length > 0 && (
            <Button
              variant="light"
              className="position-absolute top-50 start-0 translate-middle-y z-3 shadow rounded-circle d-none d-md-flex justify-content-center align-items-center"
              onClick={() => scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' })}
              style={{ width: '45px', height: '45px', marginLeft: '-20px' }}
            >
              <i className="bi bi-chevron-left fs-5"></i>
            </Button>
          )}

          {cargando ? (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: '#0a2f6b', width: '3rem', height: '3rem' }} />
              <h5 className="mt-3 text-secondary">Cargando casos recientes...</h5>
            </div>
          ) : (
            <Row className="flex-nowrap overflow-auto py-2 mx-0" style={{ scrollbarWidth: 'none' }} ref={scrollRef}>
              {casosRecientes.map((caso) => (
                <div key={caso.id} style={{ minWidth: '320px', maxWidth: '350px' }} className="me-3 mb-4">
                  <TarjetaCaso
                    nombre={caso.nombre}
                    ubicacion={caso.ubicacion}
                    fecha={caso.fecha}
                    edad={caso.edad}
                    imagen={caso.foto || "/img/Logo_Blanco.png"} 
                  />
                </div>
              ))}

              <Col md={6} lg={4} className="mb-4">
                <Button as={Link} to="/busqueda" variant="primary" className="w-100 h-100 shadow-sm d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#0a2f6b', border: 'none', minHeight: '350px', borderRadius: 'var(--bs-border-radius)' }}>
                  <span className="fs-4 fw-bold mb-2">Ver todas las búsquedas</span>
                  <i className="bi bi-arrow-right fs-1"></i>
                </Button>
              </Col>
            </Row>
          )}

          {!cargando && casosRecientes.length > 0 && (
            <Button
              variant="light"
              className="position-absolute top-50 end-0 translate-middle-y z-3 shadow rounded-circle d-none d-md-flex justify-content-center align-items-center"
              onClick={() => scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })}
              style={{ width: '45px', height: '45px', marginRight: '-20px' }}
            >
              <i className="bi bi-chevron-right fs-5"></i>
            </Button>
          )}
        </div>
        <div className="mb-5" id="preguntas">
          <h2 className="fw-bold mb-4" style={{ color: '#0a2f6b' }}>Preguntas Frecuentes</h2>
          <Accordion>
            <Accordion.Item eventKey="0" className="border border-2 border-dark mb-3 rounded overflow-hidden shadow-sm">
              <Accordion.Header className="fw-bold">¿Qué hago si un familiar desaparece?</Accordion.Header>
              <Accordion.Body>
                Hacé la denuncia de inmediato en la comisaría más cercana, fiscalía o juzgado. <strong>No es necesario esperar 24 ni 48 horas.</strong> Llevá la foto más reciente que tengas.
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="1" className="border border-2 border-dark mb-3 rounded overflow-hidden shadow-sm">
              <Accordion.Header className="fw-bold">¿Cómo puedo aportar información de forma anónima?</Accordion.Header>
              <Accordion.Body>
                Podés comunicarte a la línea 134 del Ministerio de Seguridad para realizar denuncias completamente anónimas, o usar el formulario de contacto en la página de cada búsqueda.
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="2" className="border border-2 border-dark mb-3 rounded overflow-hidden shadow-sm">
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