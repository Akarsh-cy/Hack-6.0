import { useEffect } from 'react';

export function useViewportHeight() {
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
    };
  }, []);
}
