"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/app/_components/Header";
import { FaInstagram, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

// Sample animations for scroll reveal
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function About() {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div className="relative w-full h-[500px]">
        <Image
          src="/about.jpg"
          layout="fill"
          objectFit="cover"
          alt="About Us Hero"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          
        </div> */}
      </div>

      {/* About Content with Animation */}
      <div className="px-5 py-10 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-4">
            We strive to create the best possible solutions for our users, with
            a focus on innovation, sustainability, and long-term impact.
            We provide an all-in-one platform to create, schedule, and organize meetings effortlessly. Experience seamless coordination and communication with our intuitive tools.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <Image src="/feature1.jpg" width={300} height={200} alt="Feature 1" />
            <h3 className="text-xl font-semibold mt-4">Create Meeting</h3>
            <p className="mt-2 text-center">
            Easily create meetings with just a few clicks and invite participants directly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <Image src="/feature2.jpg" width={300} height={200} alt="Feature 2" />
            <h3 className="text-xl font-semibold mt-4">Schedule Meeting</h3>
            <p className="mt-2 text-center">
            Pick the perfect time with integrated calendar options and mark whenever you are free.</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <Image src="/feature3.jpg" width={300} height={200} alt="Feature 3" />
            <h3 className="text-xl font-semibold mt-4">Organize Meeting</h3>
            <p className="mt-2 text-center">
            Manage all your meetings in one place, ensuring smooth coordination and communication.</p>
          </div>
        </motion.div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright Text */}
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Arabinda Malik . All Rights Reserved.
          </p>

          {/* Social Media Links */}
          <div className="flex gap-6">
            <a href="https://www.instagram.com/_arvind_04._/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/arabinda-malik-a9167b240/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.facebook.com/arabinda.mallick.146/" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </a>
            <a href="https://test.testpp124@gmail.com">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;
