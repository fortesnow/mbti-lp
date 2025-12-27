// Simple wrapper for Google Analytics 4
// Assumes gtag is loaded in index.html

export const logEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
    console.log(`[Analytics] ${eventName}`, params);
  } else {
    console.log(`[Analytics (Mock)] ${eventName}`, params);
  }
};
