import ReactGA from 'react-ga4';

// Add your Google Analytics Measurement ID here
// You can get this from your Google Analytics dashboard (G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 measurement ID

let isInitialized = false;

export const initGA = (hasConsent: boolean) => {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('Google Analytics: No measurement ID configured');
    return;
  }

  if (hasConsent && !isInitialized) {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gaOptions: {
        anonymizeIp: true,
      },
    });
    isInitialized = true;
    console.log('Google Analytics initialized');
  }
};

export const trackPageView = (path: string) => {
  if (isInitialized) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const trackEvent = (category: string, action: string, label?: string) => {
  if (isInitialized) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};

export const disableGA = () => {
  if (isInitialized) {
    // Set opt-out flag
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    console.log('Google Analytics disabled');
  }
};
