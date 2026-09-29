import { track } from '@vercel/analytics';

export const logEvent = (name: string, data?: Record<string, string | number | boolean>) => {
  // 1. Registro en Vercel Analytics
  try {
    track(name, data);
  } catch (e) {
    console.warn('[Vercel Analytics]', e);
  }

  // 2. Registro en Google Analytics 4 (GA4)
  try {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', name, data || {});
    }
  } catch (e) {
    console.warn('[GA4 Analytics]', e);
  }
};

// Exportar globalmente para integración con la lógica interactiva
if (typeof window !== 'undefined') {
  (window as any).logEvent = logEvent;
}
