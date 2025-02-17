import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const [totalUsers, totalVideos, totalViews, supportTickets] = await Promise.all([
      prisma.user.count(),
      prisma.video.count(),
      prisma.video.aggregate({
        _sum: {
          views: true,
        },
      }),
      // Add support tickets count when you implement that model
      Promise.resolve(24), // Placeholder
    ])

    // Calculate monthly revenue (placeholder)
    const monthlyRevenue = 89340

    // Calculate user growth (placeholder)
    const userGrowth = 12.5

    // Calculate average watch time (placeholder)
    const averageWatchTime = "45:23"

    return NextResponse.json({
      totalUsers,
      totalVideos,
      totalViews: totalViews._sum.views || 0,
      activeUsers: Math.floor(totalUsers * 0.3), // Assuming 30% are active
      monthlyRevenue,
      supportTickets,
      averageWatchTime,
      userGrowth,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 })
  }
}

