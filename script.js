function getDate () {
    const now = new Date();
    const date = document.querySelector("#date");

    const options = { weekday: 'short', day: 'numeric' , month: 'long'};
    const dateFormat = new Intl.DateTimeFormat('fr-FR', options).format(now);

    date.innerHTML = `${dateFormat}`;

}

function getTime() {
    const now = new Date();
    const time = document.querySelector("#time");

    const timeFormat = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(now);

    time.innerHTML = `${timeFormat}`;

}


getDate();
getTime();