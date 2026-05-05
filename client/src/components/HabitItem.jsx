import { useState, useEffect } from "react";

function HabitItem({ habit, onDelete, onEdit }) {
  const [elapsed, setElapsed] = useState(habit.elapsedTime);
  const [isRunning, setIsRunning] = useState(habit.isRunning);

  const handleTimer = async () => {
    if (isRunning) {
      // stop timer
      await fetch(`/api/habits/${habit._id}/stop`, { method: "POST" });
      const res = await fetch(`/api/habits/${habit._id}/timer`);
      const data = await res.json();

      setElapsed(data.elapsedTime);
      setIsRunning(false);
    } else {
      // start timer
      await fetch(`/api/habits/${habit._id}/start`, { method: "POST" });
      setIsRunning(true);
      
    }
  }

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };
  
  useEffect(() => {
  if (habit.isRunning && habit.lastStartedAt) {
    const diff = Math.floor(
      (Date.now() - new Date(habit.lastStartedAt)) / 1000
    );

    setElapsed(habit.elapsedTime + diff);
    setIsRunning(true);
  }
  }, []);

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{habit.title}</h3>
      <p>to get {habit.goal}</p>
      <p>{habit.schedule} at {habit.time}</p>
      <button onClick={() => {
        if (confirm("Delete this habit?")) {
          onDelete(habit._id);
        }
      }}>
        Delete
      </button>
      <button onClick={() => onEdit(habit)}>
        Edit
      </button>
      <button onClick={() => handleTimer(habit)}>
        Start
      </button>
      <p>{formatTime(elapsed)}</p>
    </div>
  );
}

export default HabitItem;