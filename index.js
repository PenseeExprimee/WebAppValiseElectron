//New page when clicking on the button "Commencer la valise"
document.getElementById("start-button").addEventListener("click", function() {
    event.preventDefault()

    const nomInput = document.getElementById("nom").value.trim();
    if (nomInput === "") {
        alert("Veuillez entrer un nom pour votre voyage.");
        return;
    }


    
    //Store new name in localStorage

    const tripName = "Nametrip" + nomInput;
    const finalName = nomInput + "-";
    //Store the input of the user with a fixed name.
    localStorage.setItem("nomVoyage", finalName);
    localStorage.setItem("nomVoyageSansTiret", nomInput);

    //store the input of the user with a name beginning by trip
    localStorage.setItem(tripName, nomInput);

    window.location.href = 'Pages/Menu/menu.html'; // Redirection vers une autre page
});

document.addEventListener("DOMContentLoaded", function() {
    //Check the local storage for previous trips
    const previousTripsList = document.getElementById("previous-trips-list");
    const clearAll = document.getElementById("clear-all-trips");
    //Search the local storage
    for (let i = 0; i < localStorage.length; i++) {

        //console.log("Searching the local storage")
        const key = localStorage.key(i);
        console.log("In the local storage: ",key);

        //Is the key starting with "trip"
        if (key.startsWith("Nametrip")) {
            //get the key
            const tripName = localStorage.getItem(key);

            //Create a list element
            const listItem = document.createElement("li");
            listItem.textContent = tripName;
            listItem.className = "trip-grid-item";

            
            // Create delete button
            const deleteButton = document.createElement("span");
            deleteButton.innerHTML = "🗑️"; // Utilisation d'un emoji ou d'une icône
            deleteButton.className = "delete-btn";

            // Add an event to delete elements
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation(); // Empêche la propagation du clic au parent <li>

                //Search in the local storage and delete everything starting with the name of the trip-

                const toDelete = tripName.trimStart('trip-');
                for(let j = 0; j < localStorage.length; j++){
                    console.log("Looking for all the keys to delete...");
                    let currentKey = localStorage.key(j);

                    const searchedElement = toDelete + "-";
                    console.log("The current key is: ",currentKey);
                    console.log("The searched element is: ",searchedElement);
                    if(currentKey.startsWith(searchedElement)){
                        console.log("Deleted element: ", currentKey);
                        localStorage.removeItem(currentKey);
                    }
                }

                listItem.remove();
                console.log("Key about to be deleted: ",key);
                localStorage.removeItem(key);


            });

            //Add the delete button to the list element
            listItem.appendChild(deleteButton);

            //Access the corresponding inventory when clicking on the name of a trip
            listItem.addEventListener("click", () => {
                window.location.href = "Pages/Menu/menu.html";

            });

            // Add this element to the list
            previousTripsList.appendChild(listItem);
        }
    }

    clearAll.addEventListener("click", function() {
        console.log("Clear all");
        localStorage.clear();
        previousTripsList.innerHTML = ""; // Supprime les éléments <li> affichés
        console.log("Length of the local storage: ", localStorage.length)
    });
   



})