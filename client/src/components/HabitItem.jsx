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
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md text-left py-1 px-2 my-4 flex justify-between border border-gray-100 hover:bg-transparent/50 transition duration-300">
      <div className="card-expand cursor-pointer w-3/4 p-2 text-primary">
        <h3 className="text-xl font-bold">{habit.title}</h3>
        <h2 className="text-md">to <strong> {habit.goal}</strong></h2>
        <p className="text-md opacity-90">
          {habit.schedule === "Daily" && "Everyday"}

          {habit.schedule === "Weekly" &&
            `Every ${habit.weeklyDay} `}

          {habit.schedule === "Custom" &&
            `Every ${habit.customDays.join(", ")} `}

          at {habit.time}
        </p>
        <div className="flex gap-4 mt-2 text-secondary">
          <button className="hover:text-secondary-light cursor-pointer" onClick={() => onEdit(habit)}>
            Edit
          </button>
          <button className="hover:text-secondary-light cursor-pointer" onClick={() => {
            if (confirm("Delete this habit?")) {
              onDelete(habit._id);
            }
          }}>
            Delete
          </button>
        </div>
      </div>
      <div className="flex flex-col space-x-2 text-secondary items-center justify-center">
        <div className="flex">
          <p className="font-bold p-0.5 m-auto">{formatTime(elapsed)}</p>
          <button onClick={() => handleTimer(habit)} className="hover:text-secondary-light cursor-pointer p-0.5">
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitItem;