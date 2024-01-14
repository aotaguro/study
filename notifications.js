let eventsByDate = {};

// Load events from Local Storage 
if (localStorage.getItem('eventsByDate')) {
    eventsByDate = JSON.parse(localStorage.getItem('eventsByDate'));
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function checkReminders() {
    const currentTime = new Date();
    const selectedDateKey = formatDate(currentTime);
    const events = eventsByDate[selectedDateKey] || [];

    events.forEach(event => {
        const eventDateTime = new Date(event.dateTime);

        if (currentTime >= eventDateTime && !event.alerted) {
            alert(`Study reminder "${event.name}"!`);
            event.alerted = true; // Set a flag to avoid repeated alerts

            // Save events to Local Storage after marking an event as alerted
            localStorage.setItem('eventsByDate', JSON.stringify(eventsByDate));
        }
    });
}

setInterval(checkReminders, 1000 * 1); // Check every second
