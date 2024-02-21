import { useState, useEffect } from 'react';

export default function useDevice() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const getDevice = () => {
      let isMobile = false;
      let isTablet = false;
      let isDesktop = false;
      if (document.documentElement.clientWidth < 768) {
        isMobile = true;
      } else if (document.documentElement.clientWidth < 1024) {
        isTablet = true;
      } else {
        isDesktop = true;
      }
      setDevice({
        isMobile,
        isTablet,
        isDesktop,
      });
    };

    getDevice();
    window.addEventListener('resize', getDevice);
    return () => window.removeEventListener('resize', getDevice);
  }, []);

  return device;
}