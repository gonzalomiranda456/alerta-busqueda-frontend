import { useState } from 'react';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MenuNavegacion = () => {
    const [mostrarMenu, setMostrarMenu] = useState(false);

    const cerrarMenu = () => setMostrarMenu(false);
    const abrirMenu = () => setMostrarMenu(true);

return (
        <>
            <Navbar bg="white" fixed="top" className="shadow-sm px-3 py-1">
                <Container fluid>
                    <button 
                        className="btn btn-link border-0 text-primary text-decoration-none p-0" 
                        type="button" 
                        onClick={abrirMenu}
                    >
                        <span className="fs-3">☰ <span className="fs-6 fw-bold ms-1">Menú</span></span>
                    </button>
                    
                    {/* Logo */}
                    <Navbar.Brand as={Link} to="/" className="mx-auto py-0">
                        <img 
                            src="/img/logo-encabezado2 (2).png" 
                            alt="Logo de Alerta Búsqueda" 
                            style={{ height: '55px', width: 'auto', objectFit: 'contain' }} 
                        />
                    </Navbar.Brand>
                </Container>
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
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default MenuNavegacion;