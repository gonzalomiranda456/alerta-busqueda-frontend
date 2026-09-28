import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuNavegacion from './components/Navbar';
import Inicio from './components/Inicio';
import Busqueda from './components/Busqueda';

function App() {
  return (
    <Router>
      <MenuNavegacion />

      <main style={{ marginTop: '90px' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          
          <Route path="/busqueda" element={<Busqueda />} />
          <Route path="/registro" element={<div className="text-center mt-5"><h2>Página de Registro (En construcción)</h2></div>} />
          <Route path="/recibir" element={<div className="text-center mt-5"><h2>Página de Alertas (En construcción)</h2></div>} />
        </Routes>
      </main>
    </Router>
  )
}

export default App