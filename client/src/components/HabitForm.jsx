import { useState } from "react";

function HabitForm({ setHabits }) {
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const res = await fetch('/api/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
    const newHabit = await res.json();
  
    setHabits(prev => [...prev, newHabit]);
  
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
