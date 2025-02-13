"use client"

import { useEffect, useState } from "react"

import { Search, ExternalLink } from "lucide-react"
import { Button } from "../components/ui/button"
import SharedFooter from "../components/shared-footer"
import SharedNavbar from "../components/ui/shared-navbar"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

interface Article {
  title: string
  description: string
  publishedAt: string
  urlToImage?: string
  url: string
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage] = useState(12)

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/everything?q=medical&apiKey=ccde240987bb4a8ebf29220da6b6caae",
      )
      const data = await response.json()
      if (data.status === "ok") {
        setArticles(data.articles.slice(3) || [])
      } else {
        setError("Failed to fetch news. Reason: " + data.message)
      }
      setLoading(false)
    } catch (error) {
      setError("An error occurred while fetching the news.")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, []) //Fixed: Added empty dependency array to useEffect

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  const filteredArticles = articles.filter((article) => {
    const query = searchQuery.toLowerCase()
    return (
      (article.title && article.title.toLowerCase().includes(query)) ||
      (article.description && article.description.toLowerCase().includes(query))
    )
  })

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle)
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SharedNavbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Medical News</h1>
          <p className="text-lg text-gray-600">Stay updated with the latest medical news and breakthroughs</p>
        </div>

        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.map((article, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              {article.urlToImage && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.urlToImage || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      Read more
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length > 0 && (
          <div className="flex justify-center gap-2 mt-12">
            <Button variant="outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </main>

      <SharedFooter />
    </div>
  )
}

