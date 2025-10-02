import { ChefHat, Home, Utensils, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="bg-[#f1f1ef] backdrop-blur-md shadow-lg border-b border-green-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
              Recipe Finder
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>

            <Link
              href="/ai-recipe-generator"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              <Sparkles className="h-4 w-4" />
              AI Recipe Generator
            </Link>

            <Link
              href="/browse-recipes"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              <BookOpen className="h-4 w-4" />
              Browse Recipes
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              <Utensils className="h-4 w-4" />
              My Favorites
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-orange-100 transition-colors">
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className="block w-4 h-0.5 bg-green-700 mb-1"></span>
              <span className="block w-4 h-0.5 bg-green-700 mb-1"></span>
              <span className="block w-4 h-0.5 bg-green-700"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden border-t border-green-200 py-4 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            href="/ai-recipe-generator"
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
          >
            <Sparkles className="h-4 w-4" />
            AI Recipe Generator
          </Link>

          <Link
            href="/browse-recipes"
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
          >
            <BookOpen className="h-4 w-4" />
            Browse Recipes
          </Link>

          <Link
            href="/favorites"
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
          >
            <Utensils className="h-4 w-4" />
            My Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}
