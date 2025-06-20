import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Invitation from '../components/RoomMembers/Invititation';
import { tr } from 'framer-motion/client';

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const About = () => {
    
  return (

    <div className="w-full bg-gray-900 text-gray-100 pt-20 px-4 pb-16">
      
      <div className=" mx-auto w-full space-y-24">

        {/* About StudyLive Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4 border-b border-gray-700 pb-2 transition-all duration-500">
            About StudyLive
          </h1>
          <p className="text-lg leading-relaxed text-gray-300 transition-opacity duration-300 hover:opacity-90">
            <strong>StudyLive</strong> is a real-time collaborative study platform created to empower students and learners to stay focused, engaged, and connected. It helps people build consistent study habits using features like:
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-300">
            {[
              '🎯 Study Rooms with Pomodoro-style timers',
              '🧑‍🤝‍🧑 Friend System to send/accept requests and study together',
              '📝 Collaborative Whiteboard to solve problems visually',
              '🎥 Video Conferencing via 100ms integration',
              '💬 Chat: one-on-one & group messaging with notifications',
              '🧠 AI-Powered Summary after each session using Gemini API',
              '🗃 Session History & Media saved securely with PostgreSQL and Cloudinary',
            ].map((item, idx) => (
              <motion.li
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="hover:text-blue-300 transition-colors duration-300"
              >
                <strong>{item}</strong>
              </motion.li>
            ))}
          </ul>
          <p className="mt-4 text-lg text-gray-300">
            StudyLive aims to eliminate isolation from online learning and bring collaboration, discipline, and fun to remote study.
          </p>
        </motion.section>

        {/* About Developer Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4 border-b border-gray-700 pb-2">
            About the Developer
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            I'm <strong>Yash Sinha</strong>, a full-stack developer. With a strong foundation in both programming and analytical thinking, I enjoy building meaningful applications that solve real-world problems.
          </p>
          <p className="mt-4 text-lg text-gray-300">
            <span className="font-semibold text-white">Technical interests:</span> Real-time systems, collaborative tools, performance optimization, and educational tech.
          </p>
          <p className="mt-4 text-lg text-gray-300">
            <span className="font-semibold text-white">Tech stack used in StudyLive:</span> React, Tailwind CSS, Recoil, WebSockets, 100ms, PostgreSQL, Express, Cloudinary, Multer, Gemini API, and more.
          </p>
          <p className="mt-4 text-lg text-gray-300">
            I believe in learning by building. My vision with StudyLive is to help learners feel connected, motivated, and effective—especially when self-studying.
          </p>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4 border-b border-gray-700 pb-2">
            Contact
          </h2>
          <p className="text-lg text-gray-300">
            Want to collaborate or give feedback? Feel free to reach out via email or connect on GitHub.
          </p>
          <div className="mt-4 space-y-2 text-gray-300">
            <p>
              <span className="font-medium text-white">Email:</span>{' '}
              <span className="transition-all hover:text-blue-400">yashsinha382@gmail.com</span>
            </p>
            <p>
              <span className="font-medium text-white">GitHub:</span>{' '}
              <a
                href="https://github.com/yashsinha129"
                className="text-blue-400 hover:underline transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/yashsinha129
              </a>
            </p>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default About;
