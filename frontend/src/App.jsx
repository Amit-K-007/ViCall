import { SocketProvider } from "./providers/Socket"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Room from "./pages/Room";


function App() {

  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/room/:roomId" element={<Room />}></Route>
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  )
}

export default App
