//When you click on an element of the grid
document.querySelectorAll(".grid-item").forEach(item => {
    console.log("called");
    item.addEventListener("click", function() {
        window.location.href = this.getAttribute("data-link");
    });
});


//When the HTML is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const nomVoyage = localStorage.getItem("nomVoyageSansTiret");
    const button = document.querySelector(".nouveau-voyage-button");

    if (nomVoyage) {
        document.getElementById("titre-voyage").textContent = `Valise ${nomVoyage}`;
    }
    
    button.addEventListener("click", function() {
         window.location.href = "../../index.html";
    });
    
});

