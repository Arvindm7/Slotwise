"use client";
import React, { useState } from "react";
import Header from "@/app/_components/Header";
import { FaInstagram, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div>
      <Header />

      {/* Contact Us Hero Section */}
      <div className="relative w-full h-[500px]">
        <Image
          src="/contactus.jpg"
          layout="fill"
          objectFit="cover"
          alt="About Us Hero"
        />
      </div>

      {/* Contact Information */}
      <div className="px-5 py-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-semibold">Our Office</h3>
            <p className="mt-2">NIT Rourkela, Odisha, India</p>
            <p className="mt-2">Phone: +91 8249213489 </p>
            <p className="mt-2">Email: test.testpp124@gmail.com</p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/_arvind_04._/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={32} className="text-gray-600 hover:text-primary transition" />
              </a>
              <a href="https://www.linkedin.com/in/arabinda-malik-a9167b240/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={32} className="text-gray-600 hover:text-primary transition" />
              </a>
              <a href="https://www.facebook.com/arabinda.mallick.146/" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={32} className="text-gray-600 hover:text-primary transition" />
              </a>
              <a href="https://test.testpp124@gmail.com">
                <FaEnvelope size={32} className="text-gray-600 hover:text-primary transition" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="px-5 py-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Send Us Feedback</h2>

        {submitted ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-500">Thank you for your feedback!</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-lg font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md"
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md"
                placeholder="Your message"
                rows={5}
                required
              ></textarea>
            </div>

            <div className="text-center">
              <Button type="submit" className="px-6 py-3 bg-primary text-white rounded-md">
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Zoomed-in Location Section with Google Maps */}
      <div className="w-full h-[400px] md:h-[500px] mb-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7653.448656645221!2d84.90140310532048!3d22.25358562318496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2000d0f83eb315%3A0xdef2b1e960ff0b46!2sNational%20Institute%20Of%20Technology%2C%20Rourkela!5e0!3m2!1sen!2sin!4v1692365751608!5m2!1sen!2sin&zoom=15"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright Text */}
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Arabinda Malik . All Rights Reserved.
          </p>

          {/* Social Media Links in Footer */}
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
            <a href="https://arvindmalik824@gmail.com">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;
