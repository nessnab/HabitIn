import { useEffect, useState } from 'react';
import HabitForm from './components/HabitForm';

function App() {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>HabitIn</h1>

      {loading && <p>Loading...</p>}

      <button onClick={() => setShowForm(prev => !prev)}>
        Add Habit
      </button>

      {showForm && (
        <HabitForm setHabits={setHabits} />
      )}

      {!loading && habits.length === 0 && (
        <p>No habits yet</p>
      )}

      {!loading && habits.map(habit => (
        <div key={habit._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{habit.title}</h3>
          <p>to get {habit.goal}</p>
          <p>{habit.schedule} at {habit.time}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
