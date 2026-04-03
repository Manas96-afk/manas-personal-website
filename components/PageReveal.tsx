'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function PageReveal({ children }: { children: React.ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Wait for the loading screen logo animation to finish
        // Logo traces for 2s, stays for 1s. Total time roughly 3.5s
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="min-h-screen"
        >
            {children}
        </motion.div>
    );
}
