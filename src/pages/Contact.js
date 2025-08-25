import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, User, Send, CheckCircle, Github, Linkedin, Twitter, Globe } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    message_type: 'contact'
  });
  const [submitted, setSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = encodeURIComponent(`${formData.message_type.toUpperCase()}: ${formData.subject}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Message Type: ${formData.message_type}

Message:
${formData.message}
    `);
    
    const mailtoLink = `mailto:mohaddeseh.mozaffari@example.com?subject=${subject}&body=${body}`;
    
    // Open mail client
    window.location.href = mailtoLink;
    
    // Show success message
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      message_type: 'contact'
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Me',
      description: 'For general inquiries and collaboration opportunities',
      action: 'mohaddeseh.mozaffari@example.com',
      link: 'mailto:mohaddeseh.mozaffari@example.com'
    },
    {
      icon: MessageSquare,
      title: 'Teaching Inquiry',
      description: 'Interested in Python, AI, or Game Development courses?',
      action: 'Schedule a consultation',
      type: 'teaching'
    },
    {
      icon: User,
      title: 'Research Collaboration',
      description: 'Let\'s discuss complex systems and computational biology projects',
      action: 'Start a conversation',
      type: 'collaboration'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/MohiMozaffari',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: '#',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: '#',
      color: 'hover:text-sky-400'
    },
    {
      icon: Globe,
      name: 'Website',
      url: 'https://mohimozaffari.github.io/',
      color: 'hover:text-purple-400'
    }
  ];

  if (submitted) {
    return (
      <div className="relative z-10 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-purple-900/30 p-12 rounded-xl border border-purple-700/50">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
              <p className="text-purple-200 mb-8 leading-relaxed">
                Thank you for reaching out! I've received your message and will get back to you 
                within 24 hours. I'm excited to connect and discuss how we can work together.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-all duration-300"
              >
                Send Another Message
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Whether you're interested in courses, research collaboration, or just want to 
              discuss complex systems and computational biology, I'd love to hear from you.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 text-center hover:border-purple-600 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-purple-200 mb-4 text-sm leading-relaxed">
                    {method.description}
                  </p>
                  {method.link ? (
                    <a
                      href={method.link}
                      className="text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      {method.action}
                    </a>
                  ) : (
                    <button
                      onClick={() => setFormData({ ...formData, message_type: method.type || 'contact' })}
                      className="text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      {method.action}
                    </button>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Send Me a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600/50 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600/50 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message_type" className="block text-white font-semibold mb-2">
                    Type of Inquiry
                  </label>
                  <select
                    id="message_type"
                    name="message_type"
                    value={formData.message_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="contact">General Contact</option>
                    <option value="teaching">Teaching/Courses</option>
                    <option value="collaboration">Research Collaboration</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600/50 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-purple-800/50 border border-purple-600/50 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 resize-vertical"
                    placeholder="Tell me more about your inquiry..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Connect With Me</h3>
            <div className="flex justify-center space-x-8">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center text-purple-200 transition-all duration-300 hover:bg-purple-600 ${link.color}`}
                    title={link.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Response Time</h3>
              <p className="text-purple-200 leading-relaxed max-w-2xl mx-auto">
                I typically respond to all inquiries within 24 hours. For urgent teaching-related 
                questions or time-sensitive research discussions, feel free to mention the urgency 
                in your message.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;