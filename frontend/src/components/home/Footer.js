import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container text-center">
        <p className="mb-2">© 2024 VLib. All rights reserved.</p>
        <a href="mailto:contact@vlib.com" className="text-white">
          contact@vlib.com
        </a>
        <div className="mt-2">
          <a href="https://facebook.com" className="text-white mx-2">
            Facebook
          </a>
          <a href="https://twitter.com" className="text-white mx-2">
            Twitter
          </a>
          <a href="https://instagram.com" className="text-white mx-2">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
