"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"
import { Settings, Search, BarChart, Package, ShoppingCart, HelpCircle, Moon, Sun, Laptop } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  // Enable CMD+K shortcut
  useHotkeys(["meta+k", "ctrl+k"], (event) => {
    event.preventDefault()
    setOpen((open) => !open)
  })

  // Enable / shortcut
  useHotkeys(["/"], (event) => {
    event.preventDefault()
    setOpen((open) => !open)
  })

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        <span className="hidden md:inline-flex">Search...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:inline-flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
              <BarChart className="mr-2 h-4 w-4" />
              Dashboard
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/products"))}>
              <Package className="mr-2 h-4 w-4" />
              Products
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/analytics"))}>
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/advertising"))}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Advertising
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/help"))}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

