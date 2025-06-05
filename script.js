// Daten
let winners = [
    { name: "Max Mustermann", date: "01.01.2025" },
    { name: "Anna Beispiel", date: "15.12.2024" }
];
let giveaway = {
    title: "Nächstes Giveaway",
    description: "Nimm teil an unserem großen Giveaway! Details folgen bald.",
    date: "01.07.2025"
};

// Animationen mit GSAP
document.querySelectorAll('.fade-in').forEach(el => {
    gsap.from(el, { opacity: 0, y: 20, duration: 1, delay: 0.2 });
});

// Menü-Toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('active');
});

// Gewinner anzeigen
function displayWinners() {
    const winnersList = document.getElementById('winners-list');
    winnersList.innerHTML = '';
    winners.forEach((winner, index) => {
        const div = document.createElement('div');
        div.className = 'card fade-in';
        div.innerHTML = `<p>${winner.name} - ${winner.date}</p>`;
        winnersList.appendChild(div);
    });
}

// Giveaway anzeigen
function displayGiveaway() {
    const giveawayInfo = document.getElementById('giveaway-info');
    giveawayInfo.innerHTML = `
        <h3 class="text-xl font-bold">${giveaway.title}</h3>
        <p>${giveaway.description}</p>
        <p><strong>Datum:</strong> ${giveaway.date}</p>
    `;
}

// Admin-PIN prüfen
function checkAdminPin() {
    const pin = document.getElementById('admin-pin').value;
    if (pin === "2009") {
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        displayDeleteWinners();
    } else {
        alert("Falscher PIN!");
    }
}

// Gewinner hinzufügen
function addWinner() {
    const name = document.getElementById('winner-name').value;
    const date = document.getElementById('winner-date').value;
    if (name && date) {
        winners.push({ name, date });
        displayWinners();
        displayDeleteWinners();
        document.getElementById('winner-name').value = '';
        document.getElementById('winner-date').value = '';
    } else {
        alert("Bitte alle Felder ausfüllen!");
    }
}

// Giveaway aktualisieren
function updateGiveaway() {
    const title = document.getElementById('giveaway-title').value;
    const desc = document.getElementById('giveaway-desc').value;
    const date = document.getElementById('giveaway-date').value;
    if (title && desc && date) {
        giveaway = { title, description: desc, date };
        displayGiveaway();
    } else {
        alert("Bitte alle Felder ausfüllen!");
    }
}

// Gewinner löschen
function displayDeleteWinners() {
    const deleteList = document.getElementById('delete-winners-list');
    deleteList.innerHTML = '';
    winners.forEach((winner, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${winner.name} - ${winner.date} <button onclick="deleteWinner(${index})" class="bg-red-600 text-white px-2 py-1 rounded">Löschen</button></p>
        `;
        deleteList.appendChild(div);
    });
}

function deleteWinner(index) {
    winners.splice(index, 1);
    displayWinners();
    displayDeleteWinners();
}

// Initialisieren
displayWinners();
displayGiveaway();