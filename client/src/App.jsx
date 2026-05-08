import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HabitApp from "./pages/HabitApp";

// components
import Navbar from "./components/Navbar";
import Footer from './components/Footer';

// css
import './dist/output.css'

function App() {
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/auth/me", {
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);


  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-orange-100">
      <Navbar user={user} />

      

      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/app" element={<HabitApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>


      <Footer />
      </main>

    </BrowserRouter>
  );
}

export default App;
