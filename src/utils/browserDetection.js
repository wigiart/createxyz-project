export const detectBrowser = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('instagram')) {
    return 'instagram';
  } else if (userAgent.includes('facebook') || userAgent.includes('fbios') || userAgent.includes('fb_iab')) {
    return 'facebook';
  } else if (userAgent.includes('line')) {
    return 'line';
  } else if (userAgent.includes('wv') && userAgent.includes('android')) {
    return 'webview';
  }
  
  return 'standard';
};

export const isDownloadCapableBrowser = () => {
  const browser = detectBrowser();
  return browser === 'standard';
};

export const getExternalBrowserUrl = () => {
  const currentUrl = window.location.href;
  
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    // For iOS devices
    return `googlechrome://${currentUrl.replace(/^https?:\/\//, '')}`;
  } else if (/Android/i.test(navigator.userAgent)) {
    // For Android devices
    return `intent://${currentUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
  }
  
  // Fallback to the current URL
  return currentUrl;
};
