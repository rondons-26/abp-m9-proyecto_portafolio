import { useState, useEffect } from 'react';

export const useTypingEffect = (phrases = [], typingSpeedDefault = 150) => {
    const [currentPhrase, setCurrentPhrase] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(typingSpeedDefault);

    useEffect(() => {
        if (!phrases.length) return;

        const handleTyping = () => {
            const fullPhrase = phrases[phraseIndex];

            if (isDeleting) {
                setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length - 1));
                setTypingSpeed(50);
            } else {
                setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && currentPhrase === fullPhrase) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && currentPhrase === '') {
                setIsDeleting(false);
                setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentPhrase, isDeleting, phraseIndex, typingSpeed, phrases]);

    return currentPhrase;
};