import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About YOGE'S KART</h3>
            <p>Your one-stop online shopping destination for quality products and great deals.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p>Email: support@yogeskart.com</p>
            <p>Phone: +1-800-123-4567</p>
            <p>Address: 123 Shopping St, Commerce City</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 YOGE'S KART. All rights reserved. College Project</p>
        </div>
      </div>
    </footer>
  );
}
