import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import MenuNavegacion from './components/Navbar';

function App() {
  return (
    <>
      <MenuNavegacion />
      <main style={{ marginTop: '90px' }}>
        <div className="container text-center mt-5">
          <h1>Alerta Búsqueda - Frontend</h1>
          <p>Migración a React en proceso...</p>
        </div>
      </main>
      <h1>Alerta Búsqueda - Frontend</h1>
    </>
  )
}

export default App