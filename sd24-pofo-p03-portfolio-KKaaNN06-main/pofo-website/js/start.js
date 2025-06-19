// Find the rules button and rules panel
const rulesButton = document.querySelector('.rules-button');
const rulesPanel = document.querySelector('.rules-panel');

// Add click event listener to toggle visibility of the rules panel
rulesButton.addEventListener('click', () => {
    if (rulesPanel.style.display === 'block') {
        rulesPanel.style.display = 'none'; // Hide rules panel
    } else {
        rulesPanel.style.display = 'block'; // Show rules panel
    }
});