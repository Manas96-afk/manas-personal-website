'use client';

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
    const [isVisible, setIsVisible] = useState(true);
    const [phase, setPhase] = useState<'revving' | 'max' | 'logo'>('revving');

    // Use MotionValue to prevent React re-renders for the 60fps speedometer
    const speed = useMotionValue(0);
    const displaySpeed = useTransform(speed, (latest) => Math.round(latest));

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        // Animate the speed values purely in framer-motion
        const speedAnimation = animate(speed, 299, {
            duration: 1.4,
            ease: [0.25, 1, 0.5, 1] // Custom realistic rev up curve
        });

        const maxTimer = setTimeout(() => setPhase('max'), 1400); // Hit max speed at 1.4s
        const logoTimer = setTimeout(() => setPhase('logo'), 1800); // Blast into logo at 1.8s

        // Total duration: 3.5 seconds before fading out
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = '';
        }, 3500);

        return () => {
            speedAnimation.stop();
            clearTimeout(maxTimer);
            clearTimeout(logoTimer);
            clearTimeout(hideTimer);
            document.body.style.overflow = '';
        };
    }, [speed]);

    // Use derived hook for the stroke dash offset based on speed value
    const ringOffset = useTransform(speed, [0, 299], [283, 30]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    style={{ willChange: "opacity" }}
                >
                    <AnimatePresence mode="popLayout">
                        {(phase === 'revving' || phase === 'max') && (
                            <motion.div
                                key="tachometer"
                                className="relative flex flex-col items-center justify-center w-64 h-64"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={
                                    phase === 'max'
                                        ? { scale: 1.05, opacity: 1, x: [-3, 3, -3, 3, 0], y: [-3, 3, -3, 3, 0] }
                                        : { scale: 1, opacity: 1, x: 0, y: 0 }
                                }
                                exit={{ scale: 2.5, opacity: 0, filter: "blur(20px)" }}
                                transition={
                                    phase === 'max'
                                        ? { duration: 0.1, repeat: Infinity }
                                        : { duration: 0.4, ease: "easeOut" }
                                }
                                style={{ willChange: "transform, opacity, filter" }}
                            >
                                {/* Outer Ring */}
                                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        stroke="rgba(255,255,255,0.05)"
                                        strokeWidth="1.5"
                                        fill="none"
                                    />
                                    <motion.circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        stroke={phase === 'max' ? "#ef4444" : "#ffffff"}
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray="283"
                                        style={{ strokeDashoffset: phase === 'max' ? 30 : ringOffset, willChange: "stroke-dashoffset, stroke" }}
                                        transition={{ duration: 0.1 }}
                                        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    />
                                </svg>

                                {/* Speed Numbers */}
                                <div className="flex flex-col items-center justify-center z-10 will-change-transform">
                                    <motion.div className="text-white text-6xl font-display font-bold tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                                        {displaySpeed}
                                    </motion.div>
                                    <div className={`text-xs font-mono tracking-[0.4em] mt-1 ${phase === 'max' ? 'text-red-500 font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-zinc-500'}`}>
                                        KM/H
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {phase === 'logo' && (
                            <motion.div
                                key="logo"
                                className="absolute inset-0 flex flex-col items-center justify-center"
                                initial={{ opacity: 0, scale: 0.2, filter: "blur(30px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 1.2, type: "spring", bounce: 0.5, damping: 12 }}
                                style={{ willChange: "transform, opacity, filter" }}
                            >
                                {/* Intense Blast Behind Logo */}
                                <motion.div
                                    className="absolute inset-0 bg-white/20 rounded-full blur-[100px]"
                                    initial={{ opacity: 1, scale: 0.5 }}
                                    animate={{ opacity: 0, scale: 3 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    style={{ willChange: "transform, opacity" }}
                                />

                                <div className="relative w-32 h-32 md:w-44 md:h-44 flex items-center justify-center">
                                    <svg
                                        viewBox="0 0 100 100"
                                        className="w-full h-full drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] relative z-10"
                                        style={{ overflow: 'visible' }}
                                    >
                                        {/* Glowing Filled M shape */}
                                        <motion.path
                                            d="M 15 80 L 15 20 L 32.5 50 L 50 20 L 50 80"
                                            stroke="white"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="none"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                                            style={{ willChange: "stroke-dashoffset, opacity" }}
                                        />
                                        {/* Glowing Filled B shape */}
                                        <motion.path
                                            d="M 60 80 L 60 20 L 75 20 C 85 20 88 25 88 35 C 88 45 85 50 75 50 L 60 50 M 75 50 C 88 50 92 56 92 65 C 92 75 88 80 75 80 L 60 80"
                                            stroke="white"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="none"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
                                            style={{ willChange: "stroke-dashoffset, opacity" }}
                                        />
                                    </svg>
                                </div>

                                <motion.div
                                    className="mt-8 flex items-center gap-3"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    style={{ willChange: "transform, opacity" }}
                                >
                                    <span className="text-[10px] md:text-sm font-mono text-zinc-300 tracking-[0.6em] uppercase">
                                        MANAS BANDHU
                                    </span>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
