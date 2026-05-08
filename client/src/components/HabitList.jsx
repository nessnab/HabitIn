import HabitItem from './HabitItem';

function HabitList ({ habits, onDelete, onEdit, onTimer }) {
  if (habits.length === 0) {
    return <div className='py-9'>
      <h2 class="text-lg font-semibold text-gray-800">
        Nothing here… yet👀
      </h2>
      <p class="text-gray-500 text-md mt-1">
       Let's create your first habit
      </p>
    </div> ;
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