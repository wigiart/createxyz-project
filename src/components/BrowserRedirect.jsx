'use client';
import { useState, useEffect } from 'react';
import { isDownloadCapableBrowser, getExternalBrowserUrl } from '../utils/browserDetection';

export default function BrowserRedirect({ isOpen, onClose, onConfirm }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      handleRedirect();
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  const handleRedirect = () => {
    const externalBrowserUrl = getExternalBrowserUrl();
    window.location.href = externalBrowserUrl;
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Browser Compatibility Notice</h2>
        <p className="text-gray-700 mb-6">
          To download your creation, please open this page in Chrome, Safari, or another standard browser. 
          You will be redirected in {countdown} seconds.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleRedirect}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Open Now
          </button>
        </div>
      </div>
    </div>
  );
}
