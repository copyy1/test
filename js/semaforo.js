class Semaforo {
    constructor(){
        this.levels = [0.2, 0.5, 0.8];
        this.lights = 4;
        this.unload_moment = null;
        this.clic_moment = null;
        this.difficulty = this.generateRandomDifficulty();

        this.createStructure();
    }

    generateRandomDifficulty(){
        var index = Math.floor(Math.random() * this.levels.length);
        return this.levels[index];
    }

    createStructure(){
        var main = document.querySelector("main");

        var title = document.createElement('h2');
        title.textContent = "Semáforo";

        main.append(title);

        for(var i = 0; i <= this.levels.length; i++){
            var div = document.createElement('div');
            main.append(div);
        }

        var pTime = document.createElement('p');
        main.append(pTime);

        var startButton = document.createElement('button');
        startButton.textContent = "Arranque";
        startButton.name = "startButton";
        startButton.onclick = this.initSequence.bind(this);
        main.append(startButton);

        var stopButton = document.createElement('button');
        stopButton.textContent = "Reacción";
        stopButton.name = "stopButton";
        stopButton.disabled = true;
        stopButton.onclick = this.stopReaction.bind(this);
        main.append(stopButton);
    }

    initSequence(){
        var main = document.querySelector("main");
        main.classList.add("load");

        var startButton = document.querySelector("button:first-of-type");
        startButton.disabled = true;

        var time = this.difficulty * 100;

        setTimeout(() => {
            this.unload_moment = new Date();
            this.endSequence();
        }, 2000 + time);
    }

    endSequence(){
        var main = document.querySelector("main");
        main.classList.add("unload");

        var stopButton = document.querySelector("button:nth-of-type(2)");
        stopButton.disabled = false;
    }

    stopReaction(){
        this.clic_moment = new Date();
        var reactionTime = (this.clic_moment - this.unload_moment) / 1000; 
        var roundedReactionTime = reactionTime.toFixed(3);

        var main = document.querySelector("main");
        var pTime = document.querySelector("main p");
        pTime.textContent = `Tiempo de reacción: ${roundedReactionTime} s`;

        main.classList.remove("load", "unload");

        var startButton = document.querySelector("button:first-of-type");
        startButton.disabled = false;
        var stopButton = document.querySelector("button:nth-of-type(2)");
        stopButton.disabled = true;
    }
}