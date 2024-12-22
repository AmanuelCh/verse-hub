import Link from "next/link";
import { categories } from "@/data/verses";

export default function Categories() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link href={`/category/${category.toLowerCase()}`} key={category}>
            <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold">{category}</h3>
              <div className="mt-4 w-12 h-1 bg-black"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
