// -------------------Habit Tracker Script

// Form button
const habitForm = document.getElementById('habitForm')
const showFormBtn = document.getElementById('showFormBtn');

// Selected schedule
const habitSchedule = document.getElementById('habitSchedule');
const weeklyDay = document.getElementById('weeklyDay');
const customDays = document.getElementById('customDays');

// Delete button
const deleteButton = document.getElementById('deleteButton');
const deleteModal = document.getElementById('deleteModal');
const cancelBtn = document.getElementById('cancelBtn');
const deleteBtnModal = document.getElementById('deleteBtnModal');

// Show form button event listener
const formToggle = () => {
    habitForm.classList.toggle('hidden');
    showFormBtn.classList.toggle('hidden');
}

showFormBtn.addEventListener('click', formToggle);

// Schedule select event listener
habitSchedule.addEventListener('change', (e) => {
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
})
console.log(habitSchedule.value);

// Delete button event listener
deleteButton.addEventListener('click', (e) => {
    deleteModal.showModal();
});

cancelBtn.addEventListener('click', (e) => {
    deleteModal.close();
});

deleteBtnModal.addEventListener('click', (e) => {
            const endpoint = `/habits/${deleteButton.dataset.doc}`;
            fetch(endpoint, {
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((data) => window.location.href = data.redirect)
            .catch(err => console.log(err));
    });





// notes
// show add button if theres a habit, if not show form
// add edit button to each habit
// form modal for adding/editing habits
// add timer to each habit
// add calendar view to show habit completion history