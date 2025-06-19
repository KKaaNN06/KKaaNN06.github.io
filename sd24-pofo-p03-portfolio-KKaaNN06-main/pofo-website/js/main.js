document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Voorkomt dat de pagina verandert bij klikken
            const infoText = this.nextElementSibling;
            if (infoText.style.display === "block") {
                infoText.style.display = "none";
            } else {
                infoText.style.display = "block";
            }
        });
    });

    // Sluit info als je ergens anders klikt
    document.addEventListener("click", function () {
        document.querySelectorAll(".info-text").forEach(text => {
            text.style.display = "none";
        });
    });
});
