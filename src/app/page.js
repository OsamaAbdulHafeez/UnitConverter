"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Conversion data
const conversionFactors = {
  length: {
    mm: 1,
    cm: 10,
    m: 1000,
    km: 1000000,
    in: 25.4,
    ft: 304.8,
    yd: 914.4,
    mi: 1609344,
  },
  weight: {
    mg: 1,
    g: 1000,
    kg: 1000000,
    t: 1000000000,
    oz: 28349.5,
    lb: 453592,
    st: 6350290,
  },
  temperature: null,
  area: {
    mm2: 1,
    cm2: 100,
    m2: 1000000,
    km2: 1e12,
    ha: 1e10,
    in2: 645.16,
    ft2: 92903,
    yd2: 836127,
    ac: 4046856422.4,
    mi2: 2.589988110336e12,
  },
  volume: {
    ml: 1,
    l: 1000,
    m3: 1000000,
    gal: 3785.41,
    qt: 946.353,
    pt: 473.176,
    cup: 236.588,
    "fl-oz": 29.5735,
    tbsp: 14.7868,
    tsp: 4.92892,
    in3: 16.3871,
    ft3: 28316.8,
    yd3: 764555,
  },
  time: {
    ms: 1,
    s: 1000,
    min: 60000,
    h: 3600000,
    d: 86400000,
    wk: 604800000,
    mo: 2629746000,
    y: 31556952000,
  },
};

const temperatureConvert = {
  c: { c: (v) => v, f: (v) => (v * 9) / 5 + 32, k: (v) => v + 273.15 },
  f: {
    c: (v) => ((v - 32) * 5) / 9,
    f: (v) => v,
    k: (v) => ((v - 32) * 5) / 9 + 273.15,
  },
  k: {
    c: (v) => v - 273.15,
    f: (v) => ((v - 273.15) * 9) / 5 + 32,
    k: (v) => v,
  },
};

const unitOptions = {
  length: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
  weight: ["mg", "g", "kg", "t", "oz", "lb", "st"],
  temperature: ["c", "f", "k"],
  area: ["mm2", "cm2", "m2", "km2", "ha", "in2", "ft2", "yd2", "ac", "mi2"],
  volume: [
    "ml",
    "l",
    "m3",
    "gal",
    "qt",
    "pt",
    "cup",
    "fl-oz",
    "tbsp",
    "tsp",
    "in3",
    "ft3",
    "yd3",
  ],
  time: ["ms", "s", "min", "h", "d", "wk", "mo", "y"],
};

const categoryIcons = {
  length: "📏",
  weight: "⚖️",
  temperature: "🌡️",
  area: "📐",
  volume: "🧪",
  time: "⏰",
};

const categoryColors = {
  length: "from-blue-500 to-cyan-500",
  weight: "from-green-500 to-emerald-500",
  temperature: "from-red-500 to-orange-500",
  area: "from-purple-500 to-pink-500",
  volume: "from-indigo-500 to-blue-500",
  time: "from-yellow-500 to-amber-500",
};

export default function UnitConverter() {
  const [activeCategory, setActiveCategory] = useState("length");
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");
  const [result, setResult] = useState("");

  useEffect(() => {
    const units = unitOptions[activeCategory];
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  }, [activeCategory]);

  useEffect(() => {
    updateConversion();
  }, [value, fromUnit, toUnit, activeCategory]);

  const updateConversion = () => {
    const val = parseFloat(value) || 0;
    let convertedResult;

    if (activeCategory === "temperature") {
      // const tempConvert = temperatureConvert;
      if (!temperatureConvert[fromUnit] || !temperatureConvert[fromUnit][toUnit]) {
      setResult("Invalid unit selection");
      return;
      }
      convertedResult = temperatureConvert[fromUnit][toUnit](val);
    } else {
      const factors = conversionFactors[activeCategory];
      convertedResult = (val * factors[fromUnit]) / factors[toUnit];
    }

    const formattedResult = Math.round(convertedResult * 100000) / 100000;
    setResult(`${val} ${fromUnit} = ${formattedResult} ${toUnit}`);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen sm:px-6 lg:px-8">
        {/* Top Ad Space */}
        <div className="h-16 sm:h-20 md:h-24 mb-4 bg-transparent"></div>

        <div className="flex">
          {/* Left Ad Space */}
          <div className="w-4 sm:w-6 md:w-12 lg:w-24 bg-transparent"></div>

          <main className="max-w-6xl mx-auto sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Universal Unit Converter
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Convert between various units of measurement with precision and
                ease. Fast, accurate, and completely free.
              </p>
            </div>

            {/* Category Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Choose Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.keys(unitOptions).map((category) => (
                  <Button
                    key={category}
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    className={`h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-300 ${
                      activeCategory === category
                        ? `bg-gradient-to-r ${categoryColors[category]} text-white shadow-lg scale-105`
                        : "hover:scale-105 hover:shadow-md"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    <span className="text-2xl">{categoryIcons[category]}</span>
                    <span className="text-sm font-medium capitalize">
                      {category}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Converter Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center space-x-2">
                  <span className="text-3xl">
                    {categoryIcons[activeCategory]}
                  </span>
                  <span className="capitalize">{activeCategory} Converter</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>Value</span>
                    </label>
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="h-12 text-lg font-medium border-2 focus:border-blue-500 transition-colors"
                      placeholder="Enter value"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                        <span>From Unit</span>
                      </label>
                      <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger className="!h-12 text-lg border-2 focus:border-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {unitOptions[activeCategory].map((unit) => (
                            <SelectItem
                              key={unit}
                              value={unit}
                              className="text-lg"
                            >
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                        To Unit
                      </label>
                      <Select value={toUnit} onValueChange={setToUnit}>
                        <SelectTrigger className="!h-12 text-lg border-2 focus:border-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {unitOptions[activeCategory].map((unit) => (
                            <SelectItem
                              key={unit}
                              value={unit}
                              className="text-lg"
                            >
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={swapUnits}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <ArrowLeftRight className="w-5 h-5 mr-2" />
                    Swap Units
                  </Button>
                </div>

                {/* Result */}
                <div className="text-center">
                  <div
                    className={`bg-gradient-to-r ${categoryColors[activeCategory]} p-6 rounded-2xl shadow-lg`}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Conversion Result
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-800 break-all">
                        {result || "Enter a value to see the result"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"></div>
          </main>

          <div className="w-4 sm:w-6 md:w-12 lg:w-24 bg-transparent"></div>
        </div>

        {/* Bottom Ad Space */}
        <div className="h-16 sm:h-20 md:h-24 mt-4 bg-transparent"></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
