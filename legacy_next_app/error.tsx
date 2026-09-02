'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, Compass } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Sovereign App Error Caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-navy text-text flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-navy-light/90 border border-gold/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 bg-gold/10 rounded-2xl border border-gold/30 text-gold flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[3px] text-gold">Sovereign Recovery Protocol</span>
          <h1 className="text-2xl font-serif text-warm-white font-bold">Temporary Interruption</h1>
          <p className="text-xs text-text-muted">
            The requested property data stream encountered an unexpected state. Our edge layer has safely caught the exception.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full py-3.5 bg-gold text-navy font-bold rounded-xl uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Reload &amp; Re-Synchronize</span>
          </button>

          <Link
            href="/"
            className="w-full py-3 bg-white/5 hover:bg-gold/10 border border-gold/20 text-warm-white font-bold rounded-xl uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all block"
          >
            <Home size={14} />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
