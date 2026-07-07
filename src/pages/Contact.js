import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { sendContactMessage } from '../api/contact';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const contacts = [
    {
      icon: Mail,
      title: 'Email',
      action: 'mohaddeseh.mozaffarii@gmail.com',
      link: 'mailto:mohaddeseh.mozaffarii@gmail.com',
      hover: 'group-hover:bg-red-400/20 group-hover:border-red-400/60',
      iconHover: 'group-hover:text-red-300',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      action: '@mohimozaffari',
      link: 'https://www.linkedin.com/in/mohimozaffari',
      hover: 'group-hover:bg-blue-400/20 group-hover:border-blue-400/60',
      iconHover: 'group-hover:text-blue-300',
    },
    {
      icon: Send,
      title: 'Telegram',
      action: '@mohimozaffari',
      link: 'https://t.me/mohimozaffari',
      hover: 'group-hover:bg-sky-400/20 group-hover:border-sky-400/60',
      iconHover: 'group-hover:text-sky-300',
      nudgeX: '-translate-x-[1px]', // subtle 1px shift to visually center the paper plane
    },
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendContactMessage(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="relative z-10 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Get In Touch</h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Send a message directly, or reach me via Email, LinkedIn, or Telegram.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50 mb-16 max-w-2xl mx-auto"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                className="bg-purple-950/50 border border-purple-700/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
              />
            </div>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              className="w-full bg-purple-950/50 border border-purple-700/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 mb-4"
            />

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>

              {status === 'sent' && (
                <span className="inline-flex items-center text-green-400 text-sm font-semibold">
                  <CheckCircle2 className="mr-1 w-4 h-4" /> Message sent, thank you!
                </span>
              )}
              {status === 'error' && (
                <span className="text-red-400 text-sm font-semibold">
                  Something went wrong, please try again or email me directly.
                </span>
              )}
            </div>
          </motion.form>

          {/* Contact Cards */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
            {contacts.map(({ icon: Icon, title, action, link, hover, iconHover, nudgeX }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-purple-900/30 p-6 rounded-xl border border-purple-700/50 text-center transition-all duration-300 hover:border-purple-600 ${hover}`}
              >
                {/* Icon circle: perfectly centered with grid */}
                <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-purple-600 transition-colors grid place-items-center">
                  <Icon
                    className={`w-8 h-8 text-white block transition-colors ${iconHover || ''} ${nudgeX || ''}`}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-purple-200">{action}</p>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
