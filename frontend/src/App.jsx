import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./Pages/signup"
import { Signin } from "./Pages/signin"
import { Dashboard } from "./Pages/dashboard"
import { SendMoney } from "./Pages/SendMoney"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
