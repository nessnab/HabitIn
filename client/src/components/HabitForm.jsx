import { useState, useEffect } from "react";
import ConfirmModal from "./ConfirmModal";

function HabitForm({ setHabits, setShowForm, editingHabit, setEditingHabit }) {
  const [showModal, setShowCloseModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    goal: "",
    schedule: "",
    weeklyDay: "",
    customDays: [],
    time: ""
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleCustomDays = (day) => {
  if (form.customDays.includes(day)) {
    setForm({
      ...form,
      customDays: form.customDays.filter(
        d => d !== day
      )
    });
  } else {
    setForm({
      ...form,
      customDays: [...form.customDays, day]
    });
  }
  };

  useEffect(() => {
    if (editingHabit) {
      setForm({
        title: editingHabit.title || "",
        goal: editingHabit.goal || "",
        schedule: editingHabit.schedule || "", 
        weeklyDay: editingHabit.weeklyDay || "",
        customDays: editingHabit.customDays || [],
        time: editingHabit.time || ""
      });
    }
  }, [editingHabit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form
    };
    if (form.schedule !== "Weekly") {
      payload.weeklyDay = null;
    }
    if (form.schedule !== "Custom") {
      payload.customDays = [];
    }

    let res;
    if (editingHabit) {
      // edit existing habit
      res = await fetch(`/api/habits/${editingHabit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
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
        body: JSON.stringify(payload)
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
      weeklyDay: "",
      customDays: [],
      time: ""
    });
  };

  const handleCloseDialog = () => {
      const isDirty =
      form.title !== (editingHabit?.title || "") ||
      form.goal !== (editingHabit?.goal || "") ||
      form.schedule !== (editingHabit?.schedule || "") ||
      form.weeklyDay !== (editingHabit?.weeklyDay || "") ||
      form.time !== (editingHabit?.time || "") ||
      JSON.stringify(form.customDays) !==
        JSON.stringify(editingHabit?.customDays || []);
      if (isDirty) {
        setShowCloseModal(true);
      } else {
        setShowForm(false);
      }
    }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-bg shadow-md rounded-lg p-7 space-y-4 text-left bg-transparent">

      <div className="flex items-center justify-between">
        <span className="text-primary text-3xl font-bold max-w-md">Start a New Habit</span>

          {showModal && 
              <ConfirmModal
                message="Discard unsaved changes?"
                onConfirm={() => setShowForm(false)}
                onCancel={() => setShowCloseModal(false)}
              />
            }
        <button type="button" onClick={() => handleCloseDialog()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="font-bold text-red-500 size-3 w-6 h-6 inline-block ml-2 cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <label> Habit Title
      <input 
        name="title"
        placeholder="Enter your habit title"
        value={form.title}
        onChange={handleChange}
        className="my-2 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light"
        required
      />
      </label>

      <label> Habit Goal
      <input 
        name="goal"
        placeholder="Enter your habit goal"
        value={form.goal}
        onChange={handleChange}
        className="my-2 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light"
        required
      />
      </label>

      <label> Habit Schedule 
      <select 
        name="schedule"
        value={form.schedule}
        onChange={handleChange}
        className="my-2 block w-full border border-gray-300 rounded-md px-3 py-2   focus:ring-1 focus:ring-primary-light focus:border-primary-light"
        required
      >
        <option value="" disabled>Select schedule</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Custom">Custom</option>
      </select>
      </label>

      {/* Weekly */}
      {form.schedule === "Weekly" && (
        <fieldset className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2  focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light">
          
          <legend>Select Day</legend>

          <label className="pr-2">
            <input className="mr-1"
              type="radio"
              name="weeklyDay"
              value="Sunday"
              checked={form.weeklyDay === "Sunday"}
              onChange={handleChange}
            />
            Sun
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="radio"
              name="weeklyDay"
              value="Monday"
              checked={form.weeklyDay === "Monday"}
              onChange={handleChange}
            />
            Mon
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="radio"
              name="weeklyDay"
              value="Tuesday"
              checked={form.weeklyDay === "Tuesday"}
              onChange={handleChange}
            />
            Tue
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="radio"
              name="weeklyDay"
              value="Wednesday"
              checked={form.weeklyDay === "Wednesday"}
              onChange={handleChange}
            />
            Wed
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="radio"
              name="weeklyDay"
              value="Thursday"
              checked={form.weeklyDay === "Thursday"}
              onChange={handleChange}
            />
            Thu
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="radio"
              name="weeklyDay"
              value="Friday"
              checked={form.weeklyDay === "Friday"}
              onChange={handleChange}
            />
            Fri
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="radio"
              name="weeklyDay"
              value="Saturday"
              checked={form.weeklyDay === "Saturday"}
              onChange={handleChange}
            />
            Sat
          </label>

        </fieldset>
      )}

      {/* Custom Days */}
      {form.schedule === "Custom" && (
        <fieldset className="my-2 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light">
          <legend>Select Day</legend>

          <label className="pr-2">
            <input className="mr-1"
              type="checkbox"
              checked={form.customDays.includes("Sunday")}
              onChange={() => handleCustomDays("Sunday")}
            />
            Sun
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="checkbox"
              checked={form.customDays.includes("Monday")}
              onChange={() => handleCustomDays("Monday")}
            />
            Mon
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="checkbox"
              checked={form.customDays.includes("Tuesday")}
              onChange={() => handleCustomDays("Tuesday")}
            />
            Tue
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="checkbox"
              checked={form.customDays.includes("Wednesday")}
              onChange={() => handleCustomDays("Wednesday")}
            />
            Wed
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="checkbox"
              checked={form.customDays.includes("Thursday")}
              onChange={() => handleCustomDays("Thursday")}
            />
            Thu
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="checkbox"
              checked={form.customDays.includes("Friday")}
              onChange={() => handleCustomDays("Friday")}
            />
            Fri
          </label>
          <label className="pr-2">
            <input className="mr-1"
              type="checkbox"
              checked={form.customDays.includes("Saturday")}
              onChange={() => handleCustomDays("Saturday")}
            />
            Sat
          </label>
        </fieldset>
      )}

      <label>Habit Time
      <input 
        name="time"
        value={form.time}
        onChange={handleChange}
        type="time"
        className="my-2 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light"
        required
      />
      </label>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded mr-4 hover:bg-primary-light">Add Habit</button>
    
    </form>
  );
};



export default HabitForm;
