"use client";

import { useState, useEffect } from "react";

const VERSES = [
  "JER.29.11",
  "PSA.23",
  "1COR.4.4-8",
  "PHP.4.13",
  "JHN.3.16",
  "ROM.8.28",
  "ISA.41.10",
  "PSA.46.1",
  "GAL.5.22-23",
  "HEB.11.1",
  "2TI.1.7",
  "1COR.10.13",
  "PRO.22.6",
  "ISA.40.31",
  "JOS.1.9",
  "HEB.12.2",
  "MAT.11.28",
  "ROM.10.9-10",
  "PHP.2.3-4",
  "MAT.5.43-44",
  "PHI.4:6-7",
  "ISA.53:5",
  "MAT.6:33",
  "ROM.12:2",
  "GAL.2:20",
];

export default function VerseOfTheDay() {
  const [reference, setReference] = useState<string | null>(null);
  const [verse, setVerse] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const cachedVerse = localStorage.getItem("verseOfTheDay");
    const cachedDate = localStorage.getItem("verseDate");

    // Check if a cached verse and if it's still valid (not older than a day)
    if (cachedVerse && cachedDate === today) {
      const { reference, text } = JSON.parse(cachedVerse);
      setReference(reference);
      setVerse(text);
      return;
    }

    const verseIndex = Math.floor(Math.random() * VERSES.length);
    const verseID = VERSES[verseIndex];

    const formattedVerseID = verseID.replace(".", "+").replace(".", ":");

    // Fetch verse content from the API
    const fetchVerse = async () => {
      try {
        const response = await fetch(
          `https://bible-api.com/${formattedVerseID}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: { reference: string; text: string } = await response.json();

        setReference(data?.reference);
        setVerse(data?.text);

        // Cache the verse of the day in local storage
        localStorage.setItem(
          "verseOfTheDay",
          JSON.stringify({ reference: data.reference, text: data.text }),
        );
        localStorage.setItem("verseDate", today); // Store today's date
      } catch (error) {
        console.error("Error fetching verse:", error);
      }
    };

    fetchVerse();
  }, []);

  return (
    <div className="bg-white p-6 mb-8 border-4 border-black shadow-[8px_8px_0_0_#000]">
      <p className="md:text-2xl mb-4">{verse}</p>
      <p className="text-right font-bold">{reference}</p>
    </div>
  );
}
