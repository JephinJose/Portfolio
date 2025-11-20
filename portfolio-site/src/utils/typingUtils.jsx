import React, { useState, useEffect } from 'react';
import { Pinwheel } from 'ldrs/react';
import 'ldrs/react/Pinwheel.css'

export const WordTypingEffect = ({ text, speed = 300 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + ' ' + text[index]);
        setIndex(index + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return <div>{displayedText}</div>;
};

export const ChatMessageWithLoading = ({ text, delay}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <>
      {isLoading ? (
        <Pinwheel size={20} speed={0.9} stroke={5} color='black' />
      ) : (
        <WordTypingEffect text={text} speed={90} />
      )}
    </>
  );
};