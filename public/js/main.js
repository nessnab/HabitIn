// -------------------Habit Tracker frontend Script

// Form button
const habitForm = document.getElementById('habitForm')
const showFormBtn = document.getElementById('showFormBtn');

// Selected schedule
const habitSchedule = document.getElementById('habitSchedule');
const weeklyDay = document.getElementById('weeklyDay');
const customDays = document.getElementById('customDays');

// Habit form
const habitTitle = document.getElementById('habitTitle');
const habitGoal = document.getElementById('habitGoal');
const habitTime = document.getElementById('habitTime');

// Delete button
const deleteModal = document.getElementById('deleteModal');
const cancelBtn = document.getElementById('cancelBtn');
const deleteConfirmBtn = document.getElementById('deleteConfirmBtn');

let currentEditId = null;
let currentHabit = {};
const timers = {};


// timer button
const startIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M9.25 2.75A.75.75 0 0 1 10 2h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m11.75 11a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-7.974-2.725a15 15 0 0 0-.784-.508c-1.073-.652-1.609-.978-2.09-.617c-.48.36-.524 1.116-.612 2.628c-.024.427-.04.846-.04 1.222s.016.795.04 1.222c.088 1.512.132 2.267.612 2.628c.481.361 1.018.035 2.09-.617c.278-.169.547-.341.784-.508c.27-.19.565-.418.862-.66c1.075-.877 1.612-1.315 1.612-2.065s-.537-1.188-1.612-2.065c-.297-.242-.591-.47-.862-.66" clip-rule="evenodd"/></svg>`;
const stopIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M21 13.75a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-10 2.5v-5c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54c-.184-.077-.417-.077-.883-.077s-.699 0-.883.076a1 1 0 0 0-.54.541C8 10.551 8 10.784 8 11.25v5c0 .466 0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883m5 0v-5c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54c-.184-.077-.417-.077-.883-.077s-.699 0-.883.076a1 1 0 0 0-.54.541c-.077.184-.077.417-.077.883v5c0 .466 0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883" clip-rule="evenodd"/><path fill="currentColor" d="M10 2a.75.75 0 0 0 0 1.5h4A.75.75 0 0 0 14 2z"/></svg>`;

// Close modal
const closeFormBtn = document.getElementById('closeFormBtn');
const discardBtn = document.getElementById('discardBtn');
const closeFormDialog = document.getElementById('closeFormDialog');

closeFormBtn.addEventListener('click', (data) => {
    const formContainValues = habitTitle.value || habitGoal.value || habitSchedule.value || habitTime.value;
    const formValuesUpdated = habitTitle.value !== currentHabit.title || habitGoal.value !== currentHabit.goal || habitSchedule.value !== currentHabit.schedule || habitTime.value !== currentHabit.time || weeklyDay.querySelector('input[name="weeklyDay"]:checked')?.value !== currentHabit.weeklyDay || JSON.stringify(Array.from(customDays.querySelectorAll('input[name="customDays"]:checked')).map(input => input.value)) !== JSON.stringify(currentHabit.customDays);
  
    if (formContainValues && formValuesUpdated) {
        closeFormDialog.showModal();
    } else {
        formToggle();
        resetForm();
    }
});

discardBtn.addEventListener('click', () => {
  closeFormDialog.close();
  formToggle();
  resetForm();
});

// Show form button event listener
const formToggle = () => {
    habitForm.classList.toggle('hidden');
    showFormBtn.classList.toggle('hidden');
}

showFormBtn.addEventListener('click', formToggle);

// Schedule select event listener
habitSchedule.addEventListener('change', (e) => {
    habitScheduleValue(e);
})

const habitScheduleValue = (e) => {
    if (e.target.value === 'Weekly') {
        weeklyDay.classList.remove('hidden');
        customDays.classList.add('hidden');
    } else if (e.target.value === 'Custom') {
        customDays.classList.remove('hidden');
        weeklyDay.classList.add('hidden');
    } else {
        weeklyDay.classList.add('hidden');
        customDays.classList.add('hidden');
    }
}

document.addEventListener('click', (e) => {


    const editBtn = e.target.closest('.editBtn');
    if (editBtn) return handleEdit(editBtn.dataset.doc);

    const deleteBtn = e.target.closest('.deleteBtn');
    if (deleteBtn) return openDeleteModal(deleteBtn.dataset.doc);

    const timerBtn = e.target.closest('.timerBtn');
    if (timerBtn) return handleTimer(timerBtn);

});

// DELETE
let deleteId = null;

const openDeleteModal = (id) => {
    deleteId = id;
    deleteModal.showModal();
};

deleteConfirmBtn.addEventListener('click', async () => {
    if (!deleteId) return;

    await fetch(`/api/habits/${deleteId}`, { method: 'DELETE' });

    const card = document.querySelector(`[data-id="${deleteId}"]`);
    if (card) card.remove();

    deleteModal.close();
    deleteId = null;
});

// EDIT
const handleEdit = async (id) => {
    currentEditId = id;
    formToggle();

    const res = await fetch(`/habits/${id}`);
    const data = await res.json();

    habitTitle.value = data.title;
    habitGoal.value = data.goal;
    habitTime.value = data.time;
    habitSchedule.value = data.schedule;

    // Auto-check weekly or custom days
    if (data.schedule === "Weekly") {
        document.querySelectorAll('input[name="weeklyDay"]').forEach(input => {
        input.checked = input.value === data.weeklyDay;
    });
    } else if (data.schedule === "Custom") {
        document.querySelectorAll('input[name="customDays"]').forEach(input => {
        input.checked = data.customDays?.includes(input.value);
    });
    }

    currentHabit = { ...data };

    habitScheduleValue({ target: { value: data.schedule } });
};

// FORM SUBMIT
habitForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(habitForm);

    const data = {
        title: formData.get('title'),
        goal: formData.get('goal'),
        schedule: formData.get('schedule'),
        weeklyDay: formData.get('weeklyDay'),
        customDays: formData.getAll('customDays'),
        time: formData.get('time'),
    };

    let res;

    if (currentEditId) {
        res = await fetch(`/api/habits/${currentEditId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } else {
        res = await fetch('/api/habits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    const result = await res.json();

    if (currentEditId) {
        updateHabitUI(result);
    } else {
        addHabitToUI(result);
    }

    resetForm();
    formToggle();
    currentEditId = null;
});

// ADD new Habit to UI
const addHabitToUI = (habit) => {
    const list = document.getElementById('habitsList');
    if (!list) return;
    
    // remove empty state if exists
    const emptyState = document.getElementById('emptyState');
    if (emptyState) emptyState.remove();

    const card = document.createElement('div');
    card.className = "habit-card bg-white rounded-lg shadow-md text-left py-1 px-2 my-4 flex justify-between border border-gray-100 hover:bg-transparent/50 transition duration-300";
    card.dataset.id = habit._id;

    card.innerHTML = `
        <!-- LEFT -->
        <div class="card-expand cursor-pointer w-3/4 p-2 text-primary">
            <h3 class="text-xl font-bold capitalize">
                ${habit.title}
            </h3>

            <h2 class="habit-goal hidden text-md">
                To <span class="font-bold">${habit.goal}</span>
            </h2>

            <p class="text-md opacity-90">
                ${
                    habit.schedule === "Daily" ? habit.schedule :
                    habit.schedule === "Weekly" ? "Every " + habit.weeklyDay :
                    habit.schedule === "Custom" ? "Every " + (habit.customDays || []).join(", ") :
                    ""
                }
                at ${habit.time}
            </p>

            <div class="btn-expand hidden flex gap-4 mt-2 text-secondary">
                <button data-doc="${habit._id}" class="editBtn hover:text-secondary-light cursor-pointer">
                    Edit
                </button>
                <button data-doc="${habit._id}" class="deleteBtn hover:text-secondary-light cursor-pointer">
                    Delete
                </button>
            </div>
        </div>

        <!-- RIGHT -->
        <div class="flex flex-col items-center justify-center text-secondary">
            <div class="flex items-center gap-1">
                <p class="timer-display font-bold" id="timer-${habit._id}">
                    00:00
                </p>

                <button class="timerBtn hover:text-secondary-light cursor-pointer"
                        data-elapsed="0"
                        data-doc="${habit._id}">
                    ${startIcon}
                </button>
            </div>
        </div>
    `;

    list.prepend(card);
};

// Update UI
const updateHabitUI = (habit) => {
    const card = document.querySelector(`[data-id="${habit._id}"]`);
    if (!card) return;

    card.querySelector('h3').textContent = habit.title;
    card.querySelector('.habit-goal').innerHTML = `To <span class="font-bold">${habit.goal}</span>`;
    card.querySelector('p').textContent = 
        habit.schedule === "Daily" ? habit.schedule + ` at ${habit.time}` :
        habit.schedule === "Weekly" ? "Every " + habit.weeklyDay + ` at ${habit.time}` :
        habit.schedule === "Custom" ? "Every " + (habit.customDays || []).join(", ") + ` at ${habit.time}` :
        "";
};

// TImer functions
const handleTimer = (btn) => {
    const id = btn.dataset.doc;

    if (!timers[id]) {
        btn.innerHTML = stopIcon;
        startTimer(id);
    } else {
        btn.innerHTML = startIcon;
        stopTimer(id);
    }
};

const startTimer = async (id) => {

    if (timers[id]) clearInterval(timers[id]);

    await fetch(`/api/habits/${id}/start`, { method: 'POST' });

    const res = await fetch(`/api/habits/${id}/timer`);
    const data = await res.json();

    let elapsed = data.elapsedTime || 0;
    if (data.isRunning && data.lastStartedAt) {
        const diff = Math.floor((Date.now() - new Date(data.lastStartedAt)) / 1000);
        elapsed += diff;
    }

    const el = document.querySelector(`#timer-${id}`);

    timers[id] = setInterval(() => {
        elapsed++;
        if (el) el.textContent = formatTime(elapsed);
    }, 1000);
};

const stopTimer = async (id) => {

    if (timers[id]) {
        clearInterval(timers[id]);
        delete timers[id];
    }

    await fetch(`/api/habits/${id}/stop`, { method: 'POST' });

    const res = await fetch(`/api/habits/${id}/timer`);
    const data = await res.json();

    document.querySelector(`#timer-${id}`).textContent =
        formatTime(data.elapsedTime);
};

const resetForm = () => {
    habitForm.reset();
    weeklyDay.classList.add('hidden');
    customDays.classList.add('hidden');
};


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Expanded card detail
document.addEventListener('click', (e) => {
    const card = e.target.closest('.card-expand');
    if (!card) return;

    document.querySelectorAll('.card-expand').forEach(c => {
        if (c !== card) {
            c.querySelector('.habit-goal')?.classList.add('hidden');
            c.querySelector('.btn-expand')?.classList.add('hidden');
        }
    });

    card.querySelector('.habit-goal')?.classList.toggle('hidden');
    card.querySelector('.btn-expand')?.classList.toggle('hidden');
});



// Timer keep tracking after page refresh 
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/api/habits');
        const habits = await res.json();

        habits.forEach(habit => {
            const timerEl = document.querySelector(`#timer-${habit._id}`);
            const btn = document.querySelector(`.timerBtn[data-doc="${habit._id}"]`);

            if (!timerEl) return;

            let baseElapsed = habit.elapsedTime || 0;

            if (habit.isRunning && habit.lastStartedAt) {
                // calculate real elapsed time
                const diff = Math.floor(
                    (Date.now() - new Date(habit.lastStartedAt)) / 1000
                );
                baseElapsed += diff;

                // update button state
                if (btn) {
                    btn.dataset.running = "true";
                    btn.innerHTML = stopIcon;
                }

                // start ticking
                startTimer(habit._id);
            } else {
                // just display stored time
                timerEl.textContent = formatTime(baseElapsed);

                if (btn) {
                    btn.dataset.running = "false";
                    btn.innerHTML = startIcon;
                }
            }
        });

    } catch (err) {
        console.error("Error loading timers:", err);
    }
});



// notes
// add checked habits to a "Completed Habits" section
// add calendar view to show habit completion history
// add suggestions for new habits based on user interests
// add notifications to remind users to complete their habits
// timer keep tracking after page refresh by saving start time and elapsed time to backend, then calculating total elapsed time on page load