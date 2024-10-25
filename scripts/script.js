// Create the grid for 24 hours
const grid = document.getElementById('hourGrid');

// Generate 24 grid cells, one for each hour
for (let i = 0; i < 24; i++) {
    const hourBlock = document.createElement('div');
    hourBlock.textContent = i + 1;  // Display hour number
    hourBlock.id = 'hour-' + i;     // Set unique ID for each hour
    grid.appendChild(hourBlock);
}

// Function to format numbers with leading zeros
function formatNumber(number) {
    return number < 10 ? '0' + number : number;
}

// Function to update the countdown and display the current time
function updateTimer() {
    // Get current time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // Display the current time
    document.getElementById('currentTime').textContent = `Current Time: ${formatNumber(currentHour)}:${formatNumber(currentMinute)}:${formatNumber(currentSecond)}`;

    // Calculate the time left until midnight
    const timeLeftUntilMidnight = new Date();
    timeLeftUntilMidnight.setHours(24, 0, 0, 0);  // Midnight of the next day
    const timeDiff = timeLeftUntilMidnight - now;

    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Update the countdown display
    document.getElementById('hours').textContent = formatNumber(hoursLeft);
    document.getElementById('minutes').textContent = formatNumber(minutesLeft);
    document.getElementById('seconds').textContent = formatNumber(secondsLeft);

    // Update the grid: Highlight past hours
    for (let i = 0; i < 24; i++) {
        document.getElementById('hour-' + i).classList.remove('active');
    }
    for (let i = 0; i <= currentHour; i++) {
        document.getElementById('hour-' + i).classList.add('active');
    }
}

// Call the updateTimer function every second
setInterval(updateTimer, 1000);
