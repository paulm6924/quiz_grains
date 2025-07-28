// Sons
const sonBon = new Audio("static/sons/Son_correct.mp3");
const sonMauvais = new Audio("static/sons/Son_faux.mp3");

// Tableau des questions pour le Niveau 1
const questionsNiveau1 = [
    { src: "static/image_nv_1/Image1.jpg", question: "Ce grain de beaute est-il : SYMETRIQUE ?", reponse: "non" },
    { src: "static/image_nv_1/Image2.jpg", question: "Ce grain de beaute est-il : SYMETRIQUE ?", reponse: "oui" },
    { src: "static/image_nv_1/Image3.jpg", question: "Ce grain de beaute est-il : SYMETRIQUE ?", reponse: "non" },
    { src: "static/image_nv_1/Image4.jpg", question: "Ce grain de beaute est-il : SYMETRIQUE ?", reponse: "oui" },
    { src: "static/image_nv_1/Image5.jpg", question: "Ce grain de beaute est-il : SYMETRIQUE ?", reponse: "non" },
    { src: "static/image_nv_1/Image6.jpg", question: "Ce grain de beaute a t'il : des BORDS REGULIERS ?", reponse: "oui" },
    { src: "static/image_nv_1/Image7.jpg", question: "Ce grain de beaute a t'il : des BORDS REGULIERS ?", reponse: "non" },
    { src: "static/image_nv_1/Image8.jpg", question: "Ce grain de beaute a t'il : des BORDS REGULIERS ?", reponse: "non" },
    { src: "static/image_nv_1/Image9.jpg", question: "Ce grain de beaute a t'il : des BORDS REGULIERS ?", reponse: "non" },
    { src: "static/image_nv_1/Image10.jpg", question: "Ce grain de beaute a t'il : des BORDS REGULIERS ?", reponse: "oui" },
    { src: "static/image_nv_1/Image11.jpg", question: "Ce grain de beaute est-il : MONOCHROME ?", reponse: "non" },
    { src: "static/image_nv_1/Image12.jpg", question: "Ce grain de beaute est-il : MONOCHROME ?", reponse: "non" },
    { src: "static/image_nv_1/Image13.jpg", question: "Ce grain de beaute est-il : MONOCHROME ?", reponse: "non" },
    { src: "static/image_nv_1/Image14.jpg", question: "Ce grain de beaute est-il : MONOCHROME ?", reponse: "oui" },
    { src: "static/image_nv_1/Image15.jpg", question: "Ce grain de beaute est-il : MONOCHROME ?", reponse: "non" },
    { src: "static/image_nv_1/Image16.jpg", question: "Ce grain de beaute est-il : MONOCHROME ?", reponse: "non" },
];

let index = 0;
let score = 0;
let canEarnPointForCurrentQuestion = true; // Nouvelle variable pour la logique de correction

const zoneJeu = document.getElementById("jeu");

// Contenu HTML du niveau 1, avec les IDs de boutons mis à jour et l'élément 'message' ajouté
zoneJeu.innerHTML = `
    <div class="container" id="level-1-quiz-container">
        <h1>Niveau 1 : Savoir Decrire</h1>

        <div id="progression">
            <div id="progression-barre">
                <div id="progression-remplie"></div>
            </div>
            <div id="progression-texte">Question 1 sur ${questionsNiveau1.length}</div>
        </div>

        <img id="question-image" src="" alt="Image de grain de beaute" />

        <h2 id="question-texte"></h2>
        <div id="message" style="margin-bottom: 10px; font-weight: bold;"></div>
        <div class="buttons">
            <button id="btn-vert">Oui</button>
            <button id="btn-rouge">Non</button>
        </div>

        <div id="score">Score : 0</div>
    </div>
`;

// Références aux éléments HTML, avec les IDs mis à jour pour les boutons
const imageElem = document.getElementById("question-image");
const questionTextElem = document.getElementById("question-texte");
const btnVert = document.getElementById("btn-vert");
const btnRouge = document.getElementById("btn-rouge");
const scoreElem = document.getElementById("score");
const messageElem = document.getElementById("message"); // Référence à l'élément message

function chargerQuestion() {
    canEarnPointForCurrentQuestion = true; // Réinitialiser pour la nouvelle question
    // Réactiver les boutons au début de chaque question
    btnVert.style.pointerEvents = 'auto';
    btnRouge.style.pointerEvents = 'auto';

    if (index >= questionsNiveau1.length) {
        imageElem.style.display = "none";
        questionTextElem.style.display = "none";
        document.querySelector(".buttons").style.display = "none";
        document.getElementById("progression").style.display = "none";
        messageElem.style.display = "none"; // Masquer le message de fin de jeu

        zoneJeu.innerHTML = `
            <h2>Bravo ! Score final : ${score}/${questionsNiveau1.length}</h2>
            <button onclick="location.reload()">Rejouer</button>
        `;
        return;
    }

    const progressionPourcentage = ((index + 1) / questionsNiveau1.length) * 100;
    document.getElementById("progression-remplie").style.width = `${progressionPourcentage}%`;
    document.getElementById("progression-texte").textContent = `Question ${index + 1} sur ${questionsNiveau1.length}`;

    imageElem.src = questionsNiveau1[index].src;
    questionTextElem.textContent = questionsNiveau1[index].question;
    imageElem.classList.add("entree");

    setTimeout(() => {
        imageElem.classList.remove("entree");
    }, 500);
}

function verifierReponse(reponseUtilisateur) {
    const bonneReponse = questionsNiveau1[index].reponse;
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

// Les écouteurs d'événements sont maintenant attachés aux nouveaux IDs
btnVert.addEventListener("click", () => verifierReponse("oui"));
btnRouge.addEventListener("click", () => verifierReponse("non"));

// Fonction pour revenir au menu
function retourMenu() {
    document.getElementById("jeu").style.display = "none";
    document.getElementById("accueil").style.display = "block";
}

chargerQuestion();
