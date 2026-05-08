import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';

function HabitApp({ user }) {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className='min-h-2/3 flex-1 text-center items-center'>

    {user ? (
      <>
        <div className="text-center items-center capitalize p-6 mx-auto">
            <h1 className='text-center text-3xl font-bold'>Your Habit List</h1>

            {loading && <p>Loading...</p>}


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

            <button onClick={() => setShowForm(prev => !prev)} className='flex bg-gradient-to-r from-primary to-secondary text-white rounded-md px-4 py-2 hover:opacity-80 mx-auto cursor-pointer'>
              Add Habit
            </button>
          </div>
      </>
      ) : (
      <>
        <div className="text-center items-center pt-15 m-auto">
          <p>
            You're not logged in, please <Link to='/login' className='text-primary'>log in</Link> or <Link to='/login' className='text-primary'>sign up</Link> to start a habit
          </p>
        </div>
      </>
      )}
    </div>
  )
}

export default HabitApp;