// ===============================
// DEFAULT EVENT DATA
// ===============================

const defaultEvents = {

    "web-development": {
        name: "Web Development Workshop",
        category: "Workshop",
        date: "October 15, 2026",
        description: "Learn HTML, CSS and JavaScript through practical activities.",
        time: "10:00 AM - 1:00 PM",
        venue: "Seminar Hall"
    },

    "ai-technology": {
        name: "AI & Technology Seminar",
        category: "Seminar",
        date: "October 20, 2026",
        description: "Discover emerging technologies and the future of Artificial Intelligence.",
        time: "10:00 AM - 1:00 PM",
        venue: "Auditorium"
    },

    "career-development": {
        name: "Career Development Workshop",
        category: "Career",
        date: "October 25, 2026",
        description: "Build your communication skills, resume and interview confidence.",
        time: "10:00 AM - 1:00 PM",
        venue: "Seminar Hall"
    },

    "data-analytics": {
        name: "Data Analytics Workshop",
        category: "Workshop",
        date: "November 2, 2026",
        description: "Understand data analysis concepts and real-world applications.",
        time: "10:00 AM - 1:00 PM",
        venue: "Computer Lab"
    }

};


// ===============================
// CREATE EVENT ID
// ===============================

function createEventId(name) {

    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        + "-" + Date.now();

}


// ===============================
// FORMAT DATE
// ===============================

function formatEventDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}


// ===============================
// FORMAT TIME
// ===============================

function formatEventTime(timeString) {

    if (!timeString) {
        return "Time will be announced";
    }

    const parts =
        timeString.split(":");

    let hours =
        parseInt(parts[0]);

    const minutes =
        parts[1];

    const ampm =
        hours >= 12 ? "PM" : "AM";

    hours =
        hours % 12 || 12;

    return hours + ":" + minutes + " " + ampm;

}


// ===============================
// ESCAPE HTML
// ===============================

function escapeHTML(value) {

    return String(value).replace(
        /[&<>"']/g,
        function(character) {

            const entities = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            };

            return entities[character];

        }
    );

}


// ===============================
// GET EVENT BY ID
// ===============================

function getEventById(eventId) {

    if (defaultEvents[eventId]) {

        return defaultEvents[eventId];

    }

    const customEvents =
        JSON.parse(
            localStorage.getItem("customEvents")
        ) || [];

    return customEvents.find(
        function(event) {

            return event.id === eventId;

        }
    ) || null;

}


// ===============================
// EVENT REGISTRATION
// ===============================

const registrationForm =
    document.getElementById("registrationForm");

if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document.getElementById("name")
                    .value.trim();

            const email =
                document.getElementById("email")
                    .value.trim();

            const phone =
                document.getElementById("phone")
                    .value.trim();

            if (
                name === "" ||
                email === "" ||
                phone === ""
            ) {

                alert(
                    "Please fill in all the fields."
                );

                return;
            }

            if (phone.length < 10) {

                alert(
                    "Please enter a valid phone number."
                );

                return;
            }

            const registrationDate =
                new Date().toLocaleString();

            const params =
                new URLSearchParams(
                    window.location.search
                );

            const eventId =
                params.get("id") ||
                "web-development";

            const eventData =
                getEventById(eventId);

            const registration = {

                name: name,

                email: email,

                phone: phone,

                event:
                    eventData
                        ? eventData.name
                        : "Event",

                date: registrationDate

            };

            let registrations =
                JSON.parse(
                    localStorage.getItem("registrations")
                ) || [];

            registrations.push(
                registration
            );

            localStorage.setItem(
                "registrations",
                JSON.stringify(registrations)
            );

            document.getElementById(
                "confirmName"
            ).textContent = name;

            document.getElementById(
                "confirmEmail"
            ).textContent = email;

            document.getElementById(
                "confirmPhone"
            ).textContent = phone;

            document.getElementById(
                "confirmDate"
            ).textContent = registrationDate;

            const confirmEvent =
                document.getElementById(
                    "confirmEvent"
                );

            if (confirmEvent && eventData) {

                confirmEvent.textContent =
                    eventData.name;

            }

            document.getElementById(
                "confirmationCard"
            ).style.display = "block";

            registrationForm.style.display =
                "none";

        }
    );

}


// ===============================
// ADMIN - ADD EVENT
// ===============================

const eventForm =
    document.getElementById("eventForm");

if (eventForm) {

    eventForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const eventName =
                document.getElementById(
                    "eventName"
                ).value.trim();

            const eventDate =
                document.getElementById(
                    "eventDate"
                ).value;

            const eventTime =
                document.getElementById(
                    "eventTime"
                ).value;

            const eventLocation =
                document.getElementById(
                    "eventLocation"
                ).value.trim();

            const eventCategory =
                document.getElementById(
                    "eventCategory"
                ).value;

            const eventDescription =
                document.getElementById(
                    "eventDescription"
                ).value.trim();

            const eventMessage =
                document.getElementById(
                    "eventMessage"
                );

            if (
                eventName === "" ||
                eventDate === "" ||
                eventTime === "" ||
                eventLocation === "" ||
                eventCategory === "" ||
                eventDescription === ""
            ) {

                eventMessage.textContent =
                    "Please fill in all event details.";

                eventMessage.style.color =
                    "#dc2626";

                return;
            }

            const newEvent = {

                id: createEventId(
                    eventName
                ),

                name: eventName,

                date: eventDate,

                time: eventTime,

                venue: eventLocation,

                category: eventCategory,

                description:
                    eventDescription

            };

            let customEvents =
                JSON.parse(
                    localStorage.getItem(
                        "customEvents"
                    )
                ) || [];

            customEvents.push(
                newEvent
            );

            localStorage.setItem(
                "customEvents",
                JSON.stringify(
                    customEvents
                )
            );

            eventMessage.textContent =
                "Event added successfully!";

            eventMessage.style.color =
                "#16a34a";

            eventForm.reset();

            setTimeout(
                function() {

                    window.location.href =
                        "events.html";

                },
                800
            );

        }
    );

}


// ===============================
// DISPLAY ADMIN ADDED EVENTS
// ===============================

function displayCustomEvents() {

    const eventContainer =
        document.querySelector(
            ".event-container"
        );

    if (!eventContainer) {

        return;

    }

    let customEvents =
        JSON.parse(
            localStorage.getItem(
                "customEvents"
            )
        ) || [];

    let changed = false;

    customEvents.forEach(
        function(event) {

            if (!event.id) {

                event.id =
                    createEventId(
                        event.name
                    );

                changed = true;

            }

        }
    );

    if (changed) {

        localStorage.setItem(
            "customEvents",
            JSON.stringify(
                customEvents
            )
        );

    }

    customEvents.forEach(
        function(event) {

            const eventCard =
                document.createElement(
                    "div"
                );

            eventCard.className =
                "event-card";

            eventCard.setAttribute(
                "data-category",
                event.category
            );

            eventCard.setAttribute(
                "data-event-id",
                event.id
            );

            const formattedDate =
                formatEventDate(
                    event.date
                );

            const formattedTime =
                formatEventTime(
                    event.time
                );

            eventCard.innerHTML = `

                <h3>
                    ${escapeHTML(event.name)}
                </h3>

                <p>
                    ${escapeHTML(event.description)}
                </p>

                <span>
                    📅 ${escapeHTML(formattedDate)}
                </span>

                <br>

                <span>
                    ⏰ ${escapeHTML(formattedTime)}
                </span>

                <br>

                <span>
                    📍 ${escapeHTML(event.venue)}
                </span>

                <br><br>

                <a
                    href="event-details.html?id=${encodeURIComponent(event.id)}"
                    class="hero-btn">

                    View Details

                </a>

            `;

            eventContainer.appendChild(
                eventCard
            );

        }
    );

    updateEventCounters();

}


// ===============================
// UPDATE EVENT COUNTERS
// ===============================

function updateEventCounters() {

    const eventCards =
        document.querySelectorAll(
            ".event-container .event-card"
        );

    let workshops = 0;
    let seminars = 0;
    let careers = 0;

    eventCards.forEach(
        function(card) {

            const category =
                card.getAttribute(
                    "data-category"
                );

            if (category === "Workshop") {

                workshops++;

            }

            if (category === "Seminar") {

                seminars++;

            }

            if (category === "Career") {

                careers++;

            }

        }
    );

    const totalEvents =
        document.getElementById(
            "totalEvents"
        );

    const workshopCount =
        document.getElementById(
            "workshopCount"
        );

    const seminarCount =
        document.getElementById(
            "seminarCount"
        );

    const careerCount =
        document.getElementById(
            "careerCount"
        );

    if (totalEvents) {

        totalEvents.textContent =
            eventCards.length;

    }

    if (workshopCount) {

        workshopCount.textContent =
            workshops;

    }

    if (seminarCount) {

        seminarCount.textContent =
            seminars;

    }

    if (careerCount) {

        careerCount.textContent =
            careers;

    }

}


// ===============================
// EVENT CATEGORY FILTER
// ===============================

function filterEvents(
    category,
    selectedButton
) {

    const eventCards =
        document.querySelectorAll(
            ".event-container .event-card"
        );

    const categoryButtons =
        document.querySelectorAll(
            ".category-btn"
        );

    categoryButtons.forEach(
        function(button) {

            button.classList.remove(
                "active"
            );

        }
    );

    selectedButton.classList.add(
        "active"
    );

    eventCards.forEach(
        function(card) {

            const cardCategory =
                card.getAttribute(
                    "data-category"
                );

            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display = "";

            } else {

                card.style.display =
                    "none";

            }

        }
    );

}


// ===============================
// COUNTDOWN TIMER
// ===============================

const countdownDays =
    document.getElementById(
        "countdownDays"
    );

const countdownHours =
    document.getElementById(
        "countdownHours"
    );

const countdownMinutes =
    document.getElementById(
        "countdownMinutes"
    );

const countdownSeconds =
    document.getElementById(
        "countdownSeconds"
    );

if (
    countdownDays &&
    countdownHours &&
    countdownMinutes &&
    countdownSeconds
) {

    const eventDate =
        new Date(
            "October 15, 2026 10:00:00"
        ).getTime();

    function updateCountdown() {

        const now =
            new Date().getTime();

        const difference =
            eventDate - now;

        if (difference <= 0) {

            countdownDays.textContent =
                "00";

            countdownHours.textContent =
                "00";

            countdownMinutes.textContent =
                "00";

            countdownSeconds.textContent =
                "00";

            const countdownTitle =
                document.querySelector(
                    ".countdown-card h3"
                );

            if (countdownTitle) {

                countdownTitle.textContent =
                    "🎉 Event Started!";

            }

            return;
        }

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (
                    difference /
                    (1000 * 60 * 60)
                ) % 24
            );

        const minutes =
            Math.floor(
                (
                    difference /
                    (1000 * 60)
                ) % 60
            );

        const seconds =
            Math.floor(
                (difference / 1000) % 60
            );

        countdownDays.textContent =
            String(days).padStart(2, "0");

        countdownHours.textContent =
            String(hours).padStart(2, "0");

        countdownMinutes.textContent =
            String(minutes).padStart(2, "0");

        countdownSeconds.textContent =
            String(seconds).padStart(2, "0");

    }

    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

}


// ===============================
// LOAD CUSTOM EVENTS
// ===============================

displayCustomEvents();