import HabitItem from './HabitItem';

function HabitList ({ habits, onDelete }) {
  if (habits.length === 0) {
    return <p>Nothing here… yet 👀</p>;
  }

  return (
    <div>
      {habits.map(habit => (
        <HabitItem key={habit._id} habit={habit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default HabitList;