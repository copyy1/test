class Memoria {
    constructor(){
        this.elements = {
            redBullUno : { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            redBullDos : { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
            mcLarenUno : { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            mcLarenDos : { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
            alpineUno : { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            alpineDos : { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
            astonMartinUno : { element: "AstonMartin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            astonMartinDos : { element: "AstonMartin", source: "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
            ferrariUno : { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            ferrariDos : { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
            mercedesUno : { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" },
            mercedesDos : { element: "Mercedes", source: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" },
        } 

        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements(){
        var array = Object.entries(this.elements);
        for(var i = array.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var aux = array[i];
            array[i] = array[j];
            array[j] = aux;
        }
        this.elements = Object.fromEntries(array);
    }

    unflipCards(){
        this.lockBoard = true;
        
        setTimeout(() => {
            var cards = document.querySelectorAll("section:nth-of-type(2) article");
            cards.forEach(card => {
                if(card.dataset.state === "flip")
                    card.dataset.state = "init"
            })
            this.resetBoard();
        }, 1700)
    }

    resetBoard(){
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch(){
        (this.secondCard.dataset.element === this.firstCard.dataset.element) 
            ? this.disableCards() : this.unflipCards();
    }

    disableCards(){
        this.firstCard.dataset.state = "revealed";
        this.secondCard.dataset.state = "revealed"
        this.resetBoard();
    }

    createElements(){
        var array = Object.entries(this.elements);
        var create = ""
        for(var i = 0; i < array.length; i++){
            create += "<article data-element=\"" + array[i][1].element + "\" data-state=\"init\" >";
            create += "<h3> Tarjeta de memoria </h3>"
            create += "<img src=\"" + array[i][1].source + "\" alt=\"" + array[i][1].element + "\"/>";
            create += "</article>\n";
        } 
        document.write(create);      
    }

    addEventListeners(){
        var cards = document.querySelectorAll("section:nth-of-type(2) article");

        cards.forEach(card => {
            card.addEventListener("click", this.flipCard.bind(card, this));
            card.addEventListener("keydown", this.flipCard.bind(card, this));
        })
    }

    flipCard(game){
        if(this.dataset.state === "revealed") return;
        if(game.lockBoard) return;
        if(game.firstCard != null && game.firstCard === this) return;

        this.dataset.state = "flip";

        if(game.hasFlippedCard){
            game.secondCard = this;
            game.checkForMatch();
        } else {
            game.hasFlippedCard = true;
            game.firstCard = this;
        }
    }
}