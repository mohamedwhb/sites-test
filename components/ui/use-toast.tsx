"use client"

import { useState, useCallback } from 'react'

type ToastVariant = 'default' | 'destructive'

interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<(ToastProps & { id: number })[]>([])
  const [nextId, setNextId] = useState(1)

  const toast = useCallback(({ title, description, variant = 'default' }: ToastProps) => {
    const id = nextId
    setNextId(prev => prev + 1)
    
    setToasts(prev => [...prev, { id, title, description, variant }])
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 5000)
    
    return id
  }, [nextId])

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  // This component is rendered at the top level
  const ToastContainer = () => {
    return (
      <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`rounded-md shadow-md p-4 backdrop-blur-sm ${
              toast.variant === 'destructive' 
                ? 'bg-red-500/90 text-white' 
                : 'bg-white/90 text-gray-800'
            }`}
            onClick={() => dismiss(toast.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{toast.title}</h3>
                {toast.description && (
                  <p className="text-sm mt-1">{toast.description}</p>
                )}
              </div>
              <button 
                className={`ml-4 text-sm ${toast.variant === 'destructive' ? 'text-white/80' : 'text-gray-500'}`}
                onClick={() => dismiss(toast.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return { toast, dismiss, ToastContainer }
} 