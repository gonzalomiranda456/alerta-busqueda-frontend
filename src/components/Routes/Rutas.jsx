import { Routes, Route } from 'react-router-dom';
import Inicio from '../../pages/Inicio';
import Error404 from '../../pages/Error404';


const Rutas = () => {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};

export default Rutas;