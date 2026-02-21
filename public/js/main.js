// -------------------Habit Tracker Script

// Selected schedule
const habitSchedule = document.getElementById('habitSchedule');
const weeklyDay = document.getElementById('weeklyDay');
const customDays = document.getElementById('customDays');

// Delete button
const deleteButton = document.getElementById('deleteButton');


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
            const endpoint = `/habits/${deleteButton.dataset.doc}`;
            fetch(endpoint, {
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((data) => window.location.href = data.redirect)
            .catch(err => console.log(err));
    });



// form handling
// show form if theres no habit
// show habit card and add button if theres a habit
// show modal delete button