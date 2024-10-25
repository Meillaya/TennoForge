import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Search } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navLinks = [
    { name: 'Builds', path: '/builds' },
    { name: 'Warframes', path: '/warframes' },
    { name: 'Weapons', path: '/weapons' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-wf-dark-800/95 border-b border-wf-dark-600 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl font-bold"
            >
              <span className="text-wf-primary">TENNO</span>
              <span className="text-white">FORGE</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-wf-primary ${
                  location.pathname === link.path ? 'text-wf-primary' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {user ? (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 p-2 rounded-full bg-wf-dark-700 hover:bg-wf-dark-600 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </motion.button>

                <div className="absolute right-0 mt-2 w-48 origin-top-right">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="card py-2 shadow-lg"
                  >
                    <Link
                      to={`/profile/${user.username}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-wf-dark-700 hover:text-white transition-colors"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-wf-dark-700 hover:text-white transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </motion.div>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-wf-dark-600"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-base font-medium ${
                    location.pathname === link.path ? 'text-wf-primary' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <div className="pt-4 border-t border-wf-dark-600">
                  <Link
                    to={`/profile/${user.username}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <span>{user.username}</span>
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block"
                >
                  <button className="btn-primary w-full">Sign In</button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}