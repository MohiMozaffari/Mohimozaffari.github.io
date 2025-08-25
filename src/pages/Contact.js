import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Send } from 'lucide-react';

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const contacts = [
    {
      icon: Mail,
      title: 'Email',
      action: 'mohaddeseh.mozaffari@gmail.com',
      link: 'mailto:mohaddeseh.mozaffari@gmail.com',
      color: 'hover:text-red-400'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      action: '@mohimozaffari',
      link: 'https://www.linkedin.com/in/mohimozaffari',
      color: 'hover:text-blue-400'
    },
    {
      icon: Send,
      title: 'Telegram',
      action: '@mohimozaffari',
      link: 'https://t.me/mohimozaffari',
      color: 'hover:text-sky-400'
    }
  ];

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              You can reach me directly via Email, LinkedIn, or Telegram.
            </p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
            {contacts.map((c, i) => {
              const Icon = c.icon;
              return (
                <a
                  key={i}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 text-center hover:border-purple-600 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className={`w-8 h-8 text-white ${c.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-purple-200">{c.action}</p>
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
