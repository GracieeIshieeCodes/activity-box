const grid = document.getElementById('contributionGrid');
const dayNumbers = document.getElementById('dayNumbers');
const legend = document.getElementById('legend');
const clearButton = document.getElementById('clearGrid');
const colors = ['#ebedf0', '#F5EFFF', '#E5D9F2', '#CDC1FF', '#A294F9'];
let selectedColor = 0;

// Create day numbers 1 to 31 without borders
for (let i = 1; i <= 31; i++) {
    const dayNumber = document.createElement('div');
    dayNumber.textContent = i;
    dayNumbers.appendChild(dayNumber);
}

// Create 13 x 31 grid (portrait mode)
for (let i = 0; i < 13 * 31; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.dataset.level = 0;

    // Load saved colors from localStorage
    const savedColor = localStorage.getItem(`day-${i}`);
    if (savedColor) {
        day.style.backgroundColor = colors[savedColor];
        day.dataset.level = savedColor;
    }

    // Change color on click
    day.addEventListener('click', function () {
        this.style.backgroundColor = colors[selectedColor];
        this.dataset.level = selectedColor;
        localStorage.setItem(`day-${i}`, selectedColor); // Save the selected color
    });

    grid.appendChild(day);
}

// Legend click event to select color
legend.addEventListener('click', function (e) {
    if (e.target.classList.contains('legend-color')) {
        selectedColor = parseInt(e.target.dataset.color);
    }
});

// Clear grid
clearButton.addEventListener('click', function () {
    document.querySelectorAll('.day').forEach((day, i) => {
        day.style.backgroundColor = colors[0];
        day.dataset.level = 0;
        localStorage.removeItem(`day-${i}`); // Clear saved color in localStorage
    });
});