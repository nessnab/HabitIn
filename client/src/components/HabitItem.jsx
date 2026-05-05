function HabitItem({ habit, onDelete, onEdit }) {
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
    </div>
  );
}

export default HabitItem;