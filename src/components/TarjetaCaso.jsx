import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TarjetaCaso = ({ nombre, ubicacion, fecha, edad, imagen }) => {
    return (
        <Card className="shadow-sm border border-2 border-dark h-100" style={{ backgroundColor: '#e6f2ff', borderRadius: '12px', overflow: 'hidden' }}>
            <Card.Img
                variant="top"
                src={imagen || "/img/silueta.jpg"}
                alt={`Foto de ${nombre}`}
                style={{ height: '250px', objectFit: 'cover' }}
                onError={(e) => { e.target.src = '/img/silueta.jpg' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{nombre}</Card.Title>
                <Card.Text>
                    <strong>Visto por última vez:</strong> {ubicacion}<br />
                    <strong>Fecha:</strong> {fecha}<br />
                    <strong>Edad:</strong> {edad} años
                </Card.Text>

                <Button as={Link} to="/busqueda" variant="primary" className="w-100 fw-bold mt-auto border border-2 border-dark">
                    Ver Detalles
                </Button>
            </Card.Body>
        </Card>
    );
};

export default TarjetaCaso;