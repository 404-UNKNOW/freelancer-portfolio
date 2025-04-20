'use client';

import { motion } from 'framer-motion';
import { FaCode, FaPalette, FaMobileAlt, FaLaptopCode } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            About <span className="text-blue-500">Me</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-blue-500 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Learn about my professional skills and experience, and how I can help you achieve your project vision
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-20"></div>
              <img 
                src="/dog-simple.png" 
                alt="Cartoon dog icon" 
                className="relative rounded-xl shadow-lg w-full h-auto object-contain bg-white p-8"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">I'm a Full-Stack Developer & UI/UX Designer</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              With over 5 years of professional development experience, I focus on creating high-quality, user-friendly, and high-performance digital products. I combine technical expertise with creative design to provide comprehensive solutions for clients.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              I believe good communication and understanding client needs are key to project success. Whether creating new products or optimizing existing ones, I can provide professional advice and implementation solutions.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaCode className="text-blue-500" />
                <span>Frontend Development</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLaptopCode className="text-blue-500" />
                <span>Backend Development</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPalette className="text-blue-500" />
                <span>UI/UX Design</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMobileAlt className="text-blue-500" />
                <span>Mobile App Development</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 