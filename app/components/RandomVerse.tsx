"use client";

import { useState, useEffect } from "react";
import { verses } from "@/data/verses";

export default function RandomVerse() {
  const [verse, setVerse] = useState(verses[0]);
  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * verses.length),
  );

  const handleRandomize = () => {
    setRandomIndex(Math.floor(Math.random() * verses.length));
  };

  useEffect(() => {
    setVerse(verses[randomIndex]);
  }, [randomIndex]);

  return (
    <div className="mb-8 bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000]">
      <h2 className="text-2xl font-bold mb-4">Random Verse</h2>
      <p className="md:text-xl mb-4">{verse.text}</p>
      <p className="text-right font-bold">{verse.reference}</p>
      <div className="mt-8 flex items-center justify-center">
        <button
          className="bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors duration-300"
          onClick={handleRandomize}
        >
          Randomize
        </button>
      </div>
    </div>
  );
}
