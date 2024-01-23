
const letters = document.querySelectorAll(".letter");

const LENGTH = 5;

function isLetter(character) {
    return /^[A-Za-z]$/.test(character);
}


async function init(){

    let Guess = "";
    let Row = 0;
    let finished = false;

    const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();


    function display(letter){
        if (Guess.length < LENGTH)
            Guess += letter;
    
        else
            Guess = Guess.substring(0, Guess.length - 1) + letter;
        
        letters[Row * LENGTH + Guess.length - 1].innerText = letter;
    }


    async function enter(){

        if(Guess.length < LENGTH)
            return ;

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${Guess}`);
        const resObj = await response.json();
        
        if (resObj.title === "No Definitions Found") {
            alert("Word not in dictionary");
            return;
        }
        
        for (let i = 0; i<LENGTH; i++){
            if (Guess.charAt(i) !== word.charAt(i) && word.includes(Guess.charAt(i))){
                letters[Row * LENGTH + i].classList.add("close");
                document.querySelector("." + Guess.charAt(i)).classList.add("close");
            }
            else  if (Guess.charAt(i) !== word.charAt(i)){
                letters[Row * LENGTH + i].classList.add("wrong");
                document.querySelector("." + Guess.charAt(i)).classList.add("wrong");
            }
        }
        
        for (let i = 0; i<LENGTH; i++){
            
            if (Guess.charAt(i) === word.charAt(i) ){
                letters[Row * LENGTH + i].classList.add("correct");
                document.querySelector("." + Guess.charAt(i)).classList.add("correct");
            }
        }
        
        Row++;
        
        if (Row == 6 && finished)
            alert("You lose!");
    
        if (word == Guess){
            alert("You Win!");
            finished = true;
        }

        Guess = '';
}

    function backSpace(){
        Guess = Guess.substring(0, Guess.length - 1);
        letters[Row * LENGTH + Guess.length].innerText = '';
    }

    function switchCase(input){

        if (finished || Row == 6)
            return;
        if (input == "Enter" || input == "ENTER")
            enter();
        else if (input == "Backspace" || input == "backspace")
            backSpace();
        else if (isLetter(input))
            display(input.toUpperCase());
    }
    
    document.querySelector(".clavier").addEventListener("click", function (event){
        switchCase(event.target.innerText);
    })

    document.addEventListener("keydown", function (event){
        switchCase(event.key);
    })
}

init();

