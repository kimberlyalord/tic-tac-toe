/*----- constants -----*/
const players = {
    '1': 'X',
    '-1': 'O',
    'null': 'transparent',
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
    board = [
        [null, null, null], // column 0
        [null, null, null], // column 1
        [null, null, null], // column 2
    ];
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
    board.forEach(function(cellArr, cellIdx) {
    cellArr.forEach(function(cell, cellIdx) {
        const div = document.getElementById(`c${cellIdx}r${cellIdx}`);
        div.style.innerHTML = players[turn];
    });
    });
}

function handleClick(event) {
    const cellIdx = boardCells.indexOf(event.target);
    // check that a cell was clicked and the game isn't over
    if (cellIdx === -1 || winner) return; 
    // check that cell is not full - get index of first null in column array
    const cellArr = board[cellIdx];
    if (cellIdx === -1) return; 
    // update the board's column
    boardCells[cellIdx] = turn;
    // calculate winner 
    getWinner();

    turn *= -1;
    // turn = turn * -1
    render();
}

function getWinner() {
    // iterate through all col arrays until a winner 
    for (let colIdx = 0; colIdx < board.length; colIdx++) {
        checkCol(colIdx);
        if (winner) break;
    }
}

function checkCol(colIdx) {
    const colArr = board[colIdx];
    for (let rowIdx = 0; rowIdx < colArr.length; rowIdx++) {
        if (colArr[rowIdx] === null) break;
        if (rowIdx < 2) winner = checkUp(colArr, rowIdx);
        if (winner) break; 
    }
}

function checkUp(colArr, rowIdx) {
    if (Math.abs(colArr[rowIdx] + colArr[rowIdx +1] + colArr[rowIdx + 2]) === 3) {
        return colArr[rowIdx];
    } else {
        return null;
    };
}