"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Data Processing Complete",
    message: "Your file 'monthly_sales.csv' has been processed successfully.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "New Team Member",
    message: "Sofia Davis has joined your team.",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    title: "Export Ready",
    message: "Your data export is ready for download.",
    timestamp: "1 day ago",
    read: true,
  },
]

export function NotificationsMenu() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <h2 className="font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="cursor-pointer p-4"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${notification.read ? "text-muted-foreground" : ""}`}>
                        {notification.title}
                      </p>
                      {!notification.read && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

