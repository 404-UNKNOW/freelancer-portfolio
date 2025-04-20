'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <nav className="container-custom flex items-center justify-between py-4">
        <Link 
          href="/" 
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          404unknown
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#about" className="font-medium hover:text-blue-500 transition-colors">About</Link>
          <Link href="#services" className="font-medium hover:text-blue-500 transition-colors">Services</Link>
          <Link href="#portfolio" className="font-medium hover:text-blue-500 transition-colors">Portfolio</Link>
          <Link href="#faq" className="font-medium hover:text-blue-500 transition-colors">FAQ</Link>
          <Link href="#contact" className="btn-primary">Contact</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link href="#about" className="font-medium py-2 hover:text-blue-500 transition-colors" onClick={toggleMenu}>About</Link>
            <Link href="#services" className="font-medium py-2 hover:text-blue-500 transition-colors" onClick={toggleMenu}>Services</Link>
            <Link href="#portfolio" className="font-medium py-2 hover:text-blue-500 transition-colors" onClick={toggleMenu}>Portfolio</Link>
            <Link href="#faq" className="font-medium py-2 hover:text-blue-500 transition-colors" onClick={toggleMenu}>FAQ</Link>
            <Link href="#contact" className="btn-primary text-center" onClick={toggleMenu}>Contact</Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 