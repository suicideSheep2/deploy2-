import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book } from 'lucide-react';

const bookQuotes = [
  { text: "A room without books is like a body without a soul.", author: "Cicero" },
  { text: "The person who deserves most pity is a lonesome ..", author: "Benjamin Franklin" },
  { text: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" }
];

const RefinedHeading: React.FC<{ userName?: string }> = ({ userName }) => {
  const [currentQuote, setCurrentQuote] = useState(bookQuotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prevQuote) => {
        const nextIndex = (bookQuotes.indexOf(prevQuote) + 1) % bookQuotes.length;
        return bookQuotes[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mt-auto">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4">
      <span className="font-semibold relative">
        <span className="bg-gradient-to-r from-[#ffffff] to-[#abbaab] bg-clip-text text-transparent">
          Bookshelf
        </span>
        <motion.span
          className="absolute bottom-0 left-0 w-full h-1"
          style={{ background: 'linear-gradient(to right, #ffffff, #abbaab)' }} // Updated gradient
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </span>
      </h1>
      <p className="text-xl text-gray-500 mb-6">
        {userName ? `Welcome back, ${userName}` : 'Discover your literary journey'}
      </p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center text-gray-600"
      >
        <Book className="mr-2" size={20} />
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuote.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-sm italic max-w-md"
          >
            "{currentQuote.text}" - {currentQuote.author}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RefinedHeading;