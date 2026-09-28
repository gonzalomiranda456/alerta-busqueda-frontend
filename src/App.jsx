import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import MenuNavegacion from './components/Navbar';
import Inicio from './components/Inicio';

function App() {
  return (
    <>
      <MenuNavegacion />
      <main style={{ marginTop: '90px' }}>
        <Inicio />
      </main>
    </>
  )
}

export default App