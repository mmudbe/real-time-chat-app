
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Room from './components/room/Room';
import JoinRoom from './components/room/JoinRoom';

function App() {
  return (
    <div className="App">
    <Router>
    <Navbar />
    <Routes>
      
    <Route path="/" element={<Home/>} />
    <Route path="/room" element={<JoinRoom />} />
    </Routes>
    
    </Router>

    </div>
  );
}

export default App;
