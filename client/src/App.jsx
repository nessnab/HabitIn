import { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';

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


  return (
    <div style={{ padding: "20px" }}>
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
    </div>
  );
}

export default App;
