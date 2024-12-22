"use client";

import { useState, useEffect } from "react";
import { verses } from "@/data/verses";

export default function EncouragingVerse() {
  const [verse, setVerse] = useState(verses[0]);

  useEffect(() => {
    const encouragingVerses = verses.filter(
      (v) => v.category === "Strength" || v.category === "Courage",
    );
    const randomIndex = Math.floor(Math.random() * encouragingVerses.length);
    setVerse(encouragingVerses[randomIndex]);
  }, []);

  return (
    <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000]">
      <h2 className="text-2xl font-bold mb-4">Encouraging Verse</h2>
      <p className="md:text-xl mb-4">{verse.text}</p>
      <p className="text-right font-bold">{verse.reference}</p>
    </div>
  );
}
