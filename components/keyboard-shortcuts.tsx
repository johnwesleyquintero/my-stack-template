'use client'

import * as React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Keyboard } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function KeyboardShortcuts() {
  const [open, setOpen] = React.useState(false)

  // Show shortcuts with CMD/CTRL + /
  useHotkeys(['meta+/, ctrl+/'], event => {
    event.preventDefault()
    setOpen(true)
  })

  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['⌘', 'K'], description: 'Open command palette' },
        { keys: ['⌘', 'D'], description: 'Go to dashboard' },
        { keys: ['⌘', 'P'], description: 'Go to products' },
        { keys: ['⌘', 'S'], description: 'Go to settings' },
        { keys: ['⌘', 'H'], description: 'Open help' },
      ],
    },
    {
      category: 'Actions',
      items: [
        { keys: ['⌘', '/'], description: 'Show keyboard shortcuts' },
        { keys: ['/'], description: 'Focus search' },
        { keys: ['Esc'], description: 'Close modal' },
      ],
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="hidden md:inline-flex"
          title="Keyboard shortcuts"
        >
          <Keyboard className="h-4 w-4" />
          <span className="sr-only">Keyboard shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="keyboard-shortcuts-description"
      >
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription id="keyboard-shortcuts-description">
            Keyboard shortcuts to help you navigate the application faster.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {shortcuts.map(section => (
            <div key={section.category} className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                {section.category}
              </h4>
              <div className="space-y-2">
                {section.items.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-xs text-muted-foreground">
                              +
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
