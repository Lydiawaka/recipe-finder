"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ClockIcon,
  UsersIcon,
  HeartIcon,
  CheckCircleIcon,
  ShoppingBagIcon,
  ChefHatIcon,
  Loader2Icon,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RecipeDetailsProps {
  recipeId: number
  onClose: () => void
}

export function RecipeDetails({ recipeId, onClose }: RecipeDetailsProps) {
  const [loading, setLoading] = useState(true)
  const [recipe, setRecipe] = useState<any>(null)

  useEffect(() => {
    async function fetchRecipe() {
      setLoading(true)
      try {
        const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details")
        }
        const data = await response.json()
        setRecipe(data)
      } catch (err) {
        console.error("Error fetching recipe:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [recipeId])

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-yellow-50/95 backdrop-blur-sm border-green-200">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2Icon className="h-12 w-12 text-green-600 animate-spin mb-4" />
            <p className="text-gray-700">Loading recipe details...</p>
          </div>
        ) : recipe ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-green-700">{recipe.title}</DialogTitle>
              {recipe.summary && (
                <DialogDescription
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: recipe.summary }}
                />
              )}
            </DialogHeader>

            <div className="relative h-64 sm:h-80 rounded-md overflow-hidden my-4">
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full">
                <ClockIcon className="h-4 w-4 mr-1" />
                {recipe.readyInMinutes} minutes
              </div>
              <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full">
                <UsersIcon className="h-4 w-4 mr-1" />
                {recipe.servings} servings
              </div>
              <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full">
                <HeartIcon className="h-4 w-4 mr-1 text-red-500" />
                Health Score: {recipe.healthScore || "N/A"}
              </div>
              {recipe.vegetarian && <Badge className="bg-green-500 text-white">Vegetarian</Badge>}
              {recipe.vegan && <Badge className="bg-green-600 text-white">Vegan</Badge>}
              {recipe.glutenFree && <Badge className="bg-blue-500 text-white">Gluten-Free</Badge>}
              {recipe.dairyFree && <Badge className="bg-orange-500 text-white">Dairy-Free</Badge>}
            </div>

            <Tabs defaultValue="ingredients" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger
                  value="ingredients"
                  className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                >
                  <ShoppingBagIcon className="h-4 w-4 mr-2" />
                  Ingredients
                </TabsTrigger>
                <TabsTrigger
                  value="instructions"
                  className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                >
                  <ChefHatIcon className="h-4 w-4 mr-2" />
                  Instructions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ingredients" className="mt-0">
                <ul className="space-y-2">
                  {recipe.extendedIngredients?.map((ingredient: any, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                      <span className="text-gray-800">
                        <span className="font-medium">
                          {ingredient.original || `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="instructions" className="mt-0">
                {recipe.analyzedInstructions?.length > 0 ? (
                  <ol className="space-y-4">
                    {recipe.analyzedInstructions[0].steps.map((step: any, index: number) => (
                      <li key={index} className="flex">
                        <span className="bg-green-100 text-green-700 rounded-full h-6 w-6 flex items-center justify-center font-medium mr-3 shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-800">{step.step}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-gray-600">No instructions available.</p>
                )}
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
                onClick={onClose}
              >
                Close
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-green-300 hover:from-green-700 hover:to-orange-600 text-white">
                <HeartIcon className="h-4 w-4 mr-2" />
                Save Recipe
              </Button>
            </DialogFooter>
          </>
        ) : (
          <p className="text-center text-red-600">Failed to load recipe details.</p>
        )}
      </DialogContent>
    </Dialog>
  )
}
