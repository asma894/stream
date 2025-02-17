"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import StreamNavbar from "./stream-navbar"
import SharedFooter from "./shared-footer"
import AdminSupportChat from "./admin-support-chat"
import { Users, Video, TrendingUp, MessageSquare, Search, UserPlus, Eye, Clock } from "lucide-react"

interface Stats {
  totalUsers: number
  totalVideos: number
  totalViews: number
  activeUsers: number
  monthlyRevenue: number
  supportTickets: number
  averageWatchTime: string
  userGrowth: number
}

interface ActivityLog {
  id: number
  action: string
  user: string
  timestamp: string
  details: string
}

export default function EspaceAdmin() {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalVideos: 0,
    totalViews: 0,
    activeUsers: 0,
    monthlyRevenue: 0,
    supportTickets: 0,
    averageWatchTime: "0:00",
    userGrowth: 0,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        const data = await response.json()
        setStats(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching stats:", error)
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const recentActivity: ActivityLog[] = [
    {
      id: 1,
      action: "Nouvelle inscription",
      user: "Dr. Martin",
      timestamp: "Il y a 5 minutes",
      details: "Inscription validée et compte activé",
    },
    {
      id: 2,
      action: "Nouvelle vidéo",
      user: "Dr. Sophie",
      timestamp: "Il y a 15 minutes",
      details: "Uploaded: 'Nouvelles techniques chirurgicales 2024'",
    },
    {
      id: 3,
      action: "Support ticket",
      user: "Dr. Thomas",
      timestamp: "Il y a 30 minutes",
      details: "Problème d'accès résolu",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <StreamNavbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Admin</h1>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Rechercher..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Utilisateurs Totaux</CardTitle>
                  <Users className="h-4 w-4 text-blue-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-blue-100">+{stats.userGrowth}% ce mois</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Vidéos Totales</CardTitle>
                  <Video className="h-4 w-4 text-purple-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalVideos.toLocaleString()}</div>
                  <p className="text-xs text-purple-100">+15% ce mois</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Revenus Mensuels</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€{stats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-green-100">+7% ce mois</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Tickets Support</CardTitle>
                  <MessageSquare className="h-4 w-4 text-orange-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.supportTickets}</div>
                  <p className="text-xs text-orange-100">-3% ce mois</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques Détaillées</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <UserPlus className="h-4 w-4 text-blue-500" />
                        <span>Nouveaux utilisateurs (aujourd'hui)</span>
                      </div>
                      <span className="font-semibold">+124</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-green-500" />
                        <span>Vues totales</span>
                      </div>
                      <span className="font-semibold">{stats.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-purple-500" />
                        <span>Temps moyen de visionnage</span>
                      </div>
                      <span className="font-semibold">{stats.averageWatchTime}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activité Récente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4">
                          <div className="rounded-full bg-blue-100 p-2">
                            <Users className="h-4 w-4 text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-gray-500">
                              {activity.user} - {activity.timestamp}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="w-full">Ajouter une vidéo</Button>
                    <Button className="w-full" variant="outline">
                      Gérer les utilisateurs
                    </Button>
                    <Button className="w-full" variant="secondary">
                      Voir les rapports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* User management content */}
                  <p>Contenu de gestion des utilisateurs à venir...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion du Contenu</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Content management content */}
                  <p>Contenu de gestion du contenu à venir...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support">
              <AdminSupportChat />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <SharedFooter />
    </div>
  )
}

