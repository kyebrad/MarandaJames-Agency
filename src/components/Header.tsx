import { useState } from 'react';
import { ShieldAlert, Info, X, Home } from 'lucide-react';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const handleQuickExit = () => {
    // Attempt to close the tab
    window.close();
    // Fallback to redirecting to a safe page if the browser blocks window.close()
    window.location.replace('https://www.weather.com');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-md shadow-amethyst/5 relative overflow-hidden">
        {/* Subtle top gradient accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amethyst via-olive to-amethyst"></div>
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-amethyst/5 blur-2xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center flex-1 sm:flex-none sm:justify-start mr-2 sm:mr-0">
            <img 
              src="https://i.imgur.com/XRPl2IF.png" 
              alt="MarandaJames Agency Logo" 
              className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Safety Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              aria-expanded={isModalOpen}
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-amethyst hover:text-amethyst-dark underline underline-offset-4 transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4" aria-hidden="true" />
              Confidentiality Notice
            </button>
            <button
              onClick={() => setIsExitModalOpen(true)}
              aria-expanded={isExitModalOpen}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold text-sm transition-colors shadow-md"
              title="Quickly leave this site"
            >
              <ShieldAlert className="w-4 h-4" aria-hidden="true" />
              QUICK EXIT
            </button>
          </div>
        </div>
      </header>

      {/* Quick Exit Confirmation Modal */}
      {isExitModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-modal-title"
          >
            <h3 id="exit-modal-title" className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-600" aria-hidden="true" />
              Confirm Quick Exit
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to quickly exit this site? This will attempt to close the current tab, or redirect you to a safe page (weather.com).
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsExitModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleQuickExit}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Yes, Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confidentiality Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confidentiality-modal-title"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            <h3 id="confidentiality-modal-title" className="text-xl font-serif font-bold text-amethyst-dark mb-4 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-amethyst" aria-hidden="true" />
              Safety & Confidentiality
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                Your safety is our priority. Please be aware that computer use can be monitored and is impossible to completely clear.
              </p>
              <p>
                If you are afraid your internet usage might be tracked, call the National Domestic Violence Hotline at <strong>1-800-799-SAFE (7233)</strong> or TTY 1-800-787-3224.
              </p>
              <div className="bg-lavender-base p-4 rounded-lg border border-amethyst/20">
                <h4 className="font-semibold text-amethyst-dark mb-2">How to clear your browser history:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Chrome:</strong> Press Ctrl+H (Cmd+Y on Mac) &gt; Clear browsing data</li>
                  <li><strong>Safari:</strong> History &gt; Clear History</li>
                  <li><strong>Firefox:</strong> Press Ctrl+Shift+Del (Cmd+Shift+Backspace on Mac)</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 w-full bg-amethyst text-white py-2 rounded-lg font-medium hover:bg-amethyst-dark transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </>
  );
}
