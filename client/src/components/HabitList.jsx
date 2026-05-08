import HabitItem from './HabitItem';

function HabitList ({ habits, onDelete, onEdit, onTimer }) {
  if (habits.length === 0) {
    return <p>Nothing here… yet 👀</p> ;
  }

  return (
    <div className='p-6 mx-auto max-w-lg'>
    <div className="space-y-6 p-5 ">
      {habits.map(habit => (
        <HabitItem 
        key={habit._id} 
        habit={habit} 
        onDelete={onDelete} 
        onEdit={onEdit}
        onTimer={onTimer}
        />
      ))}
    </div>

    </div>
  )
}

export default HabitList;