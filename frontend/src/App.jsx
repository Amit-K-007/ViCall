import { SocketProvider } from "./providers/Socket"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Room from "./pages/Room";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Invalid from "./pages/Invalid";


function App() {

  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/auth/signin" element={<Signin />}></Route>
          <Route path="/auth/signin/:roomId" element={<Signin />}></Route>
          <Route path="/auth/signup" element={<Signup />}></Route>
          <Route path="/auth/signup/:roomId" element={<Signup />}></Route>
          <Route path="/room/:roomId" element={<Room />}></Route>
          <Route path="/invalid_request" element={<Invalid />}></Route>
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  )
}

export default App
