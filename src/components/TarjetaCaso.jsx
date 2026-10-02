import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TarjetaCaso = ({ nombre, ubicacion, fecha, edad, imagen }) => {
    return (
        <Col md={6} lg={4} className="mb-4">
            <Card className="shadow-sm border-0 h-100" style={{ backgroundColor: '#e6f2ff' }}>
                <Card.Img variant="top" src={imagen} alt={`Foto de ${nombre}`} style={{ height: '250px', objectFit: 'cover' }} />
                <Card.Body>
                    <Card.Title className="fw-bold">{nombre}</Card.Title>
                    <Card.Text>
                        <strong>Visto por última vez:</strong> {ubicacion}<br />
                        <strong>Fecha:</strong> {fecha}<br />
                        <strong>Edad:</strong> {edad} años
                    </Card.Text>
                    <Button as={Link} to="/busqueda" variant="outline-primary" className="w-100 fw-bold">
                        Ver Detalles
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default TarjetaCaso;