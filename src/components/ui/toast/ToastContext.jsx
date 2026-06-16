import { createContext, useContext, useState } from "react"

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {

  const [toasts, setToasts] = useState([])

  const showToast = (message, type = "success") => {

    const id = Date.now()

    const newToast = {
      id,
      message,
      type,
    }

    setToasts((prev) => [...prev, newToast])

    // auto remove after 3s
    setTimeout(() => {
      setToasts((prev) =>
        prev.filter((t) => t.id !== id)
      )
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      
      {children}

      {/* TOAST UI */}
      <div className="fixed top-5 right-5 space-y-2 z-[9999]">

        {toasts.map((toast) => (

          <div
            key={toast.id}
            className={`
              px-4 py-3 rounded-lg shadow-md text-white text-sm animate-in fade-in
              ${toast.type === "success" && "bg-green-600"}
              ${toast.type === "error" && "bg-red-600"}
              ${toast.type === "info" && "bg-blue-600"}
            `}
          >
            {toast.message}
          </div>

        ))}

      </div>

    </ToastContext.Provider>
  )
}

export const useToast = () => {
  return useContext(ToastContext)
}