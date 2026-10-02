import { Routes, Route } from 'react-router-dom';
import Inicio from '../../pages/Inicio';
import Error404 from '../../pages/Error404';
import RegistroDesaparecido from '../../pages/RegistroDesaparecido';


const Rutas = () => {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/cargar-caso" element={<RegistroDesaparecido />} />
        </Routes>
    );
};

export default Rutas;