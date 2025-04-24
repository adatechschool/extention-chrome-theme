function getDate () {
    const now = new Date();

    const options = { weekday: 'short', day: 'numeric' , month: 'long'};
    const dateFormat = new Intl.DateTimeFormat('fr-FR', options).format(now);

    return dateFormat
}

function getTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit'};
    const timeFormat = new Intl.DateTimeFormat('fr-FR', options).format(now);

    return timeFormat
}

function updateDateTime() {
    const dateDisplay = document.querySelector("#date");
    const timeDisplay = document.querySelector("#time");

    dateDisplay.innerHTML = getDate()
    timeDisplay.innerHTML = getTime()
}

updateDateTime();
const dateTimeInterval = setInterval(updateDateTime, 1000);
