import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Info, Users, Code2, BookOpenCheck } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const About = () => {
  return (
    <div className="w-full bg-gray-900 text-gray-100 pt-20 px-6 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Section: About StudyLive */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-3">
            About StudyLive
          </h1>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              '🎯 Study Rooms with Pomodoro-style timers',
              '🧑‍🤝‍🧑 Friend System for collaborative focus',
              '📝 Whiteboard for real-time visual problem solving',
              '🎥 Video Conferencing via 100ms',
              '💬 Real-time Chat (DMs & Groups)',
              '🧠 AI Summary using Gemini API after each session',
              '🗃 Session history & media stored with PostgreSQL & Cloudinary',
            ].map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl shadow transition"
              >
                <p className="text-base text-gray-300">{feature}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-lg text-gray-300">
            <span className="font-semibold text-white">StudyLive</span> aims to eliminate the isolation of online learning and bring back motivation, collaboration, and routine to your study sessions.
          </p>
        </motion.div>

        {/* Section: Developer Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-3">
            About the Developer
          </h2>
          <motion.div className="bg-gray-800 rounded-xl p-6 shadow-md space-y-4 hover:bg-gray-700 transition">
            <div className="flex items-center gap-3 text-blue-300 text-lg font-semibold">
              <Info size={20} /> Yash Sinha
            </div>
            <p className="text-gray-300">
              I'm a passionate <strong>full-stack developer</strong> focused on building meaningful and collaborative tools for learners.
            </p>
            <p className="text-gray-300">
              <span className="text-white font-semibold">Tech Interests:</span> real-time systems, performance, productivity tools, and educational tech.
            </p>
            <p className="text-gray-300">
              <span className="text-white font-semibold">Tech Stack:</span> React, Tailwind CSS, Recoil, WebSockets, PostgreSQL, Express, Cloudinary, 100ms, Gemini API, and more.
            </p>
            <p className="text-gray-300">
              I believe in <span className="text-white font-semibold">learning by building</span> and love turning ideas into functional experiences.
            </p>
          </motion.div>
        </motion.div>

        {/* Section: Contact Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-3">
            Contact
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div className="bg-gray-800 p-5 rounded-xl flex items-center gap-4 hover:bg-gray-700 transition">
              <Mail size={24} className="text-blue-400" />
              <div>
                <p className="text-white font-medium">Email</p>
                <p className="text-gray-300">vyash382@gmail.com</p>
              </div>
            </motion.div>
            <motion.div className="bg-gray-800 p-5 rounded-xl flex items-center gap-4 hover:bg-gray-700 transition">
              <Github size={24} className="text-blue-400" />
              <div>
                <p className="text-white font-medium">GitHub</p>
                <a
                  href="https://github.com/vyash382"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  github.com/vyash382
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
