// Haal de resultatenparameter op uit de URL
const params = new URLSearchParams(window.location.search);
const result = params.get('result');

// Zoek het juiste element
const messageElement = document.querySelector('#game-result');

// Stel het bericht in op basis van het resultaat
if (result === 'win') {
  messageElement.innerHTML = '<h1>Congratulations, you won the game!</h1><p>Game Finished! Redirecting to the Start page...</p>';
} else if (result === 'lose') {
  messageElement.innerHTML = '<h1>Game over, you lost the game.</h1><p>Game Finished! Redirecting to the Start page...</p>';
}

// Functie om de animatie toe te voegen
function addGradientAndShadowAnimation(colors) { //Dit betekent dat de functie twee kleuren verwacht
  const style = document.createElement('style'); // Maak een nieuw style-element aan voor de kleuren.
  style.textContent = `
    @keyframes borderAndShadowAnimation {
        0% { 
            border-color: ${colors[0]}; 
            box-shadow: 0px 0px 10px ${colors[0]};
        }
        50% { 
            border-color: ${colors[1]}; 
            box-shadow: 0px 0px 20px ${colors[1]};
        }
        100% { 
            border-color: ${colors[0]}; 
            box-shadow: 0px 0px 10px ${colors[0]};
        }
    }

    #game-result{ 
        border: 4px solid ${colors[0]}; /* Default border */
        animation: borderAndShadowAnimation 2s infinite; /* Animate border and shadow */
    }
  `; // Dit is de CSS die de animatie toevoegt aan het element met de id game-result
  document.head.appendChild(style);
}

// Voeg de animatie toe met de gewenste kleuren
addGradientAndShadowAnimation(['rgb(203, 216, 15)', 'rgb(16, 41, 155)']);

// Stuur de speler automatisch na 5 seconden naar de startpagina
setTimeout(function () {
   window.location.href = "start.html";
}, 5000); // 5 seconden wachten voordat de speler wordt teruggestuurd naar de startpagina
