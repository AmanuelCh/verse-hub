import EncouragingVerse from "./components/EncouragingVerse";
import Categories from "./components/Categories";
import VerseOfTheDay from "./components/VerseOfTheDay";
import RandomVerse from "./components/RandomVerse";

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>

      <div className="min-h-screen p-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Verse of the Day
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <main className="flex-grow md:w-3/4">
            <VerseOfTheDay />
            <Categories />
          </main>
          <aside className="w-full md:w-1/3">
            <RandomVerse />
            <EncouragingVerse />
          </aside>
        </div>
      </div>
    </>
  );
}
