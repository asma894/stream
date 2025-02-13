import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body || !body.emailOrUsername || !body.password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { emailOrUsername, password } = body

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid email/username or password" }, { status: 400 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email/username or password" }, { status: 400 })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" })

    const { password: _, ...userWithoutPassword } = user

    const response = NextResponse.json({ user: userWithoutPassword, token }, { status: 200 })

    // Set the token as an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error during login:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
}

