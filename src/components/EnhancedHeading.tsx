import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Bookmark, Star, Heart } from 'lucide-react';

const bookQuotes = [
  { text: "A room without books is like a body without a soul.", author: "Cicero" },
  { text: "The person who deserves most pity is a lonesome one on a rainy day who doesn't know how to read.", author: "Benjamin Franklin" },
  { text: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" }
];

const iconComponents = [Book, Bookmark, Star, Heart];

const EnhancedHeading = () => {
  const [currentQuote, setCurrentQuote] = useState(bookQuotes[0]);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    const intervalDuration = 7000; // Total duration for one cycle

    const interval = setInterval(() => {
      // Show icon
      setShowIcon(true);

      // After 2 seconds, hide icon and show quote
      setTimeout(() => {
        setShowIcon(false);
      }, 2000);

      // Update icon and quote for next cycle
      setCurrentIcon((prevIcon) => (prevIcon + 1) % iconComponents.length);
      setCurrentQuote((prevQuote) => {
        const nextIndex = (bookQuotes.indexOf(prevQuote) + 1) % bookQuotes.length;
        return bookQuotes[nextIndex];
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  const IconComponent = iconComponents[currentIcon];

  return (
    <div className="text-center mb-12 relative">
      <div className="h-32 mb-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {showIcon ? (
            <motion.div
              key="icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <IconComponent size={20} className="text-green-600" />
            </motion.div>
          ) : (
            <motion.div
              key="quote"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-md px-4"
            >
              <p className="text-muted-foreground mb-1 text-sm italic">"{currentQuote.text}"</p>
              <p className="text-xs text-green-600">- {currentQuote.author}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight relative"
      >
        <span className="bg-gradient-to-r from-black via-green-800 to-green-600 inline-block text-transparent bg-clip-text">
          Literary Odyssey
        </span>
        {/* we're gona add a bit of text here fs */}
        {/* make it kinda fit well */}
        <div className='text-sm'>
        <p >Discover your favourites</p>
        </div>
      </motion.h1>
      
      
    </div>
  );
};

export default EnhancedHeading;