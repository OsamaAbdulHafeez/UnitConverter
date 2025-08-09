import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calculator } from "lucide-react";

const Footer = () => {
  const categoryIcons = {
    length: "📏",
    weight: "⚖️",
    temperature: "🌡️",
    area: "📐",
    volume: "🧪",
    time: "⏰",
  };
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Universal Converter</h3>
            </div>
            <p className="text-gray-300 text-lg mb-6 max-w-md">
              The most comprehensive and user-friendly unit conversion tool on
              the web. Convert between hundreds of units across multiple
              categories with precision and ease.
            </p>
            <div className="flex space-x-4">
              <Badge
                variant="secondary"
                className="bg-blue-500/20 text-blue-300 border-blue-500/30"
              >
                6 Categories
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-300 border-green-500/30"
              >
                50+ Units
              </Badge>
              <Badge
                variant="secondary"
                className="bg-purple-500/20 text-purple-300 border-purple-500/30"
              >
                100% Free
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  All Converters
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-3 text-gray-300">
              {Object.keys(categoryIcons).map((category) => (
                <li key={category} className="flex items-center space-x-2">
                  <span>{categoryIcons[category]}</span>
                  <span className="capitalize hover:text-white transition-colors cursor-pointer">
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Universal Unit Converter. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
