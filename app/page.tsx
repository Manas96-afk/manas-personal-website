'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  ChevronDown,
  Code,
  Database,
  Car,
  Gamepad2,
  TrendingUp,
  MapPin,
  Film,
  MonitorPlay,
  Layers
} from 'lucide-react';
import dynamic from 'next/dynamic';

const AbstractSculpture = dynamic(() => import('@/components/AbstractSculpture'), {
  ssr: false,
});

const DigitalDragon = dynamic(() => import('@/components/DigitalDragon'), {
  ssr: false,
});

// --- Components ---

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={ref} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Transparent background to show 3D model */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />

      <motion.div
        style={{ y, opacity, scale }}
        className="z-10 text-center px-4 max-w-7xl mx-auto flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-zinc-400 uppercase tracking-widest backdrop-blur-sm">
            Identity: Manas Bandhu
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[18vw] sm:text-[15vw] md:text-[12vw] leading-[0.85] font-display font-bold tracking-tighter text-white mb-8 mix-blend-difference"
        >
          MANAS
          <span className="block text-zinc-600">BANDHU</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed text-balance"
        >
          A curious mind. A quiet observer. <br />
          <span className="text-white font-normal">A work-in-progress story.</span>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 z-10 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-600 to-transparent" />
      </motion.div>
    </section>
  );
}

function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center py-24 px-4 relative z-10">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm -z-10" />
      <motion.div
        style={{ opacity, y }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
              Creative, but not chaotic.
            </h3>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
              Born on 13 March 2006. Standing at 180 cm. <br />
              <span className="inline-flex items-center gap-2 my-2 py-1 px-3 bg-zinc-800/50 rounded-full border border-zinc-700/50 text-sm md:text-base hover:bg-zinc-800 transition-colors cursor-help group">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-zinc-200">Single since childhood</span>
                <span className="hidden sm:inline text-zinc-500 text-sm italic border-l border-zinc-700 pl-2 group-hover:text-zinc-400 transition-colors">
                  (0% Drama, 100% Uptime)
                </span>
              </span>
              <br />
              Manas is not trying to impress the internet — he’s documenting himself for it.
            </p>
            <div className="h-px w-24 bg-white/20" />
            <p className="text-lg text-zinc-300 italic font-serif">
              &ldquo;If you can see a dream with open eyes, it means it’s already half real.&rdquo;
            </p>
          </div>

          <div className="relative h-[400px] w-full bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 shadow-2xl group">
            {/* Abstract representation of "Building" */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-48 h-48 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Philosophy</p>
              <p className="text-white font-medium">He doesn’t rush to become “successful.” He prefers to understand things deeply.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function VisualStorytellingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/95 -z-10" />
      {/* Cinematic wide bars effect */}
      <div className="absolute top-0 left-0 w-full h-8 md:h-12 bg-black z-20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]" />
      <div className="absolute bottom-0 left-0 w-full h-8 md:h-12 bg-black z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]" />

      <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto relative z-10 py-12 md:py-16">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Film className="w-6 h-6 text-purple-500" />
              <h2 className="text-sm font-mono text-purple-500 uppercase tracking-widest">Cinematic Eye</h2>
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight">
              Visual <br />
              <span className="text-zinc-500 italic">Storytelling</span>
            </h3>
          </div>
          <p className="text-lg md:text-xl text-zinc-400 max-w-md border-l border-white/10 pl-6 py-2">
            More than just cutting clips. It's about rhythm, feeling, and making the audience connect. Every frame has a purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {/* Bento 1: Rhythm */}
          <div className="md:col-span-8 bg-zinc-900/40 rounded-3xl border border-white/5 p-6 md:p-10 relative group overflow-hidden flex flex-col justify-end transition-all duration-500 hover:bg-zinc-900/60">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md bg-white/5 group-hover:scale-110 transition-transform duration-500">
              <MonitorPlay className="w-5 h-5 text-white" />
            </div>
            <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">Editing Rhythm</h4>
              <p className="text-zinc-400 max-w-md text-sm md:text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                Matching beats with cuts. Building anticipation. Creating a seamless flow that keeps the viewer locked in from the first frame to the last.
              </p>
            </div>
          </div>

          {/* Bento 2: Color */}
          <div className="md:col-span-4 bg-zinc-900/40 rounded-3xl border border-white/5 p-6 md:p-10 relative group overflow-hidden flex flex-col justify-end transition-all duration-500 hover:bg-zinc-900/60">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="mb-6 md:mb-8">
                <Layers className="w-8 h-8 text-rose-400 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Color & Mood</h4>
              <p className="text-zinc-400 text-sm">Grading the visual tone to evoke the exact emotion needed for the scene.</p>
            </div>
          </div>

          {/* Bento 3: Tech Specs */}
          <div className="md:col-span-5 bg-zinc-900/40 rounded-3xl border border-white/5 p-6 md:p-10 relative group overflow-hidden flex items-center justify-center transition-all duration-500 hover:bg-zinc-900/60">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-center relative z-10 group-hover:scale-105 transition-transform duration-500">
              <span className="text-7xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">60</span>
              <span className="text-2xl text-white/40 font-bold ml-1">fps</span>
              <p className="text-blue-400 mt-4 font-mono text-xs uppercase tracking-[0.3em]">Buttery Smooth</p>
            </div>
          </div>

          {/* Bento 4: Canvas */}
          <div className="md:col-span-7 bg-zinc-900/40 rounded-3xl border border-white/5 p-6 md:p-10 relative group overflow-hidden flex flex-col justify-end transition-all duration-500 hover:bg-zinc-900/60 border-l border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Abstract timeline representation */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2/3 h-40 opacity-20 group-hover:opacity-40 transition-opacity duration-500 flex flex-col gap-3 p-6 mask-image-linear">
              <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden flex">
                <div className="w-1/3 h-full bg-indigo-500" />
                <div className="w-1/4 h-full bg-purple-500/50" />
                <div className="w-1/6 h-full bg-sky-500" />
              </div>
              <div className="w-[85%] h-4 bg-white/20 rounded-full" />
              <div className="w-[60%] h-4 bg-white/20 rounded-full" />
              <div className="w-[95%] h-10 bg-white/10 rounded-full mt-2 flex items-center px-2 gap-1 overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="w-1 h-1/2 bg-white/30 rounded-full" />
                ))}
              </div>
            </div>

            <div className="relative z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">The Narrative Canvas</h4>
              <p className="text-zinc-300 max-w-lg text-sm md:text-base leading-relaxed">
                The timeline is where raw clips become a story. It's where ideas take their final shape, and where emotions are carefully engineered, cut by cut, frame by frame.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function GamingSection() {
  return (
    <section className="py-32 px-4 relative">
      <div className="absolute inset-0 bg-black/90 -z-10" />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-1/3 md:sticky md:top-32 relative mb-8 md:mb-0">
            <div className="flex items-center gap-3 mb-6">
              <Gamepad2 className="w-6 h-6 text-emerald-500" />
              <h2 className="text-sm font-mono text-emerald-500 uppercase tracking-widest">Digital Playground</h2>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Strategy &<br />Reflexes
            </h3>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-8">
              Gaming isn’t escapism — it’s systems thinking. It influences how Manas approaches real-world problems: teamwork, strategy, and quick decisions.
            </p>

            <div className="flex flex-wrap gap-2">
              {["Valorant", "BGMI", "GTA V"].map((game) => (
                <span key={game} className="px-4 py-2 rounded-full border border-white/10 text-zinc-300 text-sm hover:bg-white/5 transition-colors cursor-default">
                  {game}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full md:w-2/3 grid grid-cols-1 gap-4">
            {/* Interactive Cards */}
            <div className="group relative h-56 md:h-64 bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/50 active:border-emerald-500/50 transition-colors duration-300 cursor-pointer">
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img
                  src="/gaming-competitive.jpg"
                  alt="Competitive Spirit"
                  className="w-full h-full object-cover opacity-50 md:opacity-40 grayscale group-hover:grayscale-0 group-active:grayscale-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20">
                <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Competitive Spirit</h4>
                <p className="text-sm md:text-base text-zinc-400">Pushing rank, analyzing meta, improving mechanics.</p>
              </div>
            </div>

            <div className="group relative h-56 md:h-64 bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/50 active:border-emerald-500/50 transition-colors duration-300 cursor-pointer">
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img
                  src="/gaming-openworld.jpg"
                  alt="Open World Exploration"
                  className="w-full h-full object-cover opacity-50 md:opacity-40 grayscale group-hover:grayscale-0 group-active:grayscale-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20">
                <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Open World Exploration</h4>
                <p className="text-sm md:text-base text-zinc-400">Finding details others miss in massive digital landscapes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataJourneySection() {
  return (
    <section className="py-32 px-4 border-y border-white/5 relative">
      <div className="absolute inset-0 bg-black/90 -z-10" />
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono mb-6">
          <TrendingUp className="w-3 h-3" />
          <span>CURRENT FOCUS</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">Data Analysis Journey</h2>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
          Not claiming mastery, not pretending expertise. Just understanding how data tells stories.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {[
          { icon: Code, title: "Python", desc: "Learning & experimenting with libraries.", progress: 60 },
          { icon: Database, title: "SQL", desc: "Building the foundation of queries.", progress: 45 },
          { icon: TrendingUp, title: "Excel", desc: "Practical usage for real insights.", progress: 80 },
        ].map((skill, i) => (
          <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 md:p-8 rounded-2xl hover:bg-zinc-900 transition-colors">
            <skill.icon className="w-8 h-8 md:w-10 md:h-10 text-blue-500 mb-6" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{skill.title}</h3>
            <p className="text-sm md:text-base text-zinc-400 mb-6 h-12">{skill.desc}</p>

            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.progress}%` }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="h-full bg-blue-500"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  const skills = [
    "Video Editing", "Visual Sense", "Editing Rhythm", "Storytelling", "Python", "SQL", "Excel", "Making Chai ☕"
  ];

  return (
    <section className="py-24 px-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-black/80 -z-10" />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-12 text-center">Skills Snapshot</h2>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              className="px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/10 bg-zinc-900/30 text-zinc-300 text-sm md:text-lg cursor-default backdrop-blur-sm"
            >
              {skill}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Technical</h3>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              Building the logic. Writing the code. Analyzing the numbers. The backbone of his professional growth.
            </p>
          </div>
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Creative & Human</h3>
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
              Visual sense. Editing rhythm. Storytelling. The soul that makes the logic relatable and impactful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="py-32 px-4 relative">
      <div className="absolute inset-0 bg-black/90 -z-10" />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-12 md:mb-16 text-center">Academic Timeline</h2>

        <div className="relative border-l border-white/10 ml-6 md:ml-0 space-y-12 md:space-y-16">
          <div className="relative pl-10 md:pl-24">
            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-white rounded-full ring-4 ring-black" />
            <span className="text-[10px] md:text-xs font-mono text-zinc-500 mb-2 block">2024 - 2027 (Expected)</span>
            <h3 className="text-xl md:text-2xl font-bold text-white">BCA</h3>
            <p className="text-base md:text-lg text-zinc-400 mb-1">University of Engineering & Management (UEM)</p>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <MapPin className="w-4 h-4" /> Jaipur, Rajasthan
            </div>
          </div>

          <div className="relative pl-12 md:pl-24">
            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-zinc-600 rounded-full ring-4 ring-black" />
            <span className="text-xs font-mono text-zinc-500 mb-2 block">Passed Out 2024</span>
            <h3 className="text-xl md:text-2xl font-bold text-white">Senior Secondary</h3>
            <p className="text-base md:text-lg text-zinc-400 mb-1">Mehta Public Sr. Sec. School</p>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <MapPin className="w-4 h-4" /> Jaipur, Rajasthan
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-500 italic">&ldquo;Education for him is not a finish line — it’s a framework.&rdquo;</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 md:py-24 px-4 bg-black border-t border-white/10" role="contentinfo">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 md:mb-8">
          Manas Bandhu
        </h2>
        <p className="text-base md:text-xl text-zinc-400 mb-10 md:mb-12 max-w-xl mx-auto px-4 md:px-0">
          This website is not a showcase — it’s a checkpoint. A place where his name lives online even while he’s still becoming the person behind it.
        </p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 md:mb-16">
          <a href="https://github.com/Manas96-afk" target="_blank" rel="noopener noreferrer" className="p-3 md:p-4 rounded-full bg-zinc-900 hover:bg-white hover:text-black transition-all duration-300" aria-label="GitHub Profile">
            <Github className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a href="https://www.instagram.com/manas_1303x/" target="_blank" rel="noopener noreferrer" className="p-3 md:p-4 rounded-full bg-zinc-900 hover:bg-white hover:text-black transition-all duration-300" aria-label="Instagram Profile">
            <Instagram className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a href="https://www.linkedin.com/in/manas-bandhu" target="_blank" rel="noopener noreferrer" className="p-3 md:p-4 rounded-full bg-zinc-900 hover:bg-white hover:text-black transition-all duration-300" aria-label="LinkedIn Profile">
            <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a href="https://x.com/manas_1303x" target="_blank" rel="noopener noreferrer" className="p-3 md:p-4 rounded-full bg-zinc-900 hover:bg-white hover:text-black transition-all duration-300" aria-label="Twitter Profile">
            <Twitter className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a href="https://www.youtube.com/@cnomo_editz" target="_blank" rel="noopener noreferrer" className="p-3 md:p-4 rounded-full bg-zinc-900 hover:bg-white hover:text-black transition-all duration-300" aria-label="YouTube Channel">
            <Youtube className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a href="mailto:mbandhu96@gmail.com" className="p-3 md:p-4 rounded-full bg-zinc-900 hover:bg-white hover:text-black transition-all duration-300" aria-label="Email Me">
            <Mail className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        </div>

        <div className="text-zinc-600 text-sm font-mono">
          &copy; {new Date().getFullYear()} Manas Bandhu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <header className="sr-only">
        <h1>Manas Bandhu | Creative Technologist & Data Analyst</h1>
      </header>
      <main className="bg-black min-h-screen text-white selection:bg-white/20 relative" role="main">
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <AbstractSculpture />
        </div>
        <div aria-hidden="true">
          <DigitalDragon />
        </div>
        <div className="relative z-10">
          <HeroSection />
          <PhilosophySection />
          <VisualStorytellingSection />
          <GamingSection />
          <DataJourneySection />
          <SkillsSection />
          <TimelineSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
