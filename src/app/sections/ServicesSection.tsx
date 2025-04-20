'use client';

import { motion } from 'framer-motion';
import { FaCode, FaPalette, FaMobileAlt, FaDatabase, FaSearchengin, FaServer } from 'react-icons/fa';

const services = [
  {
    icon: <FaCode size={30} />,
    title: "Website Development",
    description: "Create high-performance, responsive websites using modern frontend technologies including React, Next.js, Vue and more.",
  },
  {
    icon: <FaPalette size={30} />,
    title: "UI/UX Design",
    description: "Provide intuitive and engaging user interface designs with a focus on user experience, ensuring usability and visual appeal.",
  },
  {
    icon: <FaMobileAlt size={30} />,
    title: "Mobile App Development",
    description: "Develop native or cross-platform mobile applications for iOS and Android using React Native or Flutter technologies.",
  },
  {
    icon: <FaDatabase size={30} />,
    title: "Database Design",
    description: "Design efficient and scalable database architectures, optimize data storage and query performance, and ensure data security.",
  },
  {
    icon: <FaSearchengin size={30} />,
    title: "SEO Optimization",
    description: "Improve website visibility in search engines, optimize content and structure to increase organic traffic and conversion rates.",
  },
  {
    icon: <FaServer size={30} />,
    title: "API Development",
    description: "Build reliable RESTful or GraphQL APIs, implement frontend-backend separation architecture, and provide stable data interaction.",
  }
];

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
    >
      <div className="text-blue-500 mb-4 group-hover:text-purple-500 transition-colors duration-300">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            My <span className="text-blue-500">Services</span>
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
            I provide comprehensive development services, from design to implementation, offering one-stop solutions for your projects
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 