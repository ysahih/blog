let buffer = '0';
let total = 0;
let operation;

function displayDigits(value){
    if (buffer === '0')
        buffer = value;
    else   
        buffer += value;
}

function handleMath(value){
    if (buffer === '0')
        return ;
    let buff = parseInt(buffer);
    if (total === 0)
        total = buff;
    else
        doMath(buff)
    operation = value;
    buffer = '0';
}

function doMath(buff){
    switch (operation){
        case '+':
            total += buff;
            break;
        case '-':
            total -= buff;
            break;
        case '*':
            total *= buff;
            break;
        case '/':
            total /= buff;
            break;
    }
}

function handleSymbol(value){

    switch (value){
        case 'C':
            buffer = '0';
            break;
        case '←':
            if (buffer.length == 1)
                buffer = '0';
            else
                buffer = buffer.substring(0, buffer.length - 1);
            break;
        case '=':
            if (operation === null)
                return;
            doMath(parseInt(buffer));
            operation = null;
            buffer = "" + total;
            total = 0;
            break;
        default:
            handleMath(value);
    }
}

function buttonClick(value){
    if (value >= 0 && value <= 9)
        displayDigits(value);
    else
        handleSymbol(value);
    upDate();
}


function init(){
    document.querySelector(".buttons").addEventListener("click",function(event){
        buttonClick(event.target.innerText);
    } );
}

function upDate(){
    document.querySelector(".output").innerText = buffer;
}

init();