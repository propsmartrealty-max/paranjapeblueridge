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
  const [atmosphere, setAtmosphere] = useState<Atmosphere>('morning');

  useEffect(() => {
    // Check local storage for manual override, default to morning (Beige Theme)
    const saved = localStorage.getItem('sovereign-atmosphere') as Atmosphere;
    setAtmosphere(saved || 'morning');
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (atmosphere === 'night') {
      root.classList.add('dark-atmosphere');
      root.classList.remove('light-atmosphere');
    } else {
      root.classList.remove('dark-atmosphere');
      root.classList.add('light-atmosphere');
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
    return {
      atmosphere: 'morning' as Atmosphere,
      setAtmosphere: () => {},
      toggleAtmosphere: () => {},
    };
  }
  return context;
}
