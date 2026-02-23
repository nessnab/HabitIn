// -------------------Habit Tracker Script

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
        // resetForm();
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
// form modal for adding/editing habits
// add timer to each habit
// add calendar view to show habit completion history