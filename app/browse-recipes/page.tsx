"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Search, X } from "lucide-react";
import { Navigation } from "@/components/navigation";

export default function BrowseRecipesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Load favorites on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
    fetchRecipes("");
  }, []);

  // Fetch recipes by search term
  async function fetchRecipes(term: string) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecipes(searchTerm.trim() || "");
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Modal close handler
  const closeModal = () => setSelectedRecipe(null);

  return (
    <div>
         <Navigation />
    <main className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Browse Recipes
      </h1>
      <p className="text-gray-600 mb-8">
        Search for your favorite meals and discover how to make them.
      </p>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center max-w-md mb-10 mx-auto border border-green-300 rounded-full overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search recipes (e.g. pasta, beef, rice)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 outline-none"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 transition"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-500">Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-500">
          No recipes found. Try a different keyword.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {recipe.strMeal}
                  </h3>
                  <button
                    onClick={() => toggleFavorite(recipe.idMeal)}
                    className="text-orange-600 hover:scale-110 transition-transform"
                    aria-label="Add to favorites"
                  >
                    <Heart
                      fill={favorites.includes(recipe.idMeal) ? "red" : "none"}
                      className="w-5 h-5"
                    />
                  </button>
                </div>

                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="mt-3 text-sm text-green-600 hover:underline font-medium"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-6 relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            <Image
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              width={600}
              height={400}
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold text-orange-600 mb-2">
              {selectedRecipe.strMeal}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedRecipe.strCategory} • {selectedRecipe.strArea}
            </p>
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <p className="text-gray-700 text-sm whitespace-pre-line mb-4">
              {selectedRecipe.strInstructions}
            </p>

            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient =
                  selectedRecipe[`strIngredient${i + 1}`]?.trim();
                const measure = selectedRecipe[`strMeasure${i + 1}`]?.trim();
                return (
                  ingredient && (
                    <li key={i}>
                      {ingredient} — {measure}
                    </li>
                  )
                );
              })}
            </ul>
           <div className="flex items-center justify-center  bg-white">
            <button
              onClick={() => toggleFavorite(selectedRecipe.idMeal)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200
                ${
                  favorites.includes(selectedRecipe.idMeal)
                    ? "bg-amber-700 text-white hover:bg-amber-800"
                    : "bg-amber-50 text-orange-600 border border-amber-200 hover:bg-amber-700 hover:text-white"
                }`}
              aria-label={
                favorites.includes(selectedRecipe.idMeal)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              {favorites.includes(selectedRecipe.idMeal)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>

          </div>
        </div>
      )}
    </main>
    </div>
  );
}
