function compteurUpdate(id,valeur){
    let compteur = document.getElementById(id); //get the element pointed by the id
    let nombre = parseInt(compteur.textContent); //get the actual value of the compteur

    nombre += valeur;
    if(nombre < 0) nombre =0;
    compteur.textContent = nombre;
    
    const nomVoyage = localStorage.getItem("nomVoyage");
    let storageId = nomVoyage + id;
    localStorage.setItem(storageId, nombre);
    const currentCount = localStorage.getItem(storageId);

    if (currentCount) {
        document.getElementById(id).textContent = `${currentCount}`;
        
        console.log("Something in the storage")
    }
    else {
        console.log("Nothing in the storage")
    }

}

function checkEdition(input,idElement){ //Make sure that what has been entered is acceptable
    let newValue = parseInt(input.value) || 0; //the new value will be 0 if the input is null
    if(newValue <0) newValue = 0;

    //Recreate the paragraph p
    let p = document.createElement("p")
    p.id = idElement;
    p.textContent = newValue;
    p.onclick = function(){activerEdition(p)} //p is clickable once again


    //Replace the input with p
    input.replaceWith(p);
    console.log("Check edition called")

    //Save the result in local storage
    const nomVoyage = localStorage.getItem("nomVoyage");
    let storageId = nomVoyage + idElement;
    localStorage.setItem(storageId, newValue);
    const currentCount = localStorage.getItem(storageId);

    if (currentCount) {
        document.getElementById(idElement).textContent = `${currentCount}`;
        
        console.log("Something in the storage")
    }
    else {
        console.log("Nothing in the storage")
    }
}

function activerEdition(element){
    let actualValue = element.textContent.trim();
    let idElement = element.id
    let input = document.createElement("input"); //Create an input element

    //style the input element
    input.type = "number";
    input.value = actualValue;
    input.min = 0;
    input.style.width = "50px";
    input.style.textAlign = "center";

    //replace p by the input element
    element.replaceWith(input);
    input.focus();


    //Save when quitting the input
    input.addEventListener("blur", function(){
        setTimeout(() => checkEdition(input, idElement), 100);
    });

    //Save when pressing the enter key

    input.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            checkEdition(input, idElement);
        }
    });
    
}


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[id^='compteur-']").forEach(compteur => {
        
        const nomVoyage = localStorage.getItem("nomVoyage");
        let storageId = nomVoyage + compteur.id;
        
        const savedValue = localStorage.getItem(storageId);
        if (savedValue !== null) {
            compteur.textContent = savedValue;
            console.log("Something in tht sneakers storage")
        }
        else {
            console.log("Nothing in the sneakers storage")
        }
    });
});
