"use client"
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Sparkles, Plus, X, ChefHat, Clock, Users } from "lucide-react";
import { useState } from "react";

export default function AIRecipeGenerator() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [servings, setServings] = useState(4);
  const [cookingTime, setCookingTime] = useState("30");
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const toggleDietaryPreference = (preference: string) => {
    if (dietaryPreferences.includes(preference)) {
      setDietaryPreferences(dietaryPreferences.filter(item => item !== preference));
    } else {
      setDietaryPreferences([...dietaryPreferences, preference]);
    }
  };

  const generateRecipe = async () => {
    setIsGenerating(true);
    
    // Simulate AI recipe generation (replace with actual AI API call)
    setTimeout(() => {
      setGeneratedRecipe({
        name: "Mediterranean Pasta Delight",
        description: "A delicious pasta dish with fresh vegetables and herbs",
        ingredients: ingredients.map(ing => `1 cup ${ing}`),
        instructions: [
          "Heat olive oil in a large pan over medium heat",
          "Add garlic and onions, sauté until fragrant",
          "Add remaining vegetables and cook until tender",
          "Toss with cooked pasta and fresh herbs",
          "Season with salt, pepper, and serve hot"
        ],
        cookTime: cookingTime,
        servings: servings,
        difficulty: "Medium"
      });
      setIsGenerating(false);
    }, 3000);
  };

  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f1f1ef] to-white">
      <Navigation />
      
      <main className="pb-8">
        <div className="container px-4 py-8 mx-auto max-w-4xl">
          <header className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-8 w-8 text-gray-700" />
              <h1 className="text-4xl font-bold text-gray-700 tracking-tight">AI Recipe Generator</h1>
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Tell us what ingredients you have, and our AI will create a personalized recipe just for you!
            </p>
          </header>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-green-200">
            {/* Ingredients Input */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">What ingredients do you have?</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                  placeholder="Enter an ingredient..."
                  className="flex-1 px-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={addIngredient}
                  className="bg-gray-700 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
              
              {/* Ingredients List */}
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-gray-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                  >
                    {ingredient}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-green-900"
                      onClick={() => removeIngredient(ingredient)}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Dietary Preferences</h2>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleDietaryPreference(option)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      dietaryPreferences.includes(option)
                        ? 'bg-green-600 text-gray'
                        : 'bg-gray-200 text-gray-700 hover:bg-purple-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-green-700 font-medium mb-2">
                  <Users className="h-4 w-4 inline mr-1" />
                  Number of Servings
                </label>
                <select
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {[1, 2, 3, 4, 5, 6, 8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-green-700 font-medium mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Cooking Time (minutes)
                </label>
                <select
                  value={cookingTime}
                  onChange={(e) => setCookingTime(e.target.value)}
                  className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateRecipe}
              disabled={ingredients.length === 0 || isGenerating}
              className="w-full bg-gradient-to-r from-black to-black text-white py-4 rounded-xl hover:from-green-700 hover:to-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-semibold"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating Recipe...
                </>
              ) : (
                <>
                  <ChefHat className="h-5 w-5" />
                  Generate Recipe
                </>
              )}
            </button>

            {/* Generated Recipe */}
            {generatedRecipe && (
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                <h3 className="text-2xl font-bold text-green-700 mb-2">{generatedRecipe.name}</h3>
                <p className="text-gray-600 mb-4">{generatedRecipe.description}</p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">{generatedRecipe.cookTime} mins</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">{generatedRecipe.servings} servings</p>
                  </div>
                  <div className="text-center">
                    <ChefHat className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">{generatedRecipe.difficulty}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Ingredients:</h4>
                    <ul className="space-y-1">
                      {generatedRecipe.ingredients.map((ing: string, index: number) => (
                        <li key={index} className="text-gray-700">• {ing}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Instructions:</h4>
                    <ol className="space-y-2">
                      {generatedRecipe.instructions.map((step: string, index: number) => (
                        <li key={index} className="text-gray-700">
                          <span className="font-medium text-gray-600">{index + 1}.</span> {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}