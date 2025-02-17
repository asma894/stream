"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface Message {
  id: string
  user: string
  text: string
  isAdmin: boolean
}

const initialMessages: Message[] = [
  { id: "1", user: "John Doe", text: "Bonjour, j'ai un problème avec mon compte.", isAdmin: false },
  { id: "2", user: "Admin", text: "Bonjour John, je peux vous aider. Quel est le problème ?", isAdmin: true },
  { id: "3", user: "John Doe", text: "Je ne peux pas accéder à mes vidéos enregistrées.", isAdmin: false },
]

export default function AdminSupportChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const adminMessage: Message = {
        id: Date.now().toString(),
        user: "Admin",
        text: newMessage,
        isAdmin: true,
      }
      setMessages([...messages, adminMessage])
      setNewMessage("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat de support</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] overflow-y-auto mb-4 p-4 border rounded">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 p-2 rounded ${message.isAdmin ? "bg-blue-100 text-right" : "bg-gray-100"}`}
            >
              <p className="font-bold">{message.user}</p>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tapez votre message..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Envoyer</Button>
        </div>
      </CardContent>
    </Card>
  )
}

