"use client"

import { useState, useEffect } from "react"
import { videos } from "@/data/videos"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

export default function AdminDashboard() {
  const [activeUsers, setActiveUsers] = useState(0)
  const [totalViews, setTotalViews] = useState(0)
  const [totalLikes, setTotalLikes] = useState(0)

  useEffect(() => {
    // Simulate fetching data
    setActiveUsers(Math.floor(Math.random() * 100) + 50)
    setTotalViews(videos.reduce((acc, video) => acc + Number.parseInt(video.views.replace("K", "000")), 0))
    setTotalLikes(Math.floor(Math.random() * 10000) + 5000)
  }, [])

  const viewsData = {
    labels: videos.map((video) => video.title.slice(0, 20) + "..."),
    datasets: [
      {
        label: "Views",
        data: videos.map((video) => Number.parseInt(video.views.replace("K", "000"))),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }

  const likesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Likes",
        data: [1200, 1900, 3000, 5000, 4000, 3000],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="views">
        <TabsList>
          <TabsTrigger value="views">Views by Video</TabsTrigger>
          <TabsTrigger value="likes">Likes Over Time</TabsTrigger>
        </TabsList>
        <TabsContent value="views">
          <Card>
            <CardHeader>
              <CardTitle>Views by Video</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={viewsData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="likes">
          <Card>
            <CardHeader>
              <CardTitle>Likes Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={likesData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

