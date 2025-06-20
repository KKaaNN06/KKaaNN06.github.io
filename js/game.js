const playerBoard = document.querySelector('#player-board .grid'); //Dit is de grid voor de bord van de player
const computerBoard = document.querySelector('#computer-board .grid'); // Dit is de grid voor de bord van de computer

// Geluidselement selecteren
const seabattleSound = document.querySelector('#seabattleSound');

// Zorgt ervoor dat de audio is geladen voordat u gaat afspelen
seabattleSound.addEventListener('canplaythrough', () => { // Een verkorte event listener voor het 'canplaythrough' event
  console.log('Audio is ready to be played');
});

// Functie om het geluid af te spelen
function playSeabattleSound() {
  if (seabattleSound.readyState >= 3) { // Controleer of het geluid klaar is om af te spelen. 3 betekent dat het geluid klaar is om af te spelen
    seabattleSound.play();
  } else {
    console.log('Audio is not ready yet'); // Audio is nog niet klaar om af te spelen, 
    // dit stukje zorgt ervoor dat geluid niet wordt afgespeeld.
  }
}

// Selecteer het audio-element en de mute-knop
const audio = document.querySelector('#seabattleSound'); // Zorgt ervoor dat dit correct is
const muteButton = document.querySelector('#muteButton'); // Zorgt ervoor dat je een knop hebt met id="muteButton"

// Controleer de initiële/oorspronkelijke mute-status wanneer de pagina wordt geladen
if (audio && muteButton) {
  // Werkt de knoptekst bij op basis van de initiële/oorspronkelijke status van het geluid
  if (audio.muted) {
    muteButton.textContent = '🔇'; // Mute-icoon als het geluid is gedempt
  } else {
    muteButton.textContent = '🔊'; // Unmute-icoon als het geluid niet is gedempt
  }

  // Event listener voor het dempen van het geluid
  muteButton.addEventListener('click', () => {
    if (audio.muted) {
      audio.muted = false; // Zet het geluid aan (unmute)
      muteButton.textContent = '🔊'; // Wijzig de knoptekst om unmute aan te geven
    } else {
      audio.muted = true; // Zet het geluid uit (mute)
      muteButton.textContent = '🔇'; // Wijzig de knoptekst om mute aan te geven
    }
  });
}

// Om grid aan te maken voor de boorden.
function createGrid(board) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    board.appendChild(cell); // cell = lege vakje die nog niet geactiveerd is. appendchild = voegt een kind(cell) toe aan de parent (in dit geval de bord dus).
  }
}

createGrid(playerBoard); // Maakt grid voor de speler
createGrid(computerBoard); //  Maakt grid voor de computer

// Functie om schepen te plaatsen
function placeShips(board) {
  const ships = [5, 4, 3, 3, 2]; // Aantal schepen per speler
  const cells = board.querySelectorAll('div');

  ships.forEach(ship => {
    let placed = false;

    while (!placed) {
      const direction = Math.random() < 0.5; // Horizontaal of verticaal
      const start = Math.floor(Math.random() * 100); // Willekeurige startpositie
      let valid = true;

      // Controleren of het schip past en geen aangrenzende schepen heeft
      for (let i = 0; i < ship; i++) {
        const index = direction ? start + i : start + i * 10;

        // Berekent met de array welke cellen al gebruikt zijn.
        const adjacentIndices = [ // De adjacentIndices is gewoon een lijstje waarin we opschrijven welke vakjes naast een bepaald vakje liggen.
          index - 10, // boven
          index + 10, // onder
          index - 1, // links
          index + 1, // rechts
          index - 11, // linksboven
          index - 9, // rechtsboven
          index + 9, // linksonder
          index + 11 // rechtsonder
        ]; // Dit lijstje helpt mij om te controleren of er schepen of andere dingen in de vakjes naast ons staan.

        // Controleren of de index binnen de grenzen ligt
        if (
          index >= 100 || // Buiten het bord
          (!direction && index % 10 !== start % 10) || // Verticaal maar rij verandert
          (direction && Math.floor(start / 10) !== Math.floor(index / 10)) || // Horizontaal maar rij verandert
          cells[index]?.classList.contains('ship') // Cel is al bezet
        ) {
          valid = false; // Als de cel al bezet is, dan is het niet geldig.
          break; // Zorgt ervoor dat de loop stopt als de cel al bezet is.
        }

        // Controleren of bezette cellen vrij zijn.
        for (const adjIndex of adjacentIndices) { // adjIndex Pakt elk vakje uit het lijstje van buren (adjacentIndices) en controleer het één voor één.
          if (
            adjIndex >= 0 && adjIndex < 100 && // Binnen het bord
            cells[adjIndex]?.classList.contains('ship') // bezette cel is al een schip
          ) {
            valid = false;  // Als er een schip in een van de buren staat, wordt valid op false gezet. Dat betekent: "Je kunt hier geen nieuw schip plaatsen."
            break; // Als de computer merkt dat een buur-vakje al een schip heeft, stopt het meteen met verder controleren. Het heeft genoeg informatie om te zeggen dat de plek niet goed is.
          }
        }

        if (!valid) break; // Als de cel al bezet is, dan is het niet geldig.
      }

      // Plaats het schip als de validatie slaagt
      if (valid) {
        for (let i = 0; i < ship; i++) {
          let index;
          if (direction) {
            index = start + i;
          } else {
            index = start + i * 10;
          }
          cells[index].classList.add('ship'); // Voeg een schip toe aan het bord. Gebruik classList voor georganiseerde, herbruikbare stijlen.
        }
        placed = true; // Geef aan dat het schip succesvol is geplaatst
      } else {
        console.log("Kan schip hier niet plaatsen, probeer een andere positie."); // Debugmelding
      }
    }
  }
  )
};


// Schepen plaatsen voor beide spelers bij aanvang van het spel
let gameStarted = false;
let currentTurn = 'Player'; // Start met de beurt van de speler
let playerMissed = false; // Houd bij of de speler heeft gemist

window.addEventListener('load', () => {
  if (!gameStarted) {
    gameStarted = true;
    placeShips(playerBoard); // Schepen plaatsen voor de speler
    placeShips(computerBoard); // Schepen plaatsen voor de computer
    alert('The game has started, you can make your first move');
  }
});

// Speler zet een stap op het bord van de computer
computerBoard.addEventListener('click', (e) => { //e is een event
  if (!gameStarted || currentTurn !== 'Player') return; // Alleen als het de beurt van de speler is

  const cell = e.target; //Als je erop klikt, wordt de target veranderd naar de cell.

  if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
    if (cell.classList.contains('ship')) {
      cell.classList.add('hit');
      playerMissed = false; // Speler heeft geraakt, dus geen misser
      seabattleSound.play(); // Speel geluid af bij een hit
    } else {
      cell.classList.add('miss');
      playerMissed = true; // Speler heeft gemist
      seabattleSound.play(); // Speel geluid af bij een misser
    }

    checkWinner(computerBoard, 'Player'); // Controleren of de speler heeft gewonnen
    if (playerMissed) {
      currentTurn = 'Computer'; // Overschakelen naar de beurt van de computer
      setTimeout(computerAttack, 1000); // Computer valt aan als de speler heeft gemist
    }
  }
});

// Beurt van de computer
function computerAttack() {
  const cells = playerBoard.querySelectorAll('div');
  const index = Math.floor(Math.random() * 100); // Computer kiest een willekeurige cel.
  const cell = cells[index]; // Kiest een cel op basis van de index

  if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
    if (cell.classList.contains('ship')) {
      cell.classList.add('hit'); // Computer heeft een schip geraakt
      seabattleSound.play(); // Speel geluid af bij een hit
      checkWinner(playerBoard, 'Computer'); // Controleer of de computer heeft gewonnen
      setTimeout(computerAttack, 1000); // Blijf aanvallen als er een treffer is
    } else {
      cell.classList.add('miss'); // Computer heeft gemist
      seabattleSound.play(); // Speel geluid af bij een misser
      currentTurn = 'Player'; // Beurt gaat terug naar de speler
    }
  } else {
    setTimeout(computerAttack, 1000); // Probeer opnieuw als de cel al geraakt is
  }
}

// Controleer of er een winnaar is
function checkWinner(board, playerName) {
  const remainingShips = board.querySelectorAll('.ship:not(.hit)'); // Schepen die nog niet zijn geraakt
  if (remainingShips.length === 0) {
    gameStarted = false; // Als er geen schepen meer zijn, is het spel afgelopen

    if (playerName === 'Player') {
      window.location.href = 'end.html?result=win';
    } else {
      window.location.href = 'end.html?result=lose';
    }
  }
} // Stuurt de speler naar het eindpagine op basis van de resultaat van het spel.
