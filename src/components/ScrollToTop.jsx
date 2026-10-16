import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let tiempo1;
    let tiempo2;

    if (hash) {
      const irASeccion = () => {
        const elemento = document.getElementById(hash.replace('#', ''));
        if (elemento) {
          elemento.scrollIntoView({ behavior: 'smooth' });
        }
      };
      tiempo1 = setTimeout(irASeccion, 100);

      tiempo2 = setTimeout(irASeccion, 700); 

    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    return () => {
      clearTimeout(tiempo1);
      clearTimeout(tiempo2);
    };
    
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;