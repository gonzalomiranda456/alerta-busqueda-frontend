import { Modal, Button, Form, Nav, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

const ModalRegistro = ({ show, handleClose }) => {
  const [esLogin, setEsLogin] = useState(true);
  const [mostrarPass, setMostrarPass] = useState(false);

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton style={{ backgroundColor: '#e6f2ff', borderBottom: 'none' }}>
        <Modal.Title className="fw-bold w-100 text-center" style={{ color: '#0a2f6b' }}>
          {esLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#f4f9ff' }}>
        <div className="d-flex mx-auto mb-4" style={{
          borderRadius: '50px',
          overflow: 'hidden',
          width: 'fit-content',
          border: '2px solid #0a2f6b'
        }}>
          <Button
            variant="light"
            onClick={() => setEsLogin(true)}
            style={{
              borderRadius: 0,
              backgroundColor: esLogin ? '#0a2f6b' : 'transparent',
              color: esLogin ? 'white' : '#0a2f6b',
              border: 'none',
              borderRight: '2px solid #0a2f6b',
              padding: '0.5rem 1.5rem',
              fontWeight: 'bold',
              width: '150px'
            }}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="light"
            onClick={() => setEsLogin(false)}
            style={{
              borderRadius: 0,
              backgroundColor: !esLogin ? '#0a2f6b' : 'transparent',
              color: !esLogin ? 'white' : '#0a2f6b',
              border: 'none',
              padding: '0.5rem 1.5rem',
              fontWeight: 'bold',
              width: '150px'
            }}
          >
            Registrarse
          </Button>
        </div>

        <Form>
          {!esLogin && (
            <>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Nombre completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresá tu nombre y apellido"
                  onInput={(e) => e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDni">
                <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>DNI</Form.Label>
                <Form.Control
                  type="text"
                  inputMode="numeric"
                  maxLength={8}
                  placeholder="Sin puntos ni espacios"
                  onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="ejemplo@correo.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={mostrarPass ? "text" : "password"}
                placeholder={esLogin ? "Tu contraseña" : "Mínimo 8 caracteres"}
              />
              <Button
                variant="outline-secondary"
                onMouseDown={() => setMostrarPass(true)}
                onMouseUp={() => setMostrarPass(false)}
                onMouseLeave={() => setMostrarPass(false)}
                onTouchStart={() => setMostrarPass(true)}
                onTouchEnd={() => setMostrarPass(false)}
              >
                <i className={`bi bi-eye${mostrarPass ? '-slash' : ''}`}></i>
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#f4f9ff', borderTop: 'none' }} className="d-flex justify-content-between">
        <Button variant="outline-danger" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" style={{ backgroundColor: '#0a2f6b', border: 'none', padding: '0.5rem 2rem' }}>
          {esLogin ? 'Ingresar' : 'Registrarme'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistro;