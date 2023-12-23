let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let events = []

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            //creating individual cells, filing them up with data.
            let cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            } else {
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date

                for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
                    let currentEvent = events[eventIndex];
                    if (date === currentEvent.date.getDate() && year === currentEvent.date.getFullYear() && month === currentEvent.date.getMonth()) {
                        const div = document.createElement('div');
                        div.classList.add('event');
                        div.textContent = currentEvent.name;
                        cell.appendChild(div);
                    }
                }

       // Adding click event listener to each cell
cell.addEventListener("click", (event) => {
    // Use prompt to get user input
    const description = prompt("Enter assignment description:");

    // Check if the user clicked "Cancel" or entered an empty description
    if (description === null || description.trim() === "") {
        alert("No description provided.");
    } else {
        // Create a div element for the event
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.textContent = description;

        // Append the event div to the clicked cell
        cell.appendChild(eventDiv);

        // Adding contextmenu event listener to each event div
        eventDiv.addEventListener("contextmenu", (event) => {
            // Prevent the default context menu
            event.preventDefault();
            
            // Remove the event div
            cell.removeChild(eventDiv);
        });
    }
});

                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
}
