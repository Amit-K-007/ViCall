import { SocketProvider } from "./providers/Socket"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Room from "./pages/Room";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";


function App() {

  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/auth/signin" element={<Signin />}></Route>
          <Route path="/auth/signup" element={<Signup />}></Route>
          <Route path="/room/:roomId" element={<Room />}></Route>
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  )
}

export default App
