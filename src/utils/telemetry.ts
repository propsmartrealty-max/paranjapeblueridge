"use client";

/**
 * Sovereign Lead & Analytics Telemetry Engine
 * Standardizes event dispatching to Google Analytics (GA4), Meta Pixel (fbq), and local storage logs.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export interface TelemetryEvent {
  eventName: string;
  category: 'Lead' | 'Engagement' | 'Conversion' | 'Navigation';
  label?: string;
  value?: number;
  params?: Record<string, any>;
}

export function trackEvent({ eventName, category, label, value, params = {} }: TelemetryEvent) {
  if (typeof window === 'undefined') return;

  const payload = {
    event_category: category,
    event_label: label,
    value,
    ...params,
  };

  // 1. Google Analytics (gtag.js)
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, payload);
    } catch (e) {
      console.warn('[Telemetry] GA4 dispatch failed:', e);
    }
  }

  // 2. Meta / Facebook Pixel (fbq)
  if (typeof window.fbq === 'function') {
    try {
      if (category === 'Lead') {
        window.fbq('track', 'Lead', { content_name: label, ...params });
      } else if (category === 'Conversion') {
        window.fbq('track', 'Schedule', { content_name: label, ...params });
      } else {
        window.fbq('trackCustom', eventName, payload);
      }
    } catch (e) {
      console.warn('[Telemetry] Meta Pixel dispatch failed:', e);
    }
  }

  // 3. Local Audit Trail Fingerprint
  try {
    const existingLogs = JSON.parse(localStorage.getItem('sovereign-telemetry-log') || '[]');
    existingLogs.push({
      timestamp: new Date().toISOString(),
      eventName,
      category,
      label,
      params,
    });
    localStorage.setItem('sovereign-telemetry-log', JSON.stringify(existingLogs.slice(-20))); // keep last 20 events
  } catch (e) {
    // Ignore storage quota limits
  }
}

/** Specialized Helper Methods */
export function trackLeadSubmission(formType: string, contactInfo?: { name?: string; phone?: string; email?: string }) {
  trackEvent({
    eventName: 'lead_submission',
    category: 'Lead',
    label: formType,
    params: {
      form_name: formType,
      has_phone: Boolean(contactInfo?.phone),
      has_email: Boolean(contactInfo?.email),
    },
  });
}

export function trackWhatsappClick(sourceLocation: string) {
  trackEvent({
    eventName: 'whatsapp_click',
    category: 'Conversion',
    label: sourceLocation,
    params: { source: sourceLocation },
  });
}

export function trackPdfDownload(documentTitle: string) {
  trackEvent({
    eventName: 'document_download',
    category: 'Engagement',
    label: documentTitle,
    params: { document: documentTitle },
  });
}

export function trackCalculatorUsage(calculatorType: 'EMI' | 'ROI' | 'NRI_COST', details?: Record<string, any>) {
  trackEvent({
    eventName: 'calculator_use',
    category: 'Engagement',
    label: calculatorType,
    params: details,
  });
}
