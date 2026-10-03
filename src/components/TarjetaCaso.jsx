import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TarjetaCaso = ({ nombre, ubicacion, fecha, edad, imagen }) => {
    return (
        <Card className="shadow-sm border-0 h-100" style={{ backgroundColor: '#e6f2ff' }}>
            <Card.Img variant="top" src={imagen} alt={`Foto de ${nombre}`} style={{ height: '250px', objectFit: 'cover' }} />
            {/* Convertimos el cuerpo en una columna flex */}
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{nombre}</Card.Title>
                <Card.Text>
                    <strong>Visto por última vez:</strong> {ubicacion}<br />
                    <strong>Fecha:</strong> {fecha}<br />
                    <strong>Edad:</strong> {edad} años
                </Card.Text>
                
                {/* mt-auto (margin-top: auto) empuja el botón siempre hacia el fondo */}
                <Button as={Link} to="/busqueda" variant="outline-primary" className="w-100 fw-bold mt-auto">
                    Ver Detalles
                </Button>
            </Card.Body>
        </Card>
    );
};

export default TarjetaCaso;