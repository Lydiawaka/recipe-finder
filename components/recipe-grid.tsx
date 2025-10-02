"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClockIcon, UsersIcon, SparklesIcon, Loader2Icon } from "lucide-react"
import { RecipeDetails } from "@/components/recipe-details"

interface Recipe {
  id: number
  title: string
  image: string
  readyInMinutes: number
  servings: number
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
  dairyFree: boolean
}

export function RecipeGrid() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const diet = searchParams.get("diet") || ""
  const cuisine = searchParams.get("cuisine") || ""
  const intolerances = searchParams.get("intolerances") || ""

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null)

  useEffect(() => {
    async function fetchRecipes() {
      if (!query && !diet && !cuisine && !intolerances) {
        // Show popular recipes if no search parameters
        setRecipes([
          {
            id: 1,
            title: "Strawberry Cheesecake",
            image: "/images/cheesecake.jpg",
            readyInMinutes: 60,
            servings: 8,
            vegetarian: true,
            vegan: false,
            glutenFree: false,
            dairyFree: false,
          },
          {
            id: 2,
            title: "Pink Lemonade Cupcakes",
            image: "/images/cupcakes.jpg",
            readyInMinutes: 45,
            servings: 12,
            vegetarian: true,
            vegan: false,
            glutenFree: false,
            dairyFree: false,
          },
          {
            id: 3,
            title: "Berry Smoothie Bowl",
            image: "/images/smoothie.jpg",
            readyInMinutes: 15,
            servings: 1,
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
          },
          {
            id: 4,
            title: "Raspberry Chocolate Cake",
            image: "/images/raspberry.jpg",
            readyInMinutes: 75,
            servings: 10,
            vegetarian: true,
            vegan: false,
            glutenFree: false,
            dairyFree: false,
          },
          {
            id: 5,
            title: "Avocado Rose Toast",
            image: "/images/toast.jpg",
            readyInMinutes: 20,
            servings: 2,
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
          },
          {
            id: 6,
            title: "Lavender Macarons",
            image: "/images/macarons.jpg",
            readyInMinutes: 90,
            servings: 24,
            vegetarian: true,
            vegan: false,
            glutenFree: true,
            dairyFree: false,
          },
        ])
        return
      }

      setLoading(true)
      setError("")

      try {
        const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=${diet}&cuisine=${cuisine}&intolerances=${intolerances}&apiKey=${apiKey}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch recipes")
        }

        const data = await response.json()
        setRecipes(data.results)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch recipes. Please try again.")
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [query, diet, cuisine, intolerances])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2Icon className="h-12 w-12 text-green-600 animate-spin mb-4" />
        <p className="text-green-700 text-lg">Finding delicious recipes for you...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button
          variant="outline"
          className="border-green-400 text-green-700 hover:bg-green-50"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (recipes.length === 0 && (query || diet || cuisine || intolerances)) {
    return (
      <div className="text-center py-12">
        <SparklesIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-green-700 mb-2">No recipes found</h3>
        <p className="text-green-600 mb-6">Try adjusting your search or filters to find more recipes.</p>
        <Button
          variant="outline"
          className="border-green-400 text-green-700 hover:bg-green-50"
          onClick={() => (window.location.href = "/")}
        >
          Clear Search
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="overflow-hidden border-green-200 hover:shadow-lg transition-shadow duration-300 bg-beige"
          >
            <div className="relative h-48">
              <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
              <div className="absolute top-2 right-2 flex gap-1">
                {recipe.vegetarian && <Badge className="bg-green-500">Vegetarian</Badge>}
                {recipe.vegan && <Badge className="bg-green-600">Vegan</Badge>}
              </div>
            </div>
            <CardHeader className="pb-2">
              <h3 className="font-semibold text-lg text-green-700 line-clamp-2">{recipe.title}</h3>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center gap-4 text-sm text-green-600">
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {recipe.readyInMinutes} min
                </div>
                <div className="flex items-center">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  {recipe.servings} servings
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {recipe.glutenFree && (
                  <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                    Gluten-Free
                  </Badge>
                )}
                {recipe.dairyFree && (
                  <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                    Dairy-Free
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-black to-gray-600 hover:from-green-600 hover:to-yellow-600 text-white"
                onClick={() => setSelectedRecipe(recipe.id)}
              >
                View Recipe
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedRecipe && <RecipeDetails recipeId={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
    </>
  )
}
