// Sons
const sonBon = new Audio("static/sons/Son_correct.mp3");
const sonMauvais = new Audio("static/sons/Son_faux.mp3");

const images = [
  { src: "static/image_nv_3/Image1.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image2.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image3.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image4.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image5.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image6.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image7.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image8.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image9.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image10.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image11.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image12.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image13.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image14.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image15.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image16.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image17.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image18.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image19.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image20.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image21.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image22.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image23.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image24.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image25.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image26.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image27.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image28.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image29.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image30.png", reponse: "gentil" },
  { src: "static/image_nv_3/Image31.png", reponse: "mechant" },
  { src: "static/image_nv_3/Image32.png", reponse: "mechant" },
];

let index = 0;
let score = 0;
let canEarnPointForCurrentQuestion = true; // Nouvelle variable pour la logique de correction

const zoneJeu = document.getElementById("jeu");

// Contenu HTML du niveau 3, avec l'élément 'message' ajouté
zoneJeu.innerHTML = `
    <h1>Niveau 3 : Le Grand Test !</h1>

    <div id="progression">
        <div id="progression-barre">
            <div id="progression-remplie"></div>
        </div>
        <div id="progression-texte">Image 1 sur ${images.length}</div>
    </div>

    <img id="question-image" src="" alt="Image à classer" />
    <div id="message" style="margin-bottom: 10px; font-weight: bold;"></div> <div class="buttons">
        <button id="btn-vert">Gentil</button>
        <button id="btn-rouge">Mechant</button>
    </div>

    <div id="score">Score : 0</div>
`;

// Références aux éléments HTML
const imageElem = document.getElementById("question-image");
const btnVert = document.getElementById("btn-vert");
const btnRouge = document.getElementById("btn-rouge");
const scoreElem = document.getElementById("score");
const messageElem = document.getElementById("message"); // Référence à l'élément message

function chargerQuestion() {
    canEarnPointForCurrentQuestion = true; // Réinitialiser pour la nouvelle question
    // Réactiver les boutons au début de chaque question
    btnVert.style.pointerEvents = 'auto';
    btnRouge.style.pointerEvents = 'auto';
    messageElem.textContent = ""; // Assurer que le message est vide au chargement d'une nouvelle question

    if (index >= images.length) {
        imageElem.style.display = "none";
        document.querySelector(".buttons").style.display = "none";
        document.getElementById("progression").style.display = "none";
        messageElem.style.display = "none"; // Masquer le message pendant l'écran de fin

        zoneJeu.innerHTML = `
            <h2>Bravo ! Score final : ${score}/${images.length}</h2>
            <button onclick="location.reload()">Rejouer</button>
        `;
        return;
    }

    const progressionPourcentage = ((index + 1) / images.length) * 100;
    document.getElementById("progression-remplie").style.width = `${progressionPourcentage}%`;
    document.getElementById("progression-texte").textContent = `Image ${index + 1} sur ${images.length}`;

    imageElem.src = images[index].src;
    imageElem.classList.add("entree");

    setTimeout(() => {
        imageElem.classList.remove("entree");
    }, 500);
}

function verifierReponse(reponseUtilisateur) {
    const bonneReponse = images[index].reponse;
    const effet = reponseUtilisateur === bonneReponse ? "bonne-reponse" : "mauvaise-reponse";
    const son = reponseUtilisateur === bonneReponse ? sonBon : sonMauvais;

    if (reponseUtilisateur === bonneReponse) {
        // Si la réponse est correcte
        if (canEarnPointForCurrentQuestion) {
            score++;
            scoreElem.textContent = `Score : ${score}`;
            messageElem.textContent = "Bonne réponse !";
        } else {
            messageElem.textContent = "C'est la bonne réponse ! (Pas de point)";
        }

        imageElem.classList.add(effet);
        son.currentTime = 0;
        son.play();

        // Désactiver les boutons une fois la réponse donnée pour cette question
        btnVert.style.pointerEvents = 'none';
        btnRouge.style.pointerEvents = 'none';

        setTimeout(() => {
            imageElem.classList.remove(effet);
            messageElem.textContent = ""; // Efface le message
            index++;
            chargerQuestion();
            // Les boutons sont réactivés dans chargerQuestion()
        }, 1500); // Laisse plus de temps pour lire le message

    } else {
        // Si la réponse est incorrecte
        canEarnPointForCurrentQuestion = false; // Le joueur ne peut plus gagner de point pour cette question
        messageElem.textContent = "Mauvais choix. Essayez encore !";

        imageElem.classList.add(effet);
        son.currentTime = 0;
        son.play();

        setTimeout(() => {
            imageElem.classList.remove(effet);
            messageElem.textContent = ""; // Efface le message après un court délai
            // L'index n'est PAS incrémenté, le joueur peut re-cliquer sur cette même question
            // Les boutons restent cliquables
        }, 1000);
    }
}

// Les écouteurs d'événements
btnVert.addEventListener("click", () => verifierReponse("gentil"));
btnRouge.addEventListener("click", () => verifierReponse("mechant"));

// Fonction pour revenir au menu (déjà définie ou à définir dans votre HTML principal)
function retourMenu() {
    document.getElementById("jeu").style.display = "none";
    document.getElementById("accueil").style.display = "block";
}

chargerQuestion();
