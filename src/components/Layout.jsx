import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-100 to-purple-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-purple-600 font-dancing">Wigiart</span>
            </Link>
            
            {pathname === '/' && (
              <div className="flex space-x-1">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('switchTab', { detail: 'frames' }))}
                  className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  Frames
                </button>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('switchTab', { detail: 'videos' }))}
                  className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  Videos
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-purple-600 mb-4 font-dancing">Wigiart</h3>
              <p className="text-gray-600">
                Create beautiful custom frames for your precious moments.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/frames" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Frame Gallery
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@wigiart.com" className="text-gray-600 hover:text-purple-600 transition-colors">
                    support@wigiart.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p> {new Date().getFullYear()} Wigiart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
