import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MenuNavegacion from './components/Navbar';
import Footer from './components/Footer';
import Rutas from './components/Routes/Rutas';

function App() {
    return (
        <HelmetProvider>
            <Router>
                <div className="d-flex flex-column min-vh-100">
                    <MenuNavegacion />
                    
                    <main className="flex-grow-1" style={{ paddingTop: '80px' }}>
                        <Rutas />
                    </main>

                    <Footer />
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;
