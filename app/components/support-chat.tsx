"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface Message {
  id: string
  text: string
  isUser: boolean
}

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        isUser: true,
      }
      setMessages([...messages, newMessage])
      setInputMessage("")

      // Simulate sending the message to the admin interface
      // In a real application, you would use a WebSocket or API call here
      setTimeout(() => {
        const adminResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message. Our support team will get back to you soon.",
          isUser: false,
        }
        setMessages((prev) => [...prev, adminResponse])
      }, 1000)
    }
  }

  return (
    <>
      {!isOpen && (
        <Button className="fixed bottom-4 right-4 rounded-full p-4" onClick={() => setIsOpen(true)}>
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 h-96 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">Support Chat</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-grow overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-2 rounded-lg ${
                    message.isUser ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

