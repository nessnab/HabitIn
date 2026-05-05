import { useState, useEffect } from "react";

function HabitForm({ setHabits, setShowForm, editingHabit, setEditingHabit }) {
  const [form, setForm] = useState({
    title: "",
    goal: "",
    schedule: "",
    time: ""
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (editingHabit) {
      setForm({
        title: editingHabit.title || "",
        goal: editingHabit.goal || "",
        schedule: editingHabit.schedule || "",
        time: editingHabit.time || ""
      });
    }
  }, [editingHabit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;
    if (editingHabit) {
      // edit existing habit
      res = await fetch(`/api/habits/${editingHabit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const updatedHabit = await res.json();
      setHabits(prev => prev.map(habit => habit._id === updatedHabit._id ? updatedHabit : habit));
      setEditingHabit(null);
      setShowForm(false);
    } else {
      // create new habit
      res = await fetch('/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const newHabit = await res.json();
    
      setHabits(prev => [...prev, newHabit]);
      setShowForm(false);
    }
  
    // reset form after submission
    setForm({
      title: "",
      goal: "",
      schedule: "",
      time: ""
    });
  };
  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <input 
        name="title"
        placeholder="Enter your habit title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input 
        name="goal"
        placeholder="Enter your habit goal"
        value={form.goal}
        onChange={handleChange}
        required
      />
      <select 
        name="schedule"
        value={form.schedule}
        onChange={handleChange}
        required
      >
        <option value="">Select a schedule</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Custom">Custom</option>
      </select>
      <input 
        name="time"
        value={form.time}
        onChange={handleChange}
        type="time"
        required
      />
      <button type="submit">Add Habit</button>
    
    </form>
  );
};



export default HabitForm;
