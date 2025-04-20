'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block">Professional Developer,</span>
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Empowering Your Ideas</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              I provide high-quality website development, applications, and UI/UX design services to help your business stand out in the digital world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact" className="btn-primary flex items-center justify-center gap-2 text-lg">
                Get Started <FaArrowRight />
              </Link>
              <Link href="#portfolio" className="px-6 py-3 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 text-lg">
                View Portfolio
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div>
                <p className="text-3xl font-bold text-blue-500">50+</p>
                <p className="text-gray-600 dark:text-gray-400">Completed Projects</p>
              </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <p className="text-3xl font-bold text-blue-500">98%</p>
                <p className="text-gray-600 dark:text-gray-400">Client Satisfaction</p>
              </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <p className="text-3xl font-bold text-blue-500">5+</p>
                <p className="text-gray-600 dark:text-gray-400">Years of Experience</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src="/developer-illustration.svg"
                  alt="Developer at work illustration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 