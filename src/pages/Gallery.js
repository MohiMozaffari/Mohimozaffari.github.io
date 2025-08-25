import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ZoomIn, Calendar, Eye } from 'lucide-react';
import { galleryImages } from '../data/gallery';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];
  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const openImage = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'visualization': 'bg-blue-500',
      'simulation': 'bg-green-500',
      'research': 'bg-purple-500',
      'education': 'bg-orange-500',
      'default': 'bg-gray-500'
    };
    return colors[category] || colors.default;
  };

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
              Gallery
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              A visual journey through my research, educational projects, and computational 
              explorations in complex systems and biological physics.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 capitalize ${
                  filter === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-900/50 text-purple-200 hover:bg-purple-700 hover:text-white'
                }`}
              >
                {category === 'all' ? 'All Work' : category}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className="group relative bg-purple-900/30 rounded-xl border border-purple-700/50 overflow-hidden hover:border-purple-600 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="aspect-w-16 aspect-h-10 relative">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <button
                        onClick={() => openImage(image)}
                        className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        <ZoomIn className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 ${getCategoryColor(image.category)} text-white text-xs font-semibold rounded-full capitalize`}>
                      {image.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                  <p className="text-purple-200 text-sm mb-4 line-clamp-2">
                    {image.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-purple-300">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(image.created_at)}</span>
                    </div>
                    <button
                      onClick={() => openImage(image)}
                      className="flex items-center space-x-1 hover:text-purple-200 transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No images found */}
          {filteredImages.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-16">
              <div className="bg-purple-900/30 p-8 rounded-xl border border-purple-700/50 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">No Images Found</h3>
                <p className="text-purple-200 mb-6">
                  No images match the selected category. Try a different filter.
                </p>
                <button
                  onClick={() => setFilter('all')}
                  className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300"
                >
                  Show All Images
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] bg-purple-900/50 rounded-xl border border-purple-700/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full max-h-[60vh] object-contain"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

            {/* Details */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-block px-3 py-1 ${getCategoryColor(selectedImage.category)} text-white text-sm font-semibold rounded-full capitalize mb-4`}>
                    {selectedImage.category}
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedImage.title}</h2>
                </div>
                <div className="text-right text-purple-300">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(selectedImage.created_at)}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-purple-200 leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;