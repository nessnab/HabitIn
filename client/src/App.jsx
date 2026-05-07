import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

// Pages
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// components
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import Footer from './components/Footer';

// css
import './dist/output.css'

function App() {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetch("http://localhost:3000/api/habits", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setHabits(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
  await fetch(`http://localhost:3000/api/habits/${id}`, {
    method: "DELETE"
  });

  // update state after deletion
  setHabits(prev => prev.filter(habit => habit._id !== id));
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  }

  // const user = null;

  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-orange-100">
      <Navbar user={user} />

      {/* <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-orange-100 text-center items-center capitalize">
        <h1>HabitIn</h1>

        {loading && <p>Loading...</p>}

        <button onClick={() => setShowForm(prev => !prev)}>
          Add Habit
        </button>

        {showForm && (
          <HabitForm 
          setHabits={setHabits} 
          editingHabit={editingHabit} 
          setEditingHabit={setEditingHabit}
          setShowForm={setShowForm}
          />
        )}

        <HabitList 
        habits={habits} 
        onDelete={handleDelete} 
        onEdit={handleEdit}
        />
      </div> */}

      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/app" element={<h1>App Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>


      <Footer />
      </main>

    </BrowserRouter>
  );
}

export default App;
