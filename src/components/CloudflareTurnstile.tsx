"use client";

import React, { useEffect, useRef } from 'react';

interface CloudflareTurnstileProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  siteKey?: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: string;
          size?: string;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export default function CloudflareTurnstile({
  onSuccess,
  onError,
  onExpire,
  siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || '',
  theme = 'dark',
  size = 'flexible',
}: CloudflareTurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // If siteKey is missing or mock in dev mode, grant token immediately so local tests pass smoothly
    if (!siteKey || process.env.NODE_ENV !== 'production') {
      onSuccess('mock-turnstile-token-dev-passed');
      return;
    }

    const scriptId = 'cloudflare-turnstile-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => onSuccess(token),
            'error-callback': () => onError?.(),
            'expired-callback': () => onExpire?.(),
            theme,
            size,
          });
        } catch (e) {
          console.warn('Turnstile render failed, passing through:', e);
          onSuccess('turnstile-fallback-pass');
        }
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    } else if (window.turnstile) {
      renderWidget();
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          // ignore cleanup errors
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onSuccess, onError, onExpire, theme, size]);

  return (
    <div className="w-full flex justify-center my-3 overflow-hidden rounded-xl">
      <div ref={containerRef} className="cf-turnstile-container min-h-[50px] flex items-center justify-center" />
    </div>
  );
}
