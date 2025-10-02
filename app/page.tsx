import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { RecipeGrid } from "@/components/recipe-grid";
import { SearchForm } from "@/components/search-form";
import { HeartIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f1f1ef] to-white">
      <Navigation />
      <div className="container px-4 py-8 mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HeartIcon className="h-8 w-8 text-[#D32F2F]" />
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Recipe Finder
            </h1>
            <HeartIcon className="h-8 w-8 text-[#D32F2F]" />
          </div>
          <p className="text-lg text-gray-900 max-w-2xl mx-auto">
            Discover delicious recipes based on ingredients you have,
            dietary preferences, and more!
          </p>
        </header>

        <SearchForm />

        <div className="mt-12">
          <RecipeGrid />
        </div>
      </div>

      <div>
        <Footer />
      </div>

      <footer />
    </main>
  );
}
