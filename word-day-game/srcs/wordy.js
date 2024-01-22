
const letters = document.querySelectorAll(".letter");
const LENGTH = 5;

function isLetter(character) {
    return /^[A-Za-z]$/.test(character);
}

async function init(){

    let Guess = "";
    let Row = 0;
    function display(letter){
        if (Guess.length < LENGTH)
            Guess += letter;
    
        else
            Guess = Guess.substring(0, Guess.length - 1) + letter;
        
        letters[Row * LENGTH + Guess.length - 1].innerText = letter;
    }

    function backSpace(){
        
    }

    function enter(){
        if(Guess.length < LENGTH)
            return ;
        // if (Guess === ){

        // }
        Row++;
        Guess = '';
    }

    function backSpace(){
        Guess = Guess.substring(0, Guess.length - 1);
        letters[Row * LENGTH + Guess.length].innerText = '';
    }

    function switchCase(input){
        console.log(input);
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

    document.addEventListener("keydown", function handleInput(event){
        const input = event.key;
        switchCase(input);
    })
    
}

init();

