import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_USUARIOS = import.meta.env.VITE_API_USUARIOS;
const ModalRegistro = ({ show, handleClose }) => {
  const [esLogin, setEsLogin] = useState(true);
  const [mostrarPass, setMostrarPass] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    if (esLogin) {
      try {
        const response = await axios.get(`${API_USUARIOS}?email=${email}`);
        const usuariosEncontrados = response.data;

        if (usuariosEncontrados.length > 0 && usuariosEncontrados[0].password === password) {
          const usuarioDeBaseDeDatos = usuariosEncontrados[0];
          localStorage.setItem('sesionActiva', JSON.stringify(usuarioDeBaseDeDatos));
          
          Swal.fire({ icon: 'success', title: `¡Bienvenido ${usuarioDeBaseDeDatos.nombre}!`, timer: 1500, showConfirmButton: false });
          setTimeout(() => { handleClose(); window.location.reload(); }, 1500);
        } else {
          Swal.fire({ icon: 'error', title: 'Error', text: 'La contraseña es incorrecta.', confirmButtonColor: '#0a2f6b' });
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          Swal.fire({ icon: 'error', title: 'Oops...', text: 'No existe ninguna cuenta con este correo.', confirmButtonColor: '#0a2f6b' });
        } else {
          Swal.fire({ icon: 'error', title: 'Error de conexión', text: 'No pudimos comunicarnos con el servidor.', confirmButtonColor: '#0a2f6b' });
        }
      }
    } else {
      let emailLibre = false;
      try {
        const chequeoEmail = await axios.get(`${API_USUARIOS}?email=${email}`);
        if (chequeoEmail.data.length > 0) {
          Swal.fire({ icon: 'warning', title: 'Cuidado', text: 'Este correo ya está registrado.', confirmButtonColor: '#0a2f6b' });
          setCargando(false);
          return;
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          emailLibre = true;
        } else {
          Swal.fire({ icon: 'error', title: 'Error de conexión', text: 'No pudimos comunicarnos con el servidor.', confirmButtonColor: '#0a2f6b' });
          setCargando(false);
          return;
        }
      }
      if (emailLibre) {
        try {
          const nuevoUsuario = {
            nombre: nombre,
            dni: dni,
            email: email,
            password: password,
            rol: email.includes('admin') ? 'admin' : 'usuario'
          };

          const response = await axios.post(API_USUARIOS, nuevoUsuario);

          localStorage.setItem('sesionActiva', JSON.stringify(response.data));
          
          Swal.fire({ icon: 'success', title: '¡Cuenta creada!', text: 'Te registraste exitosamente.', timer: 1500, showConfirmButton: false });
          setTimeout(() => { handleClose(); window.location.reload(); }, 1500);
        } catch (error) {
          Swal.fire({ icon: 'error', title: 'Error al registrar', text: 'Hubo un problema al crear tu cuenta.', confirmButtonColor: '#0a2f6b' });
        }
      }
    }
    setCargando(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton style={{ backgroundColor: '#e6f2ff', borderBottom: 'none' }}>
        <Modal.Title className="fw-bold w-100 text-center" style={{ color: '#0a2f6b' }}>
          {esLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#f4f9ff' }}>
        <div className="d-flex mx-auto mb-4" style={{ borderRadius: '50px', overflow: 'hidden', width: 'fit-content', border: '2px solid #0a2f6b' }}>
          <Button variant="light" onClick={() => setEsLogin(true)} style={{ borderRadius: 0, backgroundColor: esLogin ? '#0a2f6b' : 'transparent', color: esLogin ? 'white' : '#0a2f6b', border: 'none', borderRight: '2px solid #0a2f6b', padding: '0.5rem 1.5rem', fontWeight: 'bold', width: '150px' }}>
            Iniciar Sesión
          </Button>
          <Button variant="light" onClick={() => setEsLogin(false)} style={{ borderRadius: 0, backgroundColor: !esLogin ? '#0a2f6b' : 'transparent', color: !esLogin ? 'white' : '#0a2f6b', border: 'none', padding: '0.5rem 1.5rem', fontWeight: 'bold', width: '150px' }}>
            Registrarse
          </Button>
        </div>

        <Form onSubmit={manejarSubmit}>
          {!esLogin && (
            <>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Nombre completo</Form.Label>
                <Form.Control type="text" placeholder="Ingresá tu nombre y apellido" value={nombre} onChange={(e) => setNombre(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''))} required={!esLogin} disabled={cargando} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDni">
                <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>DNI</Form.Label>
                <Form.Control type="text" inputMode="numeric" maxLength={8} placeholder="Sin puntos ni espacios" value={dni} onChange={(e) => setDni(e.target.value.replace(/[^0-9]/g, ''))} required={!esLogin} disabled={cargando} />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={cargando} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="fw-bold" style={{ color: '#0a2f6b' }}>Contraseña</Form.Label>
            <InputGroup>
              <Form.Control type={mostrarPass ? "text" : "password"} placeholder={esLogin ? "Tu contraseña" : "Mínimo 8 caracteres"} value={password} onChange={(e) => setPassword(e.target.value)} required disabled={cargando} />
              <Button variant="outline-secondary" onMouseDown={() => setMostrarPass(true)} onMouseUp={() => setMostrarPass(false)} onMouseLeave={() => setMostrarPass(false)} onTouchStart={() => setMostrarPass(true)} onTouchEnd={() => setMostrarPass(false)} disabled={cargando}>
                <i className={`bi bi-eye${mostrarPass ? '-slash' : ''}`}></i>
              </Button>
            </InputGroup>
          </Form.Group>
          
          <div className="d-flex justify-content-between mt-4">
            <Button variant="outline-danger" onClick={handleClose} type="button" disabled={cargando}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" style={{ backgroundColor: '#0a2f6b', border: 'none', padding: '0.5rem 2rem' }} disabled={cargando}>
              {cargando ? 'Cargando...' : (esLogin ? 'Ingresar' : 'Registrarme')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegistro;