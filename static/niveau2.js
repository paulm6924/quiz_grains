// Sons
const sonBon = new Audio("static/sons/Son_correct.mp3");
const sonMauvais = new Audio("static/sons/Son_faux.mp3");

// Tableau des paires
const paires = [
    { mechant: "static/image_nv_2/Image1.png", gentil: "static/image_nv_2/Image2.png" },
    { gentil: "static/image_nv_2/Image3.png", mechant: "static/image_nv_2/Image4.png" },
    { mechant: "static/image_nv_2/Image5.png", gentil: "static/image_nv_2/Image6.png" },
    { mechant: "static/image_nv_2/Image7.png", gentil: "static/image_nv_2/Image8.png" },
    { gentil: "static/image_nv_2/Image9.png", mechant: "static/image_nv_2/Image10.png" },
    { gentil: "static/image_nv_2/Image11.png", mechant: "static/image_nv_2/Image12.png" },
    { mechant: "static/image_nv_2/Image13.png", gentil: "static/image_nv_2/Image14.png" },
    { gentil: "static/image_nv_2/Image15.png", mechant: "static/image_nv_2/Image16.png" },
    { gentil: "static/image_nv_2/Image17.png", mechant: "static/image_nv_2/Image18.png" },
    { mechant: "static/image_nv_2/Image19.png", gentil: "static/image_nv_2/Image20.png" },
    { mechant: "static/image_nv_2/Image21.png", gentil: "static/image_nv_2/Image22.png" },
    { gentil: "static/image_nv_2/Image23.png", mechant: "static/image_nv_2/Image24.png" },
    { mechant: "static/image_nv_2/Image25.png", gentil: "static/image_nv_2/Image26.png" }
];


let index = 0;
let score = 0;
// Nouvelle variable pour suivre si une erreur a ete commise pour la paire actuelle
let erreurCommisePourCettePaire = false;


const zoneJeu = document.getElementById("jeu");

zoneJeu.innerHTML = `
    <h2>Niveau 2 : Fais glisser uniquement le mechant dans la zone rouge</h2>

    <div id="progression">
        <div id="progression-barre">
            <div id="progression-remplie"></div>
        </div>
        <div id="progression-texte">Image 1 sur ${paires.length}</div>
    </div>

    <div id="zone-contenu"></div>
    <div id="message"></div>
    <div id="score">Score : 0</div>
`;


function chargerPaire() {
    // Reinitialiser la variable d'erreur à chaque nouvelle paire
    erreurCommisePourCettePaire = false;

    const paire = paires[index];
    const contenu = document.getElementById("zone-contenu");

    const ordre = Math.random() < 0.5 ? ['gentil', 'mechant'] : ['mechant', 'gentil'];

    contenu.innerHTML = `
        <div class="images">
            ${ordre.map(type => {
                const id = `img-${type}`; // Chaque image aura un ID unique (ex: img-mechant, img-gentil)
                const classe = 'draggable-image'; // Les deux images sont maintenant glissables
                const draggable = 'draggable="true"';
                const data = `data-role="${type}"`; // Conserve le rôle pour verifier la reponse
                const src = paire[type];
                return `<img id="${id}" src="${src}" class="${classe}" ${draggable} ${data}>`;
            }).join('')}
        </div>
        <div class="zones-centrees">
            <div id="zone-rouge" class="drop-zone">Mechant</div>
        </div>
    `;
    const progressionPourcentage = ((index + 1) / paires.length) * 100;
    document.getElementById("progression-remplie").style.width = `${progressionPourcentage}%`;
    document.getElementById("progression-texte").textContent = `Image ${index + 1} sur ${paires.length}`;


    initialiserDragAndDrop();
}

function initialiserDragAndDrop() {
    const images = document.querySelectorAll(".draggable-image"); // Selectionne toutes les images glissables
    const zoneRouge = document.getElementById("zone-rouge");
    const message = document.getElementById("message");

    images.forEach(img => {
        img.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", e.target.id);
        });
    });

    zoneRouge.addEventListener("dragover", e => {
        e.preventDefault();
        zoneRouge.style.backgroundColor = "#ffe0e0";
    });

    zoneRouge.addEventListener("dragleave", () => {
        zoneRouge.style.backgroundColor = "";
    });

    zoneRouge.addEventListener("drop", e => {
        e.preventDefault();
        zoneRouge.style.backgroundColor = "";

        const imgId = e.dataTransfer.getData("text/plain");
        const dragged = document.getElementById(imgId);
        const role = dragged.dataset.role;

        if (role === "mechant") {
            // Verifier si une erreur a dejà ete commise pour cette paire
            if (!erreurCommisePourCettePaire) { // Si aucune erreur n'a ete commise
                message.textContent = "Bonne reponse !";
                sonBon.pause();
                sonBon.currentTime = 0;
                sonBon.play();
                score++; // On ajoute le point
                document.getElementById("score").textContent = `Score : ${score}`;
            } else { // Si une erreur a dejà ete commise, on ne donne pas le point
                message.textContent = "Cette fois c'est la bonne reponse, Bravo!";
                sonBon.pause(); // On peut jouer le son bon même si le point n'est pas donne
                sonBon.currentTime = 0;
                sonBon.play();
            }

            setTimeout(() => {
                index++;
                if (index < paires.length) {
                    chargerPaire();
                } else {
                    afficherFinDuJeu();
                }
            }, 1000);
        } else { // Si 'role' est 'gentil'
            message.textContent = "Mauvais choix.";
            sonMauvais.pause();
            sonMauvais.currentTime = 0;
            sonMauvais.play();
            erreurCommisePourCettePaire = true;
            setTimeout(() => { message.textContent = ""; }, 1000);
        }
    });
}

function afficherFinDuJeu() {
    zoneJeu.innerHTML = `
        <h2>Bravo ! Score final : ${score}/${paires.length}</h2>
        <button onclick="location.reload()">Rejouer</button>
        <button onclick="retourMenu()">Retour au menu</button>
    `;
}

function retourMenu() {
    document.getElementById("jeu").style.display = "none";
    document.getElementById("accueil").style.display = "block";
}

chargerPaire();
