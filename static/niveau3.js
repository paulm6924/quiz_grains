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

const zoneJeu = document.getElementById("jeu");

zoneJeu.innerHTML = `
  <h1>Quiz - Gentil ou Mechant ?</h1>

  <div id="progression">
    <div id="progression-barre">
      <div id="progression-remplie"></div>
    </div>
    <div id="progression-texte">Image 1 sur ${images.length}</div>
  </div>

  <img id="question-image" src="" alt="Image à classer" />

  <div class="buttons">
    <button id="btn-vert">Gentil</button>
    <button id="btn-rouge">Mechant</button>
  </div>

  <div id="score">Score : 0</div>

  <audio id="son-bon" src="static/sons/Son_correct.mp3"></audio>
  <audio id="son-mauvais" src="static/sons/Son_faux.mp3"></audio>
`;

const imageElem = document.getElementById("question-image");
const btnVert = document.getElementById("btn-vert");
const btnRouge = document.getElementById("btn-rouge");
const scoreElem = document.getElementById("score");
const sonBon = document.getElementById("son-bon");
const sonMauvais = document.getElementById("son-mauvais");

function chargerQuestion() {
  if (index >= images.length) {
    imageElem.style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    document.getElementById("progression").style.display = "none";

    scoreElem.innerHTML = `
      <p>Bravo ! Score final : ${score}/${images.length}</p>
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

btnVert.addEventListener("click", () => verifierReponse("gentil"));
btnRouge.addEventListener("click", () => verifierReponse("mechant"));

chargerQuestion();