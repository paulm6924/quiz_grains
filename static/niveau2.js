// Sons
const sonBon = new Audio("static/sons/Son_correct.mp3");
const sonMauvais = new Audio("static/sons/Son_faux.mp3");

// Tableau des paires (inchangé)
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
// Nouvelle variable pour suivre si le joueur peut encore gagner un point pour la paire actuelle
let canEarnPointForCurrentPair = true;

const zoneJeu = document.getElementById("jeu");

// Mise à jour du HTML injecté (inchangé par rapport à la dernière version)
zoneJeu.innerHTML = `
    <h2>Niveau 2 : Clique sur l'image du grain de beauté <span style="color: red;">MÉCHANT</span> !</h2>

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
    // Réinitialiser la possibilité de gagner un point pour la nouvelle paire
    canEarnPointForCurrentPair = true;

    if (index >= paires.length) {
        afficherFinDuJeu();
        return;
    }

    const paire = paires[index];
    const contenu = document.getElementById("zone-contenu");

    const ordre = Math.random() < 0.5 ? ['gentil', 'mechant'] : ['mechant', 'gentil'];

    contenu.innerHTML = `
        <div class="images clickable-images">
            ${ordre.map(type => {
                const id = `img-${type}`;
                const classe = 'clickable-image';
                const data = `data-role="${type}"`;
                const src = paire[type];
                return `<img id="${id}" src="${src}" class="${classe}" ${data}>`;
            }).join('')}
        </div>
    `;

    const progressionPourcentage = ((index + 1) / paires.length) * 100;
    document.getElementById("progression-remplie").style.width = `${progressionPourcentage}%`;
    document.getElementById("progression-texte").textContent = `Image ${index + 1} sur ${paires.length}`;

    initialiserClicImages();
}

function initialiserClicImages() {
    const images = document.querySelectorAll(".clickable-image");
    const message = document.getElementById("message");

    // S'assurer que les images sont cliquables au début de chaque paire
    images.forEach(i => i.style.pointerEvents = 'auto');

    images.forEach(img => {
        img.addEventListener("click", function handleImageClick(e) {
            const clickedImage = e.target;
            const role = clickedImage.dataset.role;

            if (role === "mechant") {
                // Correct : passe à la paire suivante
                if (canEarnPointForCurrentPair) {
                    // Seulement si aucune erreur n'a été faite pour cette paire
                    message.textContent = "Bonne réponse !";
                    score++;
                    document.getElementById("score").textContent = `Score : ${score}`;
                } else {
                    message.textContent = "C'est la bonne réponse ! (Pas de point)";
                }
                sonBon.pause();
                sonBon.currentTime = 0;
                sonBon.play();
                clickedImage.classList.add("bonne-reponse"); // Effet visuel pour la bonne réponse

                // Désactiver les clics sur les images une fois la réponse donnée pour cette paire
                images.forEach(i => i.style.pointerEvents = 'none');

                setTimeout(() => {
                    message.textContent = ""; // Efface le message
                    clickedImage.classList.remove("bonne-reponse"); // Enlève l'effet visuel
                    index++; // Passe à la question suivante
                    chargerPaire(); // Charge la paire suivante
                }, 1500); // Laisse un peu de temps pour lire le message

            } else { // Si 'role' est 'gentil' : mauvaise réponse
                message.textContent = "Mauvais choix. Ce grain est gentil. Essayez encore !";
                sonMauvais.pause();
                sonMauvais.currentTime = 0;
                sonMauvais.play();
                clickedImage.classList.add("mauvaise-reponse"); // Effet visuel pour la mauvaise réponse
                canEarnPointForCurrentPair = false; // Le joueur ne peut plus gagner de point pour cette paire

                setTimeout(() => {
                    message.textContent = ""; // Efface le message après un court délai
                    clickedImage.classList.remove("mauvaise-reponse"); // Enlève l'effet visuel
                    // L'index n'est PAS incrémenté ici, le joueur peut re-cliquer sur cette même paire
                    // Les images restent cliquables car nous n'avons pas mis pointerEvents = 'none'
                }, 1000);
            }
        });
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
