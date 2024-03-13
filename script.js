const memoryGameContainer = document.getElementById('memory-game');
const cards = [
    { name: '1', img: '1.jpg' },
    { name: '2', img: '2.jpg' },
    { name: '3', img: '3.jpg' },
    { name: '4', img: '4.jpg' },
    { name: '5', img: '5.jpg' },
    { name: '6', img: '6.jpg' },
    { name: '7', img: '7.jpg' },
    { name: '8', img: '8.jpg' },
    { name: '1', img: '1.jpg' },
    { name: '2', img: '2.jpg' },
    { name: '3', img: '3.jpg' },
    { name: '4', img: '4.jpg' },
    { name: '5', img: '5.jpg' },
    { name: '6', img: '6.jpg' },
    { name: '7', img: '7.jpg' },
    { name: '8', img: '8.jpg' },
];

let flippedCards = [];
let lockBoard = false;

function createBoard() {
    shuffleCards();
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face');

        const backFace = document.createElement('div');
        backFace.classList.add('back-face');

        const img = document.createElement('img');
        img.src = 'Dos_des_cartes.jpg';

        backFace.appendChild(img);
        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        memoryGameContainer.appendChild(cardElement);

        cardElement.addEventListener('click', () => flipCard(cardElement));
    });
}

function flipCard(card) {
    if (lockBoard) return;
    if (flippedCards.length === 2) return;

    card.classList.add('flip');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    flippedCards.forEach(card => {
        card.removeEventListener('click', flipCard);
    });

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        flippedCards.forEach(card => {
            card.classList.remove('flip');
        });

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [flippedCards, lockBoard] = [[], false];
}

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

(function startGame() {
    createBoard();
})();