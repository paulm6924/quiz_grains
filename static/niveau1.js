// Sons
const sonBon = new Audio("static/sons/Son_correct.mp3");
const sonMauvais = new Audio("sattic/sons/Son_faux.mp3");

// Tableau des questions pour le Niveau 1
// Le user devra adapter les chemins des images et les reponses
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

const zoneJeu = document.getElementById("jeu");

zoneJeu.innerHTML = `
    <h1>Niveau 1 : Savoir Decrire</h1>

    <div id="progression">
        <div id="progression-barre">
            <div id="progression-remplie"></div>
        </div>
        <div id="progression-texte">Question 1 sur ${questionsNiveau1.length}</div>
    </div>

    <img id="question-image" src="" alt="Image de grain de beaute" />

    <h2 id="question-texte"></h2>

    <div class="buttons">
        <button id="btn-oui">Oui</button>
        <button id="btn-non">Non</button>
    </div>

    <div id="score">Score : 0</div>
`;

const imageElem = document.getElementById("question-image");
const questionTextElem = document.getElementById("question-texte");
const btnOui = document.getElementById("btn-oui");
const btnNon = document.getElementById("btn-non");
const scoreElem = document.getElementById("score");

function chargerQuestion() {
    if (index >= questionsNiveau1.length) {
        imageElem.style.display = "none";
        questionTextElem.style.display = "none";
        document.querySelector(".buttons").style.display = "none";
        document.getElementById("progression").style.display = "none";

        zoneJeu.innerHTML = `
            <h2>Bravo ! Score final : ${score}/${questionsNiveau1.length}</h2>
            <button onclick="location.reload()">Rejouer</button>
            <button onclick="retourMenu()">Retour au menu</button>
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
        score++;
        scoreElem.textContent = `Score : ${score}`;
    }

    imageElem.classList.add(effet);
    son.currentTime = 0;
    son.play();

    setTimeout(() => {
        imageElem.classList.remove(effet);
        index++;
        chargerQuestion();
    }, 1000);
}

btnOui.addEventListener("click", () => verifierReponse("oui"));
btnNon.addEventListener("click", () => verifierReponse("non"));

// Fonction pour revenir au menu, dejà definie dans votre index.html
function retourMenu() {
    document.getElementById("jeu").style.display = "none";
    document.getElementById("accueil").style.display = "block";
}

chargerQuestion();