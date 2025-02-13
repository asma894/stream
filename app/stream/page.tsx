import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import StreamPage from "../components/StreamPage"

export default function Stream() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")

  if (!token) {
    redirect("/login")
  }

  return <StreamPage />
}

