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
import ProtectedRoute from "./components/ProtectedRoute";

// css
import './dist/output.css'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  const checkAuth = async () => {
    try {
      const res = await fetch(
        "/auth/me",
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        setUser(null);
        setLoading(false);
        return;
      }

      const data = await res.json();

      setUser(data);

    } catch (err) {
      console.error(err);
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  checkAuth();

}, []);

if (loading) {
  return <p>Loading...</p>;
}

  return (
    <BrowserRouter>
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-orange-100">
      <Navbar user={user} setUser={setUser}/>

      

      <Routes>
        <Route path="/" element={<Landing/>} />
        {/* <Route path="/app" element={<HabitApp user={user} />} /> */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser}/>} />
        <Route
          path="/app"
          element={
            <ProtectedRoute user={user}>
              <HabitApp 
                user={user}
              />
            </ProtectedRoute>
          }
        />
      </Routes>


      <Footer />
      </main>

    </BrowserRouter>
  );
}

export default App;
