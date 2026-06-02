import { useState, useEffect } from 'react';

export function useExitIntent(delayMs = 0) {
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Only trigger once per session to avoid annoying the user
    if (sessionStorage.getItem('exitIntentTriggered')) {
      return;
    }

    const onMouseLeave = (e: MouseEvent) => {
      // Check if mouse leaves through the top of the window
      if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
        if (!hasTriggered) {
          setTimeout(() => {
            setHasTriggered(true);
            sessionStorage.setItem('exitIntentTriggered', 'true');
          }, delayMs);
        }
      }
    };

    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [hasTriggered, delayMs]);

  return hasTriggered;
}
