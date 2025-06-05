let winners = JSON.parse(localStorage.getItem('winners')) || [
    { id: 1, name: "Max Mustermann", year: "2023", description: "Gewann den ersten Preis." },
    { id: 2, name: "Anna Beispiel", year: "2024", description: "Herausragende Leistung." }
];
let isAdmin = false;
const PIN = "2009";

function renderWinners() {
    const winnerList = document.getElementById('winner-list');
    winnerList.innerHTML = '';
    winners.forEach(winner => {
        const winnerCard = document.createElement('div');
        winnerCard.className = 'winner-card';
        winnerCard.innerHTML = `
            <h2 class="text-xl font-semibold">${winner.name}</h2>
            <p>Jahr: ${winner.year}</p>
            <p>${winner.description}</p>
            ${isAdmin ? `<button class="delete-btn" onclick="deleteWinner(${winner.id})">Löschen</button>` : ''}
        `;
        winnerList.appendChild(winnerCard);
    });
}

function login() {
    const pinInput = document.getElementById('pin-input').value;
    if (pinInput === PIN) {
        isAdmin = true;
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-controls').classList.remove('hidden');
        renderWinners();
    } else {
        alert("Falscher PIN!");
    }
}

function logout() {
    isAdmin = false;
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('admin-controls').classList.add('hidden');
    document.getElementById('pin-input').value = '';
    renderWinners();
}

function addWinner() {
    const name = document.getElementById('winner-name').value;
    const year = document.getElementById('winner-year').value;
    const description = document.getElementById('winner-description').value;
    if (name && year && description) {
        const newWinner = {
            id: winners.length ? winners[winners.length - 1].id + 1 : 1,
            name,
            year,
            description
        };
        winners.push(newWinner);
        localStorage.setItem('winners', JSON.stringify(winners));
        renderWinners();
        document.getElementById('winner-name').value = '';
        document.getElementById('winner-year').value = '';
        document.getElementById('winner-description').value = '';
    } else {
        alert("Bitte alle Felder ausfüllen!");
    }
}

function deleteWinner(id) {
    winners = winners.filter(winner => winner.id !== id);
    localStorage.setItem('winners', JSON.stringify(winners));
    renderWinners();
}

// Initiales Rendern
renderWinners();