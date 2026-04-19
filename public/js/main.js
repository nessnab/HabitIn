// -------------------Habit Tracker frontend Script

// Form button
const habitForm = document.getElementById('habitForm')
const showFormBtn = document.getElementById('showFormBtn');

// Selected schedule
const habitSchedule = document.getElementById('habitSchedule');
const weeklyDay = document.getElementById('weeklyDay');
const customDays = document.getElementById('customDays');

// Edit button
const editButtons = document.querySelectorAll('.editBtn');
const editBtn = document.getElementById('editBtn');

// Habit form
const habitTitle = document.getElementById('habitTitle');
const habitGoal = document.getElementById('habitGoal');
const habitTime = document.getElementById('habitTime');

// Delete button
const deleteButtons = document.querySelectorAll('.deleteBtn');
const deleteBtn = document.getElementById('deleteBtn');
const deleteModal = document.getElementById('deleteModal');
const cancelBtn = document.getElementById('cancelBtn');
const deleteConfirmBtn = document.getElementById('deleteConfirmBtn');

// timer button
const startIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M9.25 2.75A.75.75 0 0 1 10 2h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m11.75 11a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-7.974-2.725a15 15 0 0 0-.784-.508c-1.073-.652-1.609-.978-2.09-.617c-.48.36-.524 1.116-.612 2.628c-.024.427-.04.846-.04 1.222s.016.795.04 1.222c.088 1.512.132 2.267.612 2.628c.481.361 1.018.035 2.09-.617c.278-.169.547-.341.784-.508c.27-.19.565-.418.862-.66c1.075-.877 1.612-1.315 1.612-2.065s-.537-1.188-1.612-2.065c-.297-.242-.591-.47-.862-.66" clip-rule="evenodd"/></svg>`;
const stopIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M21 13.75a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-10 2.5v-5c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54c-.184-.077-.417-.077-.883-.077s-.699 0-.883.076a1 1 0 0 0-.54.541C8 10.551 8 10.784 8 11.25v5c0 .466 0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883m5 0v-5c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54c-.184-.077-.417-.077-.883-.077s-.699 0-.883.076a1 1 0 0 0-.54.541c-.077.184-.077.417-.077.883v5c0 .466 0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883" clip-rule="evenodd"/><path fill="currentColor" d="M10 2a.75.75 0 0 0 0 1.5h4A.75.75 0 0 0 14 2z"/></svg>`;

// Close modal
const closeFormBtn = document.getElementById('closeFormBtn');
const discardBtn = document.getElementById('discardBtn');
const closeFormDialog = document.getElementById('closeFormDialog');
let currentHabit = {};

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

// Edit function
editButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        formToggle();
        editBtn.dataset.doc = btn.dataset.doc;
        const endpoint = `/habits/${btn.dataset.doc}`;
        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                // Populate form with habit data
                habitForm.action = `/habits/${data._id}`;
                habitTitle.value = data.title;
                habitGoal.value = data.goal;
                habitTime.value = data.time;
                habitSchedule.value = data.schedule;
                currentHabit = { ...data }; // Store current habit data for change detection

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

                // Trigger UI update
                habitScheduleValue({ target: { value: data.schedule } });


                // weeklyDay.value = data.weeklyDay ? data.weeklyDay : '';
                // customDays.value = data.customDays ? data.customDays.join(', ') : '';

                // if (typeof habitScheduleValue === 'function') {
                // habitScheduleValue({ target: { value: data.schedule } });
                // }
            })
            .catch(err => console.error(err));

    });
});


// Delete button event listener
deleteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        deleteBtn.dataset.doc = btn.dataset.doc;
        deleteModal.showModal();
    });
})

// Cancel button event listener
cancelBtn.addEventListener('click', (e) => {
    deleteModal.close();
});

// Delete function
deleteConfirmBtn.addEventListener('click', () => {
    const endpoint = `/habits/${deleteBtn.dataset.doc}`;
    fetch(endpoint, {method: 'DELETE'})
        .then((response) => response.json())
        .then((data) => window.location.href = data.redirect)
        .catch(err => console.log(err));
});

// Timer functions

let timerInterval;
let elapsed = 0;

const startTimer = (habitId) => {
    clearInterval(timerInterval);
    fetch(`/habits/${habitId}/timer`, {method: 'GET'})
        .then(res => res.json())
        .then(data => {
        elapsed = data.elapsedTime || 0; // base from DB
        const startTime = Date.now();

        timerInterval = setInterval(() => {
            const diff = Math.floor((Date.now() - startTime) / 1000);
            const total = elapsed + diff;
            document.querySelector(`#timer-${habitId}`).textContent = formatTime(total);
        }, 1000);
    })
    .catch(err => console.error(err));
}

const stopTimer = (habitId) => {
    clearInterval(timerInterval);

    const timerDisplay = document.querySelector(`#timer-${habitId}`).textContent;
    const [mins, secs] = timerDisplay.split(":").map(Number);
    elapsed = mins * 60 + secs;

    // Save elapsed time to backend
    const endpoint = `/habits/${habitId}/timer`;
    fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ elapsed })
    })
        .then(res => res.json())
        .then(data => {
        console.log("Timer saved:", data);
        })
        .catch(err => console.error(err));
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Attach timer event listeners
document.querySelectorAll('.timerBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        const habitId = btn.dataset.doc;
        // const timerDisplay = document.querySelector(`#timer-${habitId}`);

        if (!btn.dataset.running || btn.dataset.running === "false") {
            startTimer(habitId);
            btn.dataset.running = "true";
            btn.innerHTML = stopIcon;
        } else {
            stopTimer(habitId);
            btn.dataset.running = "false";
            btn.innerHTML = startIcon;
        }
    });
});


// load stored timer
const loadTimer = (req, res) => {
    const habitId = req.params.id;
    fetch(`/habits/${habitId}/timer`)
        .then(res => res.json())
        .then(data => {
            const timerDisplay = document.querySelector(`#timer-${habitId}`);
            timerDisplay.textContent = formatTime(data.elapsedTime);
        })
        .catch(err => console.error('Error loading timer:', err));
}

// Expanded card detail
const cards = document.querySelectorAll('.card-expand');

cards.forEach(card => {
    card.addEventListener('click', () => {
    
        cards.forEach(c => {
            if (c !== card) {
                c.querySelector('.habit-goal').classList.add('hidden');
                c.querySelector('.btn-expand').classList.add('hidden');
            }
        });
        const habitGoal = card.querySelector('.habit-goal');
        const btnCard = card.querySelector('.btn-expand');
        habitGoal.classList.toggle('hidden');
        btnCard.classList.toggle('hidden');
    });
});


// Reset form function
const resetForm = (data) => {
    habitForm.reset();
    data.title = '';
    data.goal = '';
    data.time = '';
    data.schedule = '';
    weeklyDay.classList.add('hidden');
    customDays.classList.add('hidden');
}




// notes
// add checked habits to a "Completed Habits" section
// add calendar view to show habit completion history
// add suggestions for new habits based on user interests
// add notifications to remind users to complete their habits

// add user authentication to allow multiple users to track their habits separately

// timer keep tracking after page refresh by saving start time and elapsed time to backend, then calculating total elapsed time on page load