window.onload = function () {
    let level = 1;
    let bClick = new Audio;
    bClick.src = "btn.mp3";
    let wComplete = new Audio;
    wComplete.src = "anim.mp3";
    let easyWords = ["Hy", "Me", "We", "Us", "TV", "Are", "go", "Car", "Van", "Man", "Dog", "Fat", "Blue", "Pink", "Time", "Apple", "Class", "Glass"]
    let mediumWords = ["purple", "orange", "family", "twelve", "silver", "Godard", "thirty", "donate", "people"];
    let hardWords = ["perfect", "Tuesday", "country", "pumpkin", "special", "freedom", "picture", "husband","nothing"];
    let balloons = document.getElementsByClassName("balloon");
    let orginalWordArry = [];
    let wordarry = [];

    let game = {
        shuffleWords() {
            if (level == 1) {
                leve.innerText = "1";
                NumberOfWords.innerText = easyWords.length;
                let wordPosition = Math.round(Math.random() * (easyWords.length - 1));
                WordIndex.value = wordPosition;
                var word = easyWords[wordPosition]
                myWord.innerText = word;
            } else if (level == 2) {
                leve.innerText = "2";
                NumberOfWords.innerText = mediumWords.length;
                let wordPosition = Math.round(Math.random() * (mediumWords.length - 1));
                var word = mediumWords[wordPosition]
                myWord.innerText = word;
            } else if(level == 3){
                leve.innerText = "3";
                NumberOfWords.innerText = hardWords.length;
                let wordPosition = Math.round(Math.random() * (mediumWords.length - 1));
                var word = mediumWords[wordPosition]
                myWord.innerText = word;
            }

            function shuffleWords() {
                for (let i = 0; i < word.length; i++) {
                    wordarry.push(word[i]);
                    orginalWordArry.push(word[i]);
                }
                wordarry.sort(function () { return 0.5 - Math.random() });
            }
            shuffleWords()
        },
        addBaloons() {
            for (let letter in wordarry) {
                let balloon = document.createElement("div");
                balloon.classList.add("balloon");
                let newSpan = document.createElement("span");
                newSpan.innerText = wordarry[letter];
                balloon.appendChild(newSpan);
                balloon.style.bottom = 0;
                balloon.setAttribute("id", letter)
                balloon.style.left = ((letter) * (window.innerWidth / 7)) + "px";
                shuffle.appendChild(balloon)
            }
        },
        moveBaloon() {
            setInterval(function () {
                for (let i = 0; i < balloons.length; i++) {
                    let newBottom = parseInt(balloons[i].style.bottom) + 1;
                    balloons[i].style.bottom = newBottom + 'px';
                }
            }, 15)
        },
        stopTimer() {
            let timerKey = setInterval(function () {
                if (TimeRanges.innerText != 0) {
                    let timer = parseInt(Time.innerText);
                    Time.innerText = timer + 1;
                } else {
                    clearInterval(timerKey);
                }
            }, 1000);
        },
        makeWord() {
            for (let balloon of balloons) {
                balloon.onclick = function () {
                    bClick.play()
                    if (balloon.firstChild.innerText == orginalWordArry[0]) {
                        balloon.remove();
                        orginalWordArry.splice(0, 1);
                        if (!orginalWordArry.length) {
                            NumberOfWords.innerText = NumberOfWords.innerText - 1;
                            wComplete.play();

                            // yaha pay error

                            if(leve == 1){
                                easyWords.splice(WordIndex.value, 1);
                            }else if(leve == 2){
                                mediumWords.splice(WordIndex.value, 1);
                            }else if(leve == 3){
                                hardWords.splice(WordIndex.value, 1);
                            }

                            wordarry = [];
                            orginalWordArry = [];
                            game.shuffleWords();
                            game.addBaloons();
                            game.makeWord();
                        }
                    } else if (balloon.firstChild.innerText != orginalWordArry[0]) {
                        alert("Game Over");
                        alert("Good Luck For Next Time")
                        alert("Game agin Start With 17 words");
                        shuffle.innerHTML = "";
                        wordarry = [];

                        // yaha pay error


                        if(leve == 1){
                            easyWords = ["Hy", "Me", "We", "Us", "TV", "Are", "go", "Car", "Van", "Man", "Dog", "Fat", "Blue", "Pink", "Time", "Apple", "Class", "Glass"]
                            NumberOfWords.innerText = easyWords.length;
                        }else if(leve == 2){
                            let mediumWords = ["purple", "orange", "family", "twelve", "silver", "Godard", "thirty", "donate", "people"]; 
                            NumberOfWords.innerText = mediumWords.length;
                        }else if(leve == 3){
                            let hardWords = ["perfect", "Tuesday", "country", "pumpkin", "special", "freedom", "picture", "husband","nothing"];
                            NumberOfWords.innerText = hardWords.length;
                        }
                        orginalWordArry = [];
                        game.shuffleWords();
                        game.addBaloons();
                        game.makeWord();
                    }
                }
            }
        },
        newLevel() {
            setInterval(() => {
                if (level == 1) {
                    if (myWord.innerText == "undefined") {
                        level = 2;
                        leve.innerText = "2";
                        game.shuffleWords();
                        game.addBaloons();
                        game.makeWord();
                    }
                }else if (level == 2) {
                    if (myWord.innerText == "undefined") {
                        level = 3;
                        leve.innerText = "3";
                        game.shuffleWords();
                        game.addBaloons();
                        game.makeWord();
                    }
                }
            }, 1);
        },
        start() {
            game.shuffleWords();
            game.addBaloons();
            game.moveBaloon();
            game.stopTimer();
            game.makeWord();
            game.newLevel();
        }
    }
    game.start();
}