import { Routes, Route } from 'react-router-dom';
import Inicio from '../../pages/Inicio';
import Error404 from '../../pages/Error404';
import RegistroDesaparecido from '../../pages/RegistroDesaparecido';
import Busqueda from '../../pages/Busqueda';
import Recibir from '../../pages/Recibir';


const Rutas = () => {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/cargar-caso" element={<RegistroDesaparecido />} />
            <Route path="/busqueda" element={<Busqueda />} />
            <Route path="/recibir" element={<Recibir />} />
        </Routes>
    );
};

export default Rutas;