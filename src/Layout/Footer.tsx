import React from "react";

import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { Link } from "react-router";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-white text-xl font-bold mb-4">BookByte</h2>
          <p className="text-sm">Your digital haven for books and knowledge.</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-white">
                Books
              </Link>
            </li>
            <li>
              <Link to="/books/add" className="hover:text-white">
                Add Book
              </Link>
            </li>
            <li>
              <Link to="/borrow-summary" className="hover:text-white">
                Borrow Summary
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">123 Library Lane, Knowledge City, 45678</p>
          <p className="text-sm mt-2">Email: support@bookbyte.com</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} BookByte. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
