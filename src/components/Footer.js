import React from 'react';
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-10 bg-transparent border-t border-gray-300 py-5">
      <div className="container mx-auto text-center text-gray-600">
        {/* Company Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Ittechsolutionmaster Recruitment LLC</h2>
          <p className="text-sm text-gray-500">Empowering your IT career opportunities</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.facebook.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 transition-colors duration-300"
          >
            <FaFacebook className="text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
          >
            <FaTwitter className="text-2xl" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          <p>&copy; 2024 Ittechsolutionmaster Recruitment LLC. All rights reserved.</p>
          <p>Privacy Policy | Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
