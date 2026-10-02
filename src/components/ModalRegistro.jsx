import { Modal, Button, Form } from 'react-bootstrap';

const ModalRegistro = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton style={{ backgroundColor: '#e6f2ff', borderBottom: '2px solid #0a2f6b' }}>
                <Modal.Title className="fw-bold" style={{ color: '#0a2f6b' }}>
                    Crear Cuenta de Usuario
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body style={{ backgroundColor: '#f4f9ff' }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formNombre">
                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Nombre completo</Form.Label>
                        <Form.Control type="text" placeholder="Ingresá tu nombre" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Correo electrónico</Form.Label>
                        <Form.Control type="email" placeholder="ejemplo@correo.com" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Mínimo 8 caracteres" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            
            <Modal.Footer style={{ backgroundColor: '#f4f9ff', borderTop: 'none' }}>
                <Button variant="outline-danger" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" style={{ backgroundColor: '#0a2f6b', border: 'none' }}>
                    Registrarme
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistro;