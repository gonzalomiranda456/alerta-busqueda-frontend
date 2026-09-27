import { useState } from 'react';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';

const MenuNavegacion = () => {
    // Estado de React para controlar si el menú lateral está abierto o cerrado
    const [mostrarMenu, setMostrarMenu] = useState(false);

    const cerrarMenu = () => setMostrarMenu(false);
    const abrirMenu = () => setMostrarMenu(true);

    return (
        <>
            {/* BARRA DE NAVEGACIÓN SUPERIOR */}
            <Navbar bg="white" fixed="top" className="shadow-sm px-3 py-1">
                <Container fluid>
                    {/* Botón hamburguesa personalizado */}
                    <button 
                        className="navbar-toggler border-0 text-primary" 
                        type="button" 
                        onClick={abrirMenu}
                    >
                        <span className="fs-3">☰ <span className="fs-6 fw-bold ms-1">Menú</span></span>
                    </button>
                    
                    {/* Logo (Nota: en React la ruta de la carpeta public arranca con / ) */}
                    <Navbar.Brand href="/" className="mx-auto py-0">
                        <img 
                            src="/img/logo-encabezado2 (2).png" 
                            alt="Logo de Alerta Búsqueda" 
                            style={{ height: '55px', width: 'auto', objectFit: 'contain' }} 
                        />
                    </Navbar.Brand>
                </Container>
            </Navbar>

            {/* MENÚ LATERAL (Offcanvas) */}
            <Offcanvas show={mostrarMenu} onHide={cerrarMenu} placement="start">
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title className="text-primary fw-bold">Alerta Búsqueda</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column fs-5 gap-3 mt-2">
                        {/* Por ahora usamos href normal, luego los cambiaremos por React Router */}
                        <Nav.Link href="/" className="text-dark">
                            <i className="bi bi-house-door text-primary me-2"></i> Inicio
                        </Nav.Link>
                        <Nav.Link href="/busqueda" className="text-dark">
                            <i className="bi bi-search text-primary me-2"></i> Búsqueda
                        </Nav.Link>
                        <Nav.Link href="/registro" className="text-dark">
                            <i className="bi bi-file-earmark-text text-primary me-2"></i> Registrar búsqueda
                        </Nav.Link>
                        <Nav.Link href="/recibir" className="text-dark">
                            <i className="bi bi-bell text-primary me-2"></i> Recibir Alertas
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default MenuNavegacion;