const foto = [
    "('images/c.jpg')",
    "('images/manoontje.jpg')",
    "('images/gelijkheid.jpg')",
    "('images/usa.jpg')",
    "('images/haumea.jpg')",
    "('images/a.jpg')"
];

const gebruikteAfbeeldingen = {};
const gevondenAfbeeldingenCaine = {};
const gevondenAfbeeldingenAbel = {};
const elementenMetClassKaart = document.getElementsByClassName("kaart");
var geselecteerdeKaarten = [];
const totaalAantalParen = foto.length;
const gezamenlijkGevondenAfbeeldingen = {};

const spelers = ['Caine', 'Abel'];
let SpelerIndex = 0;
let puntenCaine = 0;
let puntenAbel = 0;
let gevondenParen = 0;

function wisselSpeler() {
    SpelerIndex = 1 - SpelerIndex;
    document.getElementById('huidigeSpeler').innerText = 'Huidige speler: ' + spelers[SpelerIndex];
}

function updatePunten() {
    document.getElementById('Player1').innerText = `Caine: ${puntenCaine} punten`;
    document.getElementById('Player2').innerText = `Abel: ${puntenAbel} punten`;
}

function controleerWinnaar() {
    if (gevondenParen === totaalAantalParen) {
        let winnaar = '';

        if (puntenCaine > puntenAbel) {
            winnaar = 'Caine';
        } else if (puntenCaine < puntenAbel) {
            winnaar = 'Abel';
        } else {
            winnaar = 'Gelijkspel';
        }

        document.getElementById('menu').innerHTML = `<h1>${winnaar === 'Gelijkspel' ? 'Het is een gelijkspel!' : `${winnaar} wint!`}</h1>`;
        setTimeout(function() {
            window.location.href = 'start.html';
        }, 3000);
    }
}

for (let i = 0; i < elementenMetClassKaart.length; i++) {
    let willekeurigeIndex;
    do {
        willekeurigeIndex = Math.floor(Math.random() * foto.length);
    } while (gebruikteAfbeeldingen[willekeurigeIndex] >= 2);

    const willekeurigeAfbeelding = "url" + foto[willekeurigeIndex];
    elementenMetClassKaart[i].style.backgroundImage = "url('images/B.png')";
    elementenMetClassKaart[i].style.backgroundSize = "230px 230px";
    gebruikteAfbeeldingen[willekeurigeIndex] = (gebruikteAfbeeldingen[willekeurigeIndex] || 0) + 1;

    elementenMetClassKaart[i].addEventListener("click", function () {
        if (geselecteerdeKaarten.length === 2) {
            return;
        }

        if (geselecteerdeKaarten.includes(this.id)) {
            return;
        }

        if (this.getAttribute("data-gevonden") === "true") {
            return;
        }

        this.style.backgroundImage = willekeurigeAfbeelding;
        this.setAttribute("data-afbeelding", foto[willekeurigeIndex]);

        geselecteerdeKaarten.push(this.id);

        if (geselecteerdeKaarten.length === 2) {
            var kaart1 = document.getElementById(geselecteerdeKaarten[0]);
            var kaart2 = document.getElementById(geselecteerdeKaarten[1]);

            var afbeelding1 = kaart1.getAttribute("data-afbeelding");
            var afbeelding2 = kaart2.getAttribute("data-afbeelding");

            if (afbeelding1 === afbeelding2) {
                kaart1.setAttribute("data-gevonden", "true");
                kaart2.setAttribute("data-gevonden", "true");
                geselecteerdeKaarten = [];
            
                if (afbeelding1.includes('a.jpg') && SpelerIndex === 0) {
                    puntenAbel += 2;
                } else if (afbeelding1.includes('c.jpg') && SpelerIndex === 1) {
                    puntenCaine += 2;
                }
            
                if (afbeelding1.includes('a.jpg') || afbeelding1.includes('c.jpg')) {
                    gezamenlijkGevondenAfbeeldingen[afbeelding1] = true;
                }
            
                if (SpelerIndex === 0) {
                    puntenCaine++;
                    gevondenAfbeeldingenCaine[afbeelding1] = true;
                } else {
                    puntenAbel++;
                    gevondenAfbeeldingenAbel[afbeelding1] = true;
                }
            
                gevondenParen++;
                controleerWinnaar();
            
                wisselSpeler();
                updatePunten();
            } else {
                setTimeout(function () {
                    kaart1.style.backgroundImage = "url('images/B.png')";
                    kaart2.style.backgroundImage = "url('images/B.png')";
                    geselecteerdeKaarten = [];
                    wisselSpeler();
                }, 1000);
            }
        }
    });
}

document.getElementById('reset').addEventListener('click', function () {
    window.location.href = 'index.html';
});