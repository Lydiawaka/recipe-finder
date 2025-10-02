import Link from "next/link"
import { HeartIcon, InstagramIcon, FacebookIcon, TwitterIcon, CakeIcon, MailIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-[#f1f1ef] border-t border-[#f3f2ef] mt-16">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <CakeIcon className="h-6 w-6 text-[#4CAF50]" />
              <h2 className="text-xl font-bold text-[#388E3C]">Recipe Finder</h2>
            </div>
            <p className="text-gray mb-6">
              Discover delicious recipes based on ingredients you have, dietary preferences, and more!
            </p>
            <div className="flex space-x-4 text-[#4CAF50] hover:text-[#388E3C]">
              <Link href="#" className="] transition-colors">
                <InstagramIcon className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className=" transition-colors">
                <FacebookIcon className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className=" transition-colors">
                <TwitterIcon className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#4CAF50] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-700 hover:text-[#4CAF50]">
              <li>
                <Link href="/" className=" transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/popular" className=" transition-colors">
                  Popular Recipes
                </Link>
              </li>
              <li>
                <Link href="/categories" className=" transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className=" transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-[#4CAF50] mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-700 hover:text-[#4CAF50]">
              <li>
                <Link href="/category/desserts" className=" transition-colors">
                  Desserts
                </Link>
              </li>
              <li>
                <Link href="/category/breakfast" className=" transition-colors">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link href="/category/main-dishes" className=" transition-colors">
                  Main Dishes
                </Link>
              </li>
              <li>
                <Link href="/category/healthy" className=" transition-colors">
                  Healthy Options
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-[#4CAF50] mb-4">Join Our Newsletter</h3>
            <p className="text-gray-700 mb-4">Get weekly recipe inspiration and cooking tips!</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <MailIcon className="absolute left-3 top-3 h-4 w-4 text-[#FFD54F]" />
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="pl-10 border-[#FFD54F] focus-visible:ring-[#4CAF50]"
                />
              </div>
              <Button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center my-8">
          <div className="h-px bg-[#FFD54F] flex-1"></div>
          <HeartIcon className="h-5 w-5 text-[#D32F2F] mx-4" />
          <div className="h-px bg-[#FFD54F] flex-1"></div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-900">
          <p>&copy; {new Date().getFullYear()} Recipe Finder. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2 text-sm">
            <Link href="/privacy" className="hover:text-[#4CAF50] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#4CAF50] transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-[#4CAF50] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
