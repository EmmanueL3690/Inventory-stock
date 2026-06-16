import AppRoutes from "./routes/AppRoutes"
import "./index.css"
import { ToastProvider } from "./components/ui/toast/ToastContext"

function App() {
  return (
  <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  )
}

export default App