import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

// Pages
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";

// components
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';

// css
import './dist/output.css'

function App() {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/habits")
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
  await fetch(`/api/habits/${id}`, {
    method: "DELETE"
  });

  // update state after deletion
  setHabits(prev => prev.filter(habit => habit._id !== id));
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setShowForm(true);  x
  }

  const user = null;

  return (
    <BrowserRouter>
      {/* <Navbar user={user} /> */}
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-orange-100">

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
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/signup" element={<h1>Signup</h1>} />
      </Routes>
      </main>


    </BrowserRouter>
  );
}

export default App;
