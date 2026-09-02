"use client";

import React, { useEffect } from 'react';

export function WebVitalsReporter() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Basic CWV reporting
    }
  }, []);

  return null;
}
