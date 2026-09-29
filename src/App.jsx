import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuNavegacion from './components/Navbar';
import Inicio from './components/Inicio';
import Busqueda from './components/Busqueda';
import Registro from './components/Registro';
import Recibir from './components/Recibir';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <MenuNavegacion />
          
        <main style={{ marginTop: '90px' }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/busqueda" element={<Busqueda />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/recibir" element={<Recibir />} />
          </Routes>
        </main>
      </Router>
    </HelmetProvider>
  )
}

export default App