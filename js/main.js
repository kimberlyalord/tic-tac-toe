/*----- constants -----*/
const players = {
    '1': 'X',
    '-1': 'O',
    'null': null,
};


/*----- app's state (variables) -----*/
let board;
let turn;
let winner;


/*----- cached element references -----*/
const boardCells = Array.from(document.querySelectorAll('#board > div'));

const msgElement = document.getElementById('message');


/*----- event listeners -----*/
document.getElementById('board')
    .addEventListener('click', handleClick);

document.getElementById('resetButton').addEventListener('click', initialize);


/*----- functions -----*/
initialize();

function initialize() {
    board = [null, null, null, null, null, null, null, null, null]; // column 2
    turn = 1;
    winner = null;
    render();
}

function render() {
    renderBoard();
    if (winner) {
        if (winner === 'T') {
          msgElement.innerHTML = "It's a Tie!";
        } else {
          msgElement.innerHTML = `<span>${players[turn].toUpperCase()}</span> Wins!`;
        }
      } else {
        msgElement.innerHTML = `<span>${players[turn].toUpperCase()}'s</span> Turn`;
      }
    }

function renderBoard() {
    // Render the board
    board.forEach(function(cell, idx) {
            const div = document.getElementById(`c${idx}`);
            div.innerText = players[cell];
    });
}

function handleClick(event) {
    const cellIdx = boardCells.indexOf(event.target);
    console.log(cellIdx);
    // check that a cell was clicked and the game isn't over
    if (cellIdx === -1 || winner) return; 
    // check that cell is not full - get index of first null in column array
    // update the board's column
    board[cellIdx] = turn;
    // calculate winner 
    getWinner();

    turn *= -1;
    // turn = turn * -1
    render();
}

function getWinner() {
    // iterate through all col arrays until a winner 
    for (let cellIdx = 0; cellIdx < board.length; cellIdx++) {
        checkForWinner(cellIdx);
        if (winner) break;
    }
}

function checkForWinner(cellIdx) {
    if (Math.abs(board[0] + board[1] + board[2]) === 3) {
        return winner;
    } else {
        return null;
    }
}

// function checkUp(colArr, rowIdx) {
//     if (Math.abs(colArr[rowIdx] + colArr[rowIdx +1] + colArr[rowIdx + 2]) === 3) {
//         return colArr[rowIdx];
//     } else {
//         return null;
//     };
// }