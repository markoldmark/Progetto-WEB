document.addEventListener("DOMContentLoaded", function () {
    const pedineContainer = document.querySelector("#sx-container table");
    const pedine = [];
    
    for (let i = 0; i < 10; i++) {
        let pedina = document.createElement("div");
        pedina.classList.add("pedina");
        pedina.setAttribute("draggable", "true");
        pedina.setAttribute("id", "pedina-" + i);

        // Aggiunge evento di trascinamento
        pedina.addEventListener("dragstart", dragStart);

        pedine.push(pedina);
    }

    // Posizionamento casuale nelle celle di sx-container
    let celleDisponibili = [...pedineContainer.querySelectorAll("td")];
    celleDisponibili = celleDisponibili.sort(() => 0.5 - Math.random()).slice(0, 10);

    pedine.forEach((pedina, index) => {
        celleDisponibili[index].appendChild(pedina);
    });

    // Aggiunge la gestione del drag & drop a tutte le celle delle tabelle
    let celleTutte = document.querySelectorAll("td");
    celleTutte.forEach((cella) => {
        cella.addEventListener("dragover", dragOver);
        cella.addEventListener("drop", drop);
    });
});

// Funzioni per Drag & Drop
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let pedinaId = event.dataTransfer.getData("text");
    let pedina = document.getElementById(pedinaId);

    // Controlla che la cella non abbia già una pedina
    if (event.target.tagName === "TD" && event.target.children.length === 0) {
        event.target.appendChild(pedina);
    }
}
