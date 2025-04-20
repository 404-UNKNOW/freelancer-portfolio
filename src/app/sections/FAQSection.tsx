'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

// FAQ data
const faqs = [
  {
    id: 1,
    question: "What is your development process?",
    answer: "My development process is divided into five main stages: requirements analysis, design planning, development implementation, testing & optimization, and deployment. I maintain close communication with clients throughout each stage to ensure the project proceeds as expected and can adapt flexibly to changing requirements."
  },
  {
    id: 2,
    question: "How long does a typical project take?",
    answer: "Project timelines depend on complexity and scope. Small websites or applications typically take 2-4 weeks, medium-sized projects about 1-2 months, while complex enterprise applications may require 3-6 months. I provide detailed time planning before project kickoff."
  },
  {
    id: 3,
    question: "What technology stacks do you use?",
    answer: "I'm proficient in various modern tech stacks. For frontend, I work with React, Vue.js, Next.js frameworks, and am skilled in HTML5, CSS3, and JavaScript. Backend technologies include Node.js, Python, PHP, and databases like MySQL, MongoDB, and PostgreSQL. I select the most appropriate technology solution based on project requirements."
  },
  {
    id: 4,
    question: "How do you ensure project quality and security?",
    answer: "I follow industry best practices including code reviews, automated testing, performance optimization, and security scanning. All projects undergo strict quality control to ensure code is clean, efficient, and secure. For security, I pay special attention to data protection, authentication, and authorization mechanisms."
  },
  {
    id: 5,
    question: "What support services do you provide after project completion?",
    answer: "After project completion, I offer a 30-day free support period to resolve any issues and bugs. Maintenance contracts are available afterward, including regular updates, performance monitoring, security patches, and feature extensions. My goal is to build long-term relationships with clients and ensure continuous optimization of your product."
  }
];

const FAQSection = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  
  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };
  
  return (
    <section id="faq" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Frequently Asked <span className="text-blue-500">Questions</span>
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
            Here are commonly asked questions to help you better understand my services
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <motion.div 
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: faq.id * 0.1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="flex justify-between items-center w-full text-left p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg md:text-xl font-semibold">{faq.question}</h3>
                <span className="text-blue-500 flex-shrink-0 ml-4">
                  {openId === faq.id ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
              
              {openId === faq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow-md mt-1"
                >
                  <p className="text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 