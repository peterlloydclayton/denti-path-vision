import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-4TPS17HWMD';

let isInitialized = false;

export const initGA = (hasConsent: boolean) => {
  if (hasConsent && !isInitialized) {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gaOptions: {
        anonymizeIp: true,
      },
    });
    isInitialized = true;
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
  }
};
