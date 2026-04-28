"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Atmosphere = 'morning' | 'night';

interface AtmosphereContextType {
  atmosphere: Atmosphere;
  setAtmosphere: (atm: Atmosphere) => void;
  toggleAtmosphere: () => void;
}

const AtmosphereContext = createContext<AtmosphereContextType | undefined>(undefined);

export function AtmosphereProvider({ children }: { children: React.ReactNode }) {
  const [atmosphere, setAtmosphere] = useState<Atmosphere>('night');

  useEffect(() => {
    // Detect time of day for initial atmosphere
    const hour = new Date().getHours();
    const initialAtmosphere = (hour >= 6 && hour < 18) ? 'morning' : 'night';
    
    // Check local storage for manual override
    const saved = localStorage.getItem('sovereign-atmosphere') as Atmosphere;
    setAtmosphere(saved || initialAtmosphere);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (atmosphere === 'morning') {
      root.classList.add('light-atmosphere');
    } else {
      root.classList.remove('light-atmosphere');
    }
    localStorage.setItem('sovereign-atmosphere', atmosphere);
  }, [atmosphere]);

  const toggleAtmosphere = () => {
    setAtmosphere(prev => prev === 'morning' ? 'night' : 'morning');
  };

  return (
    <AtmosphereContext.Provider value={{ atmosphere, setAtmosphere, toggleAtmosphere }}>
      {children}
    </AtmosphereContext.Provider>
  );
}

export function useAtmosphere() {
  const context = useContext(AtmosphereContext);
  if (context === undefined) {
    throw new Error('useAtmosphere must be used within an AtmosphereProvider');
  }
  return context;
}
