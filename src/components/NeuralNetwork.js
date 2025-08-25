import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NeuralNetwork = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = dimensions;
    
    canvas.width = width;
    canvas.height = height;

    // Neural network structure
    const layers = [
      { nodes: 4, x: 50 },
      { nodes: 6, x: 150 },
      { nodes: 6, x: 250 },
      { nodes: 3, x: 350 }
    ];

    // Calculate node positions
    const nodePositions = layers.map(layer => {
      const spacing = height / (layer.nodes + 1);
      return Array.from({ length: layer.nodes }, (_, i) => ({
        x: layer.x,
        y: spacing * (i + 1)
      }));
    });

    // Animation variables
    let animationId;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections
      ctx.strokeStyle = '#9333ea';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = nodePositions[i];
        const nextLayer = nodePositions[i + 1];
        
        currentLayer.forEach(node1 => {
          nextLayer.forEach(node2 => {
            const opacity = 0.3 + 0.3 * Math.sin(time * 0.01 + node1.x * 0.01 + node2.y * 0.01);
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.stroke();
          });
        });
      }
      
      // Draw nodes
      nodePositions.forEach((layer, layerIndex) => {
        layer.forEach((node, nodeIndex) => {
          const pulseIntensity = Math.sin(time * 0.02 + layerIndex * 0.5 + nodeIndex * 0.3);
          const radius = 8 + pulseIntensity * 3;
          const opacity = 0.7 + pulseIntensity * 0.3;
          
          ctx.globalAlpha = opacity;
          ctx.fillStyle = `hsl(${270 + pulseIntensity * 30}, 70%, 60%)`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fill();
          
          // Glow effect
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = `hsl(${270 + pulseIntensity * 30}, 70%, 80%)`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 5, 0, Math.PI * 2);
          ctx.fill();
        });
      });
      
      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [dimensions]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className={`relative ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg border border-purple-500/30"
        style={{ background: 'rgba(88, 28, 135, 0.1)' }}
      />
    </motion.div>
  );
};

export default NeuralNetwork;