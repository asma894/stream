"use client"

import { useState, useRef } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import {
  Heart,
  Star,
  Share2,
  Download,
  Gift,
  Send,
  Trash2,
  Link,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Search,
  SkipBack,
  SkipForward,
} from "lucide-react"
import { videos, categories } from "@/data/videos"

// Dynamic import of ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

interface Comment {
  id: number
  content: string
  userId: number
  videoId: number
  createdAt: string
  user: {
    username: string
  }
}

// Import Navbar and Footer components
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card } from "./ui/card"
import SupportChat from "./support-chat"
import SharedNavbar from "./ui/shared-navbar"
import SharedFooter from "./shared-footer"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export default function StreamPage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [likes, setLikes] = useState<boolean[]>(new Array(videos.length).fill(false))
  const [favorites, setFavorites] = useState<boolean[]>(new Array(videos.length).fill(false))
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const playerRef = useRef<any>(null)

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    const newCommentObj = {
      id: comments.length + 1,
      content: newComment,
      userId: 1,
      videoId: videos[currentVideoIndex].id,
      createdAt: new Date().toISOString(),
      user: {
        username: "Current User",
      },
    }
    setComments([newCommentObj, ...comments])
    setNewComment("")
  }

  const handleSeek = (seconds: number) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime()
      playerRef.current.seekTo(currentTime + seconds)
    }
  }

  const handleShare = () => setShowShareModal(true)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(videos[currentVideoIndex].url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || video.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <SharedNavbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
        <div className="container mx-auto px-4 py-6">
          {/* Categories and Search */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} onClick={() => setSelectedCategory(category.id)}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Video Player */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <div className="relative pt-[56.25%]">
                  <ReactPlayer
                    ref={playerRef}
                    url={videos[currentVideoIndex].url}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    className="absolute top-0 left-0"
                    onEnded={() => setCurrentVideoIndex((prev) => (prev + 1) % videos.length)}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleSeek(-5)}>
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleSeek(5)}>
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={likes[currentVideoIndex] ? "default" : "outline"}
                        size="icon"
                        onClick={() =>
                          setLikes((prev) => {
                            const newLikes = [...prev]
                            newLikes[currentVideoIndex] = !newLikes[currentVideoIndex]
                            return newLikes
                          })
                        }
                      >
                        <Heart className={`h-4 w-4 ${likes[currentVideoIndex] ? "fill-current" : ""}`} />
                      </Button>
                      <Button
                        variant={favorites[currentVideoIndex] ? "default" : "outline"}
                        size="icon"
                        onClick={() =>
                          setFavorites((prev) => {
                            const newFavorites = [...prev]
                            newFavorites[currentVideoIndex] = !newFavorites[currentVideoIndex]
                            return newFavorites
                          })
                        }
                      >
                        <Star className={`h-4 w-4 ${favorites[currentVideoIndex] ? "fill-current" : ""}`} />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href = videos[currentVideoIndex].url
                          link.download = `video-${videos[currentVideoIndex].id}.mp4`
                          document.body.appendChild(link)
                          link.click()
                          document.body.removeChild(link)
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="/gift">
                          <Gift className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-2">{videos[currentVideoIndex].title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {videos[currentVideoIndex].views} views • {videos[currentVideoIndex].date}
                  </p>
                  <p className="text-muted-foreground">{videos[currentVideoIndex].description}</p>

                  {/* Comments Section */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Comments</h3>
                    <div className="flex gap-2 mb-4">
                      <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1"
                      />
                      <Button onClick={handleAddComment}>
                        <Send className="h-4 w-4 mr-2" />
                        Post
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <Card key={comment.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{comment.user.username}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </p>
                              <p className="mt-2">{comment.content}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const confirmed = window.confirm("Delete this comment?")
                                if (confirmed) {
                                  setComments(comments.filter((c) => c.id !== comment.id))
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Playlist */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {filteredVideos.map((video, index) => (
                  <Card
                    key={video.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      index === currentVideoIndex ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setCurrentVideoIndex(index)}
                  >
                    <div className="relative pt-[56.25%]">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-t-lg object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {video.views} views • {video.date}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-6">Share Video</h2>
            <div className="space-y-4">
              <Button variant="outline" className="w-full" onClick={handleCopyLink}>
                <Link className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=${videos[currentVideoIndex].url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${videos[currentVideoIndex].url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${videos[currentVideoIndex].url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={`mailto:?subject=Check out this video&body=${videos[currentVideoIndex].url}`}>
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4" onClick={() => setShowShareModal(false)}>
              Close
            </Button>
          </Card>
        </div>
      )}

      <SupportChat />
      <SharedFooter />
    </>
  )
}

