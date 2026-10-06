import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const BotonSubir = () => {
    const [mostrar, setMostrar] = useState(false);

    useEffect(() => {
        const controlarScroll = () => {
            if (window.scrollY > 300) {
                setMostrar(true);
            } else {
                setMostrar(false);
            }
        };
        window.addEventListener('scroll', controlarScroll);

        return () => window.removeEventListener('scroll', controlarScroll);
    }, []);

    const irArriba = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!mostrar) return null;
    return (
        <Button 
            onClick={irArriba} 
            className="rounded-circle shadow position-fixed d-flex justify-content-center align-items-center"
            style={{ 
                bottom: '30px', 
                right: '30px', 
                zIndex: 1050,
                width: '50px',
                height: '50px',
                backgroundColor: '#0a2f6b',
                border: 'none',
                transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <i className="bi bi-arrow-up fs-4"></i>
        </Button>
    );
};

export default BotonSubir;