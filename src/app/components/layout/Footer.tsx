'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const emailAddress = process.env.NEXT_PUBLIC_EMAIL_ADDRESS || 'your-email@example.com';
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">404unknown</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Professional web development, mobile app and UI/UX design services for exceptional digital experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href={`mailto:${emailAddress}`} className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">About</Link></li>
              <li><Link href="#services" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Services</Link></li>
              <li><Link href="#portfolio" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Portfolio</Link></li>
              <li><Link href="#faq" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">FAQ</Link></li>
              <li><Link href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Email: {emailAddress}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Working Hours: Mon-Fri 9:00-17:00 (GMT+8)</p>
            <p className="text-gray-600 dark:text-gray-400">Location: Malaysia</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} 404unknown. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 