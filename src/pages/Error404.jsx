import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Error404 = () => {
    return (
        <Container className="text-center py-5 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <Helmet>
                <title>Página no encontrada | Alerta Búsqueda</title>
            </Helmet>
            
            <h1 className="display-1 fw-bold" style={{ color: '#00bfff' }}>404</h1>
            <h2 className="mb-4 fw-bold" style={{ color: '#0a2f6b' }}>Página no encontrada</h2>
            <p className="text-muted mb-4 fs-5" style={{ maxWidth: '500px' }}>
                Lo sentimos, la dirección que ingresaste no existe, fue movida o está temporalmente fuera de servicio.
            </p>
            <Button as={Link} to="/" variant="primary" className="px-5 py-3 rounded-pill fw-bold shadow-sm" style={{ backgroundColor: '#0a2f6b', border: 'none' }}>
                Volver al Inicio
            </Button>
        </Container>
    );
};

export default Error404;