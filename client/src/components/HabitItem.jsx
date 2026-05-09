import { useState, useEffect } from "react";
import ConfirmModal from "./ConfirmModal";

function HabitItem({ habit, onDelete, onEdit }) {
  const [elapsed, setElapsed] = useState(habit.elapsedTime);
  const [isRunning, setIsRunning] = useState(habit.isRunning);
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowDeleteModal] = useState(false);

  
  const startIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M9.25 2.75A.75.75 0 0 1 10 2h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m11.75 11a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-7.974-2.725a15 15 0 0 0-.784-.508c-1.073-.652-1.609-.978-2.09-.617c-.48.36-.524 1.116-.612 2.628c-.024.427-.04.846-.04 1.222s.016.795.04 1.222c.088 1.512.132 2.267.612 2.628c.481.361 1.018.035 2.09-.617c.278-.169.547-.341.784-.508c.27-.19.565-.418.862-.66c1.075-.877 1.612-1.315 1.612-2.065s-.537-1.188-1.612-2.065c-.297-.242-.591-.47-.862-.66" clip-rule="evenodd"/></svg>;
  const stopIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M21 13.75a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-10 2.5v-5c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54c-.184-.077-.417-.077-.883-.077s-.699 0-.883.076a1 1 0 0 0-.54.541C8 10.551 8 10.784 8 11.25v5c0 .466 0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883m5 0v-5c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54c-.184-.077-.417-.077-.883-.077s-.699 0-.883.076a1 1 0 0 0-.54.541c-.077.184-.077.417-.077.883v5c0 .466 0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883" clip-rule="evenodd"/><path fill="currentColor" d="M10 2a.75.75 0 0 0 0 1.5h4A.75.75 0 0 0 14 2z"/></svg>;

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
      <div className="card-expand cursor-pointer w-3/4 p-2 text-primary"
      onClick={() => setExpanded(prev => !prev)}>
        <h3 className="text-xl font-bold capitalize">{habit.title}</h3>
        {expanded && (
          <>
        <h2 className="text-md">To <strong> {habit.goal}</strong></h2>
          </>
        )}
        <p className="text-md opacity-90">
          {habit.schedule === "Daily" && "Everyday "}

          {habit.schedule === "Weekly" &&
            `Every ${habit.weeklyDay} `}

          {habit.schedule === "Custom" &&
            `Every ${habit.customDays.join(", ")} `}

          at {habit.time}
        </p>
        {expanded && (
          <>
        <div className="flex gap-4 mt-2 text-secondary">
          <button className="hover:text-secondary-light cursor-pointer" onClick={(e) => {
            e.stopPropagation()
            onEdit(habit)
            }}>
            Edit
          </button>

          {showModal && 
              <ConfirmModal
                message="Delete this habit?"
                onConfirm={() => onDelete(habit._id)}
                onCancel={() => setShowDeleteModal(false)}
              />
            }
          <button className="hover:text-secondary-light cursor-pointer" onClick={(e) => {
            e.stopPropagation()
            setShowDeleteModal(true);
            }}>
            Delete
          </button>
        </div>
          
          </>
        )}
      </div>
      <div className="flex flex-col space-x-2 text-secondary items-center justify-center">
        <div className="flex">
          <p className="font-bold p-0.5 m-auto">{formatTime(elapsed)}</p>
          <button onClick={() => handleTimer(habit)} className="hover:text-secondary-light cursor-pointer p-0.5">
            {isRunning ? stopIcon : startIcon}
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default HabitItem;