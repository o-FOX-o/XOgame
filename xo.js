const playerOneCells = [];

const playerTwoCells = [];

const broardCells = [];

let playerTurn = 'playerOne';

let playerOneScore = 0;
let playerTwoScore = 0;
let tie = 0;

function Playgame(x,y,cell) {
    if (playerTurn === 'playerOne') {
        playerTurn = 'playerTwo';
        if (broardCells.length === 0){
            addCellPlayerOne(x,y,cell);
        }else{
            let exist = false;
            for (let i = 0; i < broardCells.length; i++) {
                let cell = broardCells[i];
                if (cell.row === y && cell.column === x) {
                 exist = true;
                 console.log('Exist');
            }}
            if (!exist) {
                addCellPlayerOne(x,y,cell);
            }else{
                playerTurn = 'playerOne';
            }
        }
    }else if (playerTurn === 'playerTwo') {
        playerTurn = 'playerOne';
        if (broardCells.length === 0){
            addCellPlayerTwo(x,y,cell);
        }else{
            let exist = false;
            for (let i = 0; i < broardCells.length; i++) {
                let cell = broardCells[i];
            if (cell.row === y && cell.column === x) {
                 exist = true;
                 console.log('Exist');
            }}
            if (!exist) {
                addCellPlayerTwo(x,y,cell);
            }else{
                playerTurn = 'playerTwo';
            }
        }
    }
    console.log(playerOneCells);
    console.log(playerTwoCells);
    console.log(broardCells);
} 

function addCellPlayerOne(x,y,cell) {
    playerOneCells.push({row: y,column: x});
    broardCells.push({row: y,column: x});
    cell.classList.add('cell-x');;
}

function addCellPlayerTwo(x,y,cell) {
    playerTwoCells.push({row: y,column: x});
    broardCells.push({row: y,column: x});
    cell.classList.add('cell-o');
}

function checkWinner(array,cell) {
    const rowLine = {lineOne: 0, lineTwo: 0, lineThree: 0}
    const columnLine = {lineOne: 0, lineTwo: 0, lineThree: 0}
    //Scoring
    for (let i = 0; i < array.length; i++) {
        if (array[i].row == 1) {
            rowLine.lineOne++;
        }
        if (array[i].row == 2) {
            rowLine.lineTwo++;
        }
        if (array[i].row == 3) {
            rowLine.lineThree++;
        }
        if (array[i].column == 1) {
            columnLine.lineOne++;
        }
        if (array[i].column == 2) {
            columnLine.lineTwo++;
        }
        if (array[i].column == 3) {
            columnLine.lineThree++;
        }
    }
   

    //Recogniting player 
    let player = '';
    if(array === playerOneCells){
        player = 'Player one';
    }else if(array === playerTwoCells){
        player = 'Player two';
    } 
    //Checking
    const otherscrore = {positive: 0, negative: 0};
    array.forEach( (cell) => {
        if (cell.row == 1&& cell.column == 1|| cell.row == 2&& cell.column == 2|| cell.row == 3&&cell.column == 3) {
            otherscrore.positive++;
        }
        if (cell.row == 1&& cell.column == 3|| cell.row == 2&& cell.column == 2|| cell.row == 3&&cell.column == 1) {
            otherscrore.negative++;
        }
    })

    //Checking
    checkLines(rowLine.lineOne,player,cell);
    checkLines(rowLine.lineTwo,player,cell);
    checkLines(rowLine.lineThree,player,cell);
    checkLines(columnLine.lineOne,player,cell);
    checkLines(columnLine.lineTwo,player,cell);
    checkLines(columnLine.lineThree,player,cell);
    checkLines(otherscrore.positive,player,cell);
    checkLines(otherscrore.negative,player,cell);
    console.log(rowLine);
    console.log(columnLine);
    console.log(otherscrore);
}

//Checking function
function checkLines(line,player,cell){
    if(line === 3){
        winfunction(player);
        restGame(cell);
    }
    if(broardCells.length == 9){
        TieFunction();
        restGame(cell);
    }
}

//Game rest
function restGame(cell){
    playerOneCells.length = 0;
    playerTwoCells.length = 0;
    broardCells.length = 0;
    playerTurn = 'playerOne';
    document.querySelectorAll('.cell-x-o').forEach( (arrCell) => {
        arrCell.classList.remove('cell-o');
        arrCell.classList.remove('cell-x');
    });
}

function TieFunction(){
    tie++;
        alert('Tie');
    displayScore();
}

function winfunction(player){
    alert(`${player} Wins`);
    //setting score
    if(player === 'Player one'){
        playerOneScore++;
    }else if(player === 'Player two'){
        playerTwoScore++;
    };
    displayScore();
}

function displayScore(){
    document.querySelector('.player-one-score').innerHTML = playerOneScore;
    document.querySelector('.player-two-score').innerHTML = playerTwoScore;
    document.querySelector('.tie-score').innerHTML = tie;
}

document.querySelectorAll('.cell-x-o').forEach( (cell) => {
    cell.addEventListener('click', () => {
        Playgame(cell.getAttribute('data-x'), cell.getAttribute('data-y'),cell);
        checkWinner(playerOneCells,cell);
        checkWinner(playerTwoCells,cell);
    })
})

