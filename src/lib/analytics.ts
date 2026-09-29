import { track } from '@vercel/analytics';

export const logEvent = (name: string, data?: Record<string, string | number | boolean>) => {
  try {
    track(name, data);
  } catch (e) {
    console.warn(e);
  }
};

// Exportar globalmente para integración con la lógica interactiva
if (typeof window !== 'undefined') {
  (window as any).logEvent = logEvent;
}
