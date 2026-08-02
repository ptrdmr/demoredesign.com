'use client'

import { useEffect, useRef } from 'react'
import { ExternalLink, X } from 'lucide-react'

interface SampleModalProps {
  open: boolean
  onClose: () => void
}

export function SampleModal({ open, onClose }: SampleModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    const handleSampleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type === 'demore-sample-close') onClose()
    }
    window.addEventListener('message', handleSampleMessage)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('message', handleSampleMessage)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
      <button
        type="button"
        className="absolute inset-0 animate-fade-in bg-ink/85 backdrop-blur-[3px]"
        aria-label="Close sample viewer"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sample-modal-title"
        className="relative z-10 flex h-full w-full flex-col border-0 border-rule bg-paper shadow-card animate-fade-in md:h-[min(90vh,900px)] md:w-[min(1120px,95vw)] md:border md:rounded-sm"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-rule px-4 py-4 md:px-6">
          <div>
            <p className="font-mono text-eyebrow uppercase text-ink-muted">Sample deliverable</p>
            <h2 id="sample-modal-title" className="mt-1 font-display text-sub-heading text-ink">
              Deliverable format
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href="/sample/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 text-sm text-accent transition-colors duration-150 hover:text-accent-deep sm:inline-flex"
            >
              Open in new tab
              <ExternalLink size={14} strokeWidth={1.5} />
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="rounded-sm p-1.5 text-ink-muted transition-colors duration-150 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              aria-label="Close"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 bg-paper-alt">
          <iframe
            src="/sample/index.html"
            title="Sample deliverable format"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  )
}
