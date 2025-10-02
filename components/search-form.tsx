"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { SearchIcon, FilterIcon, XIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get("query") || "")
  const [diet, setDiet] = useState(searchParams.get("diet") || "")
  const [cuisine, setCuisine] = useState(searchParams.get("cuisine") || "")
  const [intolerances, setIntolerances] = useState<string[]>(
    searchParams.get("intolerances")?.split(",").filter(Boolean) || [],
  )
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const dietOptions = [
    { value: "", label: "Any Diet" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "gluten-free", label: "Gluten Free" },
    { value: "ketogenic", label: "Ketogenic" },
    { value: "paleo", label: "Paleo" },
  ]

  const cuisineOptions = [
    { value: "", label: "Any Cuisine" },
    { value: "italian", label: "Italian" },
    { value: "mexican", label: "Mexican" },
    { value: "asian", label: "Asian" },
    { value: "french", label: "French" },
    { value: "mediterranean", label: "Mediterranean" },
  ]

  const intoleranceOptions = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Tree Nut",
    "Wheat",
  ]

  const toggleIntolerance = (item: string) => {
    if (intolerances.includes(item)) {
      setIntolerances(intolerances.filter((i) => i !== item))
    } else {
      setIntolerances([...intolerances, item])
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (query) params.set("query", query)
    if (diet) params.set("diet", diet)
    if (cuisine) params.set("cuisine", cuisine)
    if (intolerances.length) params.set("intolerances", intolerances.join(","))

    router.push(`/?${params.toString()}`)
  }

  const clearFilters = () => {
    setQuery("")
    setDiet("")
    setCuisine("")
    setIntolerances([])
    router.push("/")
  }

  return (
    <Card className="border-gray-600 shadow-md bg-white/90 backdrop-blur-sm">
      <CardContent className="pt-6">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-[#4CAF50]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes (e.g., pasta, chocolate cake)"
                className="pl-10 border-gray-700 focus-visible:ring-[#4CAF50]"
              />
            </div>
            <Button
              type="submit"
              className="bg-black hover:bg-[#388E3C] text-white"
            >
              Search Recipes
            </Button>
          </div>

          <div className="mt-4">
            <Button
              type="button"
              variant="ghost"
              className="text-[#4CAF50] hover:text-[#388E3C] hover:bg-[#FFF8E1] flex items-center gap-1 text-sm"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            >
              <FilterIcon className="h-4 w-4" />
              {isAdvancedOpen ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {isAdvancedOpen && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#4CAF50] mb-1 block">Diet Preference</label>
                <Select value={diet} onValueChange={setDiet}>
                  <SelectTrigger className="border-[#FFD54F]">
                    <SelectValue placeholder="Select diet" />
                  </SelectTrigger>
                  <SelectContent>
                    {dietOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4CAF50] mb-1 block">Cuisine Type</label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger className="border-[#FFD54F]">
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisineOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-[#4CAF50] mb-1 block">Intolerances</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {intoleranceOptions.map((item) => (
                    <Badge
                      key={item}
                      variant={intolerances.includes(item) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        intolerances.includes(item)
                          ? "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
                          : "text-[#4CAF50] border-[#FFD54F] hover:bg-[#FFF8E1]"
                      }`}
                      onClick={() => toggleIntolerance(item)}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {(diet || cuisine || intolerances.length > 0) && (
                <div className="md:col-span-2 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-[#D32F2F] border-[#cbc9c0] hover:bg-[#FFF8E1]"
                    onClick={clearFilters}
                  >
                    <XIcon className="h-4 w-4 mr-1" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
