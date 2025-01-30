import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand Section */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold">THRM WEB3 JOBS</h2>
            <p className="text-sm">
              © 2025 THRM Digital Marketing Agency. All rights reserved.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Facebook Icon */}
            <a
              href="https://www.facebook.com/profile.php?id=61554950021351"
              className="hover:text-gray-400"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
              </svg>
            </a>

            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/thrm.digitalmarketing_agency/"
              className="hover:text-gray-400"
              aria-label="Instagram"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.345 3.608 1.32.975.976 1.258 2.243 1.32 3.609.058 1.265.07 1.645.07 4.849 0 3.204-.012 3.584-.07 4.85-.062 1.366-.345 2.633-1.32 3.608-.975.975-2.243 1.258-3.609 1.32-1.265.058-1.645.07-4.849.07-3.204 0-3.584-.012-4.85-.07-1.366-.062-2.633-.345-3.608-1.32-.975-.975-1.258-2.243-1.32-3.609-.058-1.265-.07-1.645-.07-4.849 0-3.204.012-3.584.07-4.85.062-1.366.345-2.633 1.32-3.608.975-.975 2.243-1.258 3.609-1.32C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.735 0 8.332.013 7.052.07 5.77.127 4.664.447 3.757 1.354 2.85 2.26 2.53 3.367 2.473 4.649.023 6.227.01 8.194 0 12s.013 5.773.07 7.052c.057 1.282.377 2.389 1.284 3.296.907.907 2.014 1.227 3.296 1.284C8.194 23.987 8.735 24 12 24s3.806-.013 5.052-.07c1.282-.057 2.389-.377 3.296-1.284.907-.907 1.227-2.014 1.284-3.296C23.987 17.806 24 17.265 24 12s-.013-3.806-.07-5.052c-.057-1.282-.377-2.389-1.284-3.296-.907-.907-2.014-1.227-3.296-1.284C15.806.013 15.265 0 12 0z" />
                <circle cx="12" cy="12" r="3.843" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
