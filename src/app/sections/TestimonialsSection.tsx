'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

// 客户评价数据
const testimonials = [
  {
    id: 1,
    name: "张明",
    position: "初创公司CEO",
    image: "/testimonials/client1.jpg",
    rating: 5,
    text: "作为一家初创企业，我们需要一个能够快速适应我们不断变化的需求的开发者。这位开发者不仅技术精湛，而且能够理解我们的业务目标，提供了超出我们期望的解决方案。"
  },
  {
    id: 2,
    name: "李佳",
    position: "营销总监",
    image: "/testimonials/client2.jpg",
    rating: 5,
    text: "我们公司的网站改版后，流量和转化率都大幅提升。开发者的设计感和对用户体验的理解让我们的品牌在线上形象焕然一新。非常专业的服务和交付。"
  },
  {
    id: 3,
    name: "王强",
    position: "电商平台所有者",
    image: "/testimonials/client3.jpg",
    rating: 5,
    text: "我们的电子商务平台现在运行得比以往任何时候都要顺畅。开发者不仅解决了我们之前面临的性能问题，还添加了许多有用的功能，帮助我们提高了销售额。"
  },
  {
    id: 4,
    name: "陈小红",
    position: "设计工作室创始人",
    image: "/testimonials/client4.jpg",
    rating: 4,
    text: "作为设计师，我对细节和美学有很高的要求。这位开发者完美地将我的设计理念转化为了功能齐全的网站，并且在整个过程中沟通顺畅，是一次很好的合作体验。"
  },
  {
    id: 5,
    name: "赵伟",
    position: "教育机构负责人",
    image: "/testimonials/client5.jpg",
    rating: 5,
    text: "我们需要一个复杂的在线学习平台，这位开发者从需求分析到最终实现都表现出色。系统稳定、界面友好，师生们都非常喜欢。强烈推荐给需要高质量开发的机构。"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };
  
  return (
    <section id="testimonials" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            客户<span className="text-blue-500">评价</span>
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
            听听我的客户对我提供的服务和成果的评价
          </motion.p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* 前进后退按钮 */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg z-10 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors hidden md:block"
            aria-label="上一个评价"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg z-10 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors hidden md:block"
            aria-label="下一个评价"
          >
            <FaChevronRight />
          </button>
          
          {/* 评价轮播 */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-xl"
          >
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 md:w-24 md:h-24">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75"></div>
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name} 
                  className="relative rounded-full w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 mx-0.5" />
              ))}
            </div>
            
            <div className="relative mb-8">
              <FaQuoteLeft className="text-blue-500/20 text-4xl absolute -top-3 -left-3" />
              <p className="text-gray-700 dark:text-gray-300 text-center text-lg">
                {testimonials[activeIndex].text}
              </p>
            </div>
            
            <div className="text-center">
              <h4 className="font-bold text-xl mb-1">{testimonials[activeIndex].name}</h4>
              <p className="text-gray-600 dark:text-gray-400">{testimonials[activeIndex].position}</p>
            </div>
          </motion.div>
          
          {/* 移动端导航点 */}
          <div className="flex justify-center space-x-2 mt-8 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`转到评价 ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 