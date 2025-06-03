"use client"

import React, { createContext, useState, useCallback, ReactNode } from 'react'

type ToastVariant = 'default' | 'destructive'

interface Toast {
  id: number
  title: string
  description?: string
  variant?: ToastVariant
}

interface ToastContextType {
  toast: (props: { title: string; description?: string; variant?: ToastVariant }) => void
  dismiss: (id: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [nextId, setNextId] = useState(1)

  const toast = useCallback(({ title, description, variant = 'default' }: { title: string; description?: string; variant?: ToastVariant }) => {
    const id = nextId
    setNextId(prev => prev + 1)
    
    setToasts(prev => [...prev, { id, title, description, variant }])
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 5000)
  }, [nextId])

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`rounded-md shadow-md p-4 backdrop-blur-sm ${
              toast.variant === 'destructive' 
                ? 'bg-red-500/90 text-white' 
                : 'bg-white/90 text-gray-800'
            }`}
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
    </ToastContext.Provider>
  )
} 