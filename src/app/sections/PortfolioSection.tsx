'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLink, FaCode } from 'react-icons/fa';

// Portfolio data
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    image: "/projects/ecommerce.jpg",
    description: "Modern e-commerce platform based on Next.js and Stripe, featuring complete shopping cart and payment functionality.",
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Stripe"],
    liveLink: "#",
    codeLink: "#",
  },
  {
    id: 2,
    title: "Health Management App",
    category: "Mobile App",
    image: "/projects/health-app.jpg",
    description: "Mobile application helping users track health data and exercise plans, available for both iOS and Android platforms.",
    technologies: ["React Native", "Firebase", "Redux", "Node.js"],
    liveLink: "#",
    codeLink: "#",
  },
  {
    id: 3,
    title: "Enterprise Management System",
    category: "Web Development",
    image: "/projects/dashboard.jpg",
    description: "Internal management system for medium-sized businesses, including data analysis, report generation, and user management features.",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
    liveLink: "#",
    codeLink: "#",
  },
  {
    id: 4,
    title: "Design Studio Website",
    category: "UI/UX Design",
    image: "/projects/design-studio.jpg",
    description: "Modern showcase website created for a design studio, emphasizing visual effects and user experience.",
    technologies: ["Figma", "HTML/CSS", "JavaScript", "GSAP"],
    liveLink: "#",
    codeLink: "#",
  },
  {
    id: 5,
    title: "Travel Guide App",
    category: "Mobile App",
    image: "/projects/travel-app.jpg",
    description: "Mobile application providing travelers with destination information, route planning, and location services.",
    technologies: ["Flutter", "Dart", "Firebase", "Google Maps API"],
    liveLink: "#",
    codeLink: "#",
  },
  {
    id: 6,
    title: "Content Management System",
    category: "Web Development",
    image: "/projects/cms.jpg",
    description: "Custom content management system allowing clients to easily update website content without technical knowledge.",
    technologies: ["React", "GraphQL", "Node.js", "MongoDB"],
    liveLink: "#",
    codeLink: "#",
  },
];

// Project categories
const categories = ["All", "Web Development", "Mobile App", "UI/UX Design"];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            My <span className="text-blue-500">Portfolio</span>
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
            Browse my latest projects showcasing my expertise across various technology domains
          </motion.p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex space-x-3">
                    <a 
                      href={project.liveLink} 
                      className="flex items-center gap-1 text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm transition-colors"
                    >
                      <FaLink /> View
                    </a>
                    <a 
                      href={project.codeLink} 
                      className="flex items-center gap-1 text-white bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded text-sm transition-colors"
                    >
                      <FaCode /> Code
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-2">
                  {project.category}
                </span>
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection; 