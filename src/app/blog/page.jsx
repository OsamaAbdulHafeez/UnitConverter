"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calculator, Newspaper, CalendarDays } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import posts from '../../data/post.json'

function truncate(text, maxChars = 180) {
  if (text.length <= maxChars) return text
  const slice = text.slice(0, maxChars)
  const lastSpace = slice.lastIndexOf(" ")
  return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).concat("...")
}

function BlogCard({ post }) {
  const [expanded, setExpanded] = useState(false)
  const displayText = expanded ? post.content : truncate(post.excerpt)

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={post.image || "/placeholder.svg"}
          alt={`Cover image for ${post.title}`}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {post.tag ? <Badge className="absolute top-3 left-3 bg-blue-600 text-white shadow">{post.tag}</Badge> : null}
      </div>
      <CardHeader className="">
        <CardTitle className="text-xl font-bold text-gray-800">{post.title}</CardTitle>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <CalendarDays className="w-4 h-4 mr-1" />
          <span>{post.date}</span>
        </div>
      </CardHeader>
      <CardContent className="">
        <p className="text-gray-700 leading-relaxed">{displayText}</p>
        <div className="mt-4">
          <Button
            variant="outline"
            className="rounded-full border-2 hover:border-blue-500 hover:text-blue-600 bg-transparent"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "See less" : "See more"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="inline-flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-700">Our Blog</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Latest Articles & Tips
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Insights, guides, and practical tips to help you master unit conversions in everyday life and work.
        </p>
      </section>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}