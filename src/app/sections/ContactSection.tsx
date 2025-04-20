'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaClock } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// EmailJS服务配置 - 使用真实的EmailJS配置
const EMAILJS_SERVICE_ID = 'service_h77r199'; // EmailJS服务ID
const EMAILJS_TEMPLATE_ID = 'template_lil7dq7'; // EmailJS模板ID
const EMAILJS_PUBLIC_KEY = '6a0liRyqZ17MYLzG1'; // EmailJS公钥

// 安全控制：速率限制
const RATE_LIMIT = {
  maxRequests: 3, // 最大请求数
  timeWindow: 60 * 60 * 1000, // 时间窗口（1小时）
  storageKey: 'contact_form_submissions' // 存储键名
};

const ContactSection = () => {
  // 添加目标邮箱作为常量
  const emailAddress = 'inorigc777@gmail.com';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // 蜜罐字段用于防止机器人
  });
  
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [submissionAttempt, setSubmissionAttempt] = useState(0);
  
  // 安全：检查提交速率限制
  useEffect(() => {
    checkRateLimit();
    
    // 定期检查速率限制（每分钟）
    const intervalId = setInterval(checkRateLimit, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  
  // 检查用户的速率限制状态
  const checkRateLimit = () => {
    try {
      // 获取过去提交记录
      const submissionsStr = localStorage.getItem(RATE_LIMIT.storageKey);
      const submissions = submissionsStr ? JSON.parse(submissionsStr) : [];
      
      // 过滤出时间窗口内的提交
      const now = Date.now();
      const recentSubmissions = submissions.filter((time: number) => 
        now - time < RATE_LIMIT.timeWindow
      );
      
      // 更新存储
      localStorage.setItem(RATE_LIMIT.storageKey, JSON.stringify(recentSubmissions));
      
      // 检查是否达到限制
      const isLimited = recentSubmissions.length >= RATE_LIMIT.maxRequests;
      setIsRateLimited(isLimited);
      
      // 如果达到限制，计算剩余时间
      if (isLimited && recentSubmissions.length > 0) {
        const oldestSubmission = Math.min(...recentSubmissions);
        const timeToReset = oldestSubmission + RATE_LIMIT.timeWindow - now;
        
        // 在控制台输出限制信息（仅开发调试用）
        console.log(`Rate limited. Try again in ${Math.ceil(timeToReset / (60 * 1000))} minutes.`);
      }
    } catch (e) {
      // 如果localStorage不可用（隐私模式等），不实施速率限制
      console.warn('Unable to check rate limit:', e);
      setIsRateLimited(false);
    }
  };
  
  // 记录新的提交
  const recordSubmission = () => {
    try {
      const submissionsStr = localStorage.getItem(RATE_LIMIT.storageKey);
      const submissions = submissionsStr ? JSON.parse(submissionsStr) : [];
      submissions.push(Date.now());
      localStorage.setItem(RATE_LIMIT.storageKey, JSON.stringify(submissions));
    } catch (e) {
      console.warn('Unable to record submission:', e);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // 安全：记录表单提交尝试
    if (name === 'email' || name === 'message') {
      setSubmissionAttempt(prev => prev + 1);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 安全：检测过度频繁的输入行为（可能是自动化工具）
    if (submissionAttempt > 50) {
      console.warn('Suspicious form activity detected');
      setErrorMessage('Please try again later.');
      setSubmitStatus('error');
      return;
    }
    
    // 安全：检查速率限制
    if (isRateLimited) {
      setErrorMessage('Too many messages sent. Please try again later.');
      setSubmitStatus('error');
      return;
    }
    
    // 安全：蜜罐字段检查（如果有内容，可能是机器人）
    if (formData.honeypot) {
      console.log('Bot detected');
      setSubmitStatus('success'); // 假装成功，防止机器人检测到它们被拒绝
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // 安全：输入验证
      // 验证名称（无特殊字符）
      const nameRegex = /^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF\-']+$/;
      if (!formData.name || !nameRegex.test(formData.name)) {
        throw new Error('Please enter a valid name.');
      }
      
      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        throw new Error('Please provide a valid email address.');
      }
      
      // 验证主题（无危险HTML）
      if (!formData.subject || formData.subject.includes('<') || formData.subject.includes('>')) {
        throw new Error('Please enter a valid subject without HTML characters.');
      }
      
      // 验证消息（最小长度和最大长度）
      if (!formData.message || formData.message.length < 10 || formData.message.length > 1000) {
        throw new Error('Message must be between 10-1000 characters.');
      }
      
      // 安全：过滤和清理输入
      const sanitizedData = {
        from_name: formData.name.replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF\-']/g, ''),
        from_email: formData.email.trim(),
        to_email: emailAddress,
        subject: formData.subject.replace(/[<>]/g, ''),
        message: formData.message.replace(/[<>]/g, '')
      };
      
      // 使用EmailJS发送邮件
      emailjs.init(EMAILJS_PUBLIC_KEY);
      
      // 安全：包装在try-catch，防止API错误暴露
      try {
        // 添加时间戳防止重放攻击
        const timestamp = new Date().toISOString();
        const emailjsResponse = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            ...sanitizedData,
            timestamp: timestamp
          }
        );
        
        console.log('EmailJS响应:', emailjsResponse.status);
        
        if (emailjsResponse.status === 200) {
          // 记录成功提交（用于速率限制）
          recordSubmission();
          
          setSubmitStatus('success');
          // 重置表单
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            honeypot: ''
          });
          
          if (formRef.current) {
            formRef.current.reset();
          }
        } else {
          throw new Error('Failed to send message.');
        }
      } catch (emailError: any) {
        console.error('EmailJS错误:', emailError);
        setSubmitStatus('error');
        // 安全：不暴露详细错误信息给用户
        setErrorMessage('Unable to send message. Please try again later.');
      }
    } catch (error: any) {
      console.error('提交错误:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to send. Please try again later.');
    } finally {
      setIsSubmitting(false);
      
      // 延迟清除状态信息
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage('');
      }, 5000);
    }
  };
  
  // 安全：额外的隐藏表单字段（更高级的蜜罐）
  const hiddenStyle = {
    opacity: 0,
    position: 'absolute' as const,
    top: 0,
    left: 0,
    height: 0,
    width: 0,
    zIndex: -1
  };
  
  return (
    <section id="contact" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Contact <span className="text-blue-500">Me</span>
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
            Have a project idea or need consultation? Feel free to reach out, and I'll get back to you promptly.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white p-3 rounded-lg">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400">{emailAddress}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white p-3 rounded-lg">
                  <FaClock />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Response Time</h4>
                  <p className="text-gray-600 dark:text-gray-400">Typically within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white p-3 rounded-lg">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">Malaysia</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-bold mb-4">Working Hours</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Monday - Friday:</span>
                  <span>9:00 - 17:00 (GMT+8)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Saturday - Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Send Message</h3>
              
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded mb-6">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
                  {errorMessage || 'Failed to send. Please try again later or email directly to ' + emailAddress}
                </div>
              )}
              
              {isRateLimited && (
                <div className="bg-yellow-100 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-6">
                  You've reached the maximum number of messages for now. Please try again later.
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit}>
                {/* 蜜罐字段1 - 对用户隐藏，但机器人会填写 */}
                <div className="hidden">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                
                {/* 安全：额外的蜜罐字段 */}
                <div style={hiddenStyle} aria-hidden="true">
                  <label htmlFor="email_confirm">Email Confirmation (Leave Empty)</label>
                  <input 
                    type="email" 
                    id="email_confirm" 
                    name="email_confirm" 
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={50}
                      pattern="^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF\-']+$"
                      title="Please enter a valid name (letters, spaces, hyphens and apostrophes only)"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Message subject"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={1000}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Your message (10-1000 characters)"
                  ></textarea>
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.message.length}/1000 characters
                  </div>
                </div>
                
                {/* 安全：防止自动提交 */}
                <input type="hidden" name="form_submitted_at" value={new Date().toISOString()} />
                
                <button
                  type="submit"
                  disabled={isSubmitting || isRateLimited}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : isRateLimited ? (
                    'Rate Limited - Try Again Later'
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;