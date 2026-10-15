import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Offcanvas, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalRegistro from './ModalRegistro';

const MenuNavegacion = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const cerrarMenu = () => setMostrarMenu(false);
  const abrirMenu = () => setMostrarMenu(true);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  useEffect(() => {
    const sesion = localStorage.getItem('sesionActiva');
    if (sesion) {
      setUsuarioLogueado(JSON.parse(sesion));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('sesionActiva');
    setUsuarioLogueado(null);
    window.location.reload();
  };

  return (
    <>
      <Navbar bg="white" expand="lg" fixed="top" className="shadow-sm py-3 border-bottom border-3 border-dark">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center text-decoration-none fs-4 fw-bolder">
            <img src="/img/Logo_Blanco.png" alt="Logo" width="45" height="45" className="me-2" />
            <span style={{ color: '#00bfff' }}>Alerta</span>
            <span className="text-dark ms-1">Búsqueda</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="menu-principal" className="border-0 shadow-none" onClick={abrirMenu} />

          <Navbar.Collapse id="menu-principal">
            <Nav className="ms-auto text-center mt-3 mt-lg-0 align-items-center">
              <Nav.Link as={Link} to="/" className="nav-link-custom fw-bold px-3 text-dark">Inicio</Nav.Link>

              <NavDropdown title="Pages" id="pages-dropdown" className="nav-link-custom fw-bold px-3 text-dark">
                <NavDropdown.Item as={Link} to="/busqueda">Búsquedas Activas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cargar-caso">Cargar Caso</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/recibir">Recibir Alertas</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/#preguntas" className="nav-link-custom fw-bold px-3 text-dark">Preguntas generales</Nav.Link>
              {usuarioLogueado ? (
                <NavDropdown
                  title={<span><i className="bi bi-person-circle me-1 text-primary fs-5"></i> Mi Cuenta</span>}
                  id="perfil-dropdown"
                  align="end"
                  className="nav-link-custom fw-bold px-3 text-dark"
                >
                  <NavDropdown.ItemText className="text-center pb-0">
                    <span className="d-block fw-bold text-dark">{usuarioLogueado.nombre}</span>
                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>{usuarioLogueado.email}</span>
                  </NavDropdown.ItemText>

                  {usuarioLogueado.rol === 'admin' && (
                    <NavDropdown.ItemText className="text-center mt-1">
                      <span className="badge bg-danger rounded-pill">Administrador</span>
                    </NavDropdown.ItemText>
                  )}

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={cerrarSesion} className="text-danger fw-bold text-center">
                    <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link onClick={handleShow} style={{ cursor: 'pointer' }} className="nav-link-custom fw-bold px-3 text-dark">
                  Ingresar
                </Nav.Link>
              )}
            </Nav>

            <Link to="/busqueda" className="d-flex justify-content-center align-items-center ms-lg-4 mt-3 mt-lg-0 text-decoration-none">
              <i className="bi bi-search fs-4 text-dark search-icon-custom" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}></i>
            </Link>
          </Navbar.Collapse>
        </Container>
        <ModalRegistro show={showModal} handleClose={handleClose} />
      </Navbar>

      <Offcanvas show={mostrarMenu} onHide={cerrarMenu} placement="start">
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="text-primary fw-bold">Alerta Búsqueda</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column fs-5 gap-3 mt-2">
            <Nav.Link as={Link} to="/" onClick={cerrarMenu} className="text-dark">
              <i className="bi bi-house-door text-primary me-2"></i> Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/busqueda" onClick={cerrarMenu} className="text-dark">
              <i className="bi bi-search text-primary me-2"></i> Búsqueda
            </Nav.Link>
            <Nav.Link as={Link} to="/registro" onClick={cerrarMenu} className="text-dark">
              <i className="bi bi-file-earmark-text text-primary me-2"></i> Registrar búsqueda
            </Nav.Link>
            <Nav.Link as={Link} to="/recibir" onClick={cerrarMenu} className="text-dark">
              <i className="bi bi-bell text-primary me-2"></i> Recibir Alertas
            </Nav.Link>

            <hr className="my-1" />

            {usuarioLogueado ? (
              <>
                <div className="px-3 py-2 bg-light rounded">
                  <span className="d-block fw-bold text-dark">{usuarioLogueado.nombre}</span>
                  <span className="text-muted fs-6">{usuarioLogueado.email}</span>
                  {usuarioLogueado.rol === 'admin' && (
                    <span className="badge bg-danger rounded-pill ms-2">Admin</span>
                  )}
                </div>
                <Nav.Link onClick={() => { cerrarMenu(); cerrarSesion(); }} className="text-danger fw-bold">
                  <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={() => { cerrarMenu(); handleShow(); }} className="text-dark fw-bold">
                <i className="bi bi-person-fill text-primary me-2"></i> Ingresar
              </Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MenuNavegacion;