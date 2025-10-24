"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, X } from "lucide-react";
import { Navigation } from "@/components/navigation";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (savedIds.length === 0) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    async function fetchFavorites() {
      try {
        const favoriteMeals = await Promise.all(
          savedIds.map(async (id: string) => {
            const res = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            const data = await res.json();
            return data.meals ? data.meals[0] : null;
          })
        );

        setFavorites(favoriteMeals.filter(Boolean));
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem(
      "favorites",
      JSON.stringify(updated.map((f) => f.idMeal))
    );
  };

  const closeModal = () => setSelectedRecipe(null);

  return (
    <div>
      <Navigation />
      <main className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          My Favorites
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading your favorite recipes...</p>
        ) : favorites.length === 0 ? (
          <p className="text-gray-600">
            You do not have any favorite recipes yet. Browse and add some!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
              >
                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="w-full text-left"
                >
                  <Image
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </button>

                <div className="p-4 flex justify-between items-center">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="font-semibold text-lg text-gray-800 hover:text-orange-600 transition"
                  >
                    {recipe.strMeal}
                  </button>
                  <button
                    onClick={() => removeFavorite(recipe.idMeal)}
                    className="text-gray-500 hover:text-red-500 transition"
                    aria-label="Remove favorite"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Recipe Details Modal */}
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
                  const measure =
                    selectedRecipe[`strMeasure${i + 1}`]?.trim();
                  return (
                    ingredient && (
                      <li key={i}>
                        {ingredient} — {measure}
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
