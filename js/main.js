/*----- constants -----*/
const playerLookup = {
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

document.getElementById('resetButton').addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
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
          msgElement.innerHTML = `<span>${playerLookup[turn].toUpperCase()}</span> Wins!`;
        }
      } else {
        msgElement.innerHTML = `<span>${playerLookup[turn].toUpperCase()}'s</span> Turn`;
      }
    }

function renderBoard() {
    // Render the board
    board.forEach(function(colArr, colIdx) {
    colArr.forEach(function(cell, rowIdx) {
        // if (!colArr.includes(null)) markerElements[colIdx].style.visibility = 'hidden';
        const div = document.getElementById(`c${colIdx}r${rowIdx}`);
        div.style.innerHTML = playerLookup[cell];
    });
    });
}

function handleClick(event) {
    // get column index (colIdx) of clicked marker
    const colIdx = boardCells.indexOf(event.target);
    // ensure actual column marker was clicked and that the game isn't over
    if (colIdx === -1 || winner) return; 
    // check that column is not full - get index of first null in column array
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(null);
    if (rowIdx === -1) return; 
    // update the board's column
    colArr[rowIdx] = turn;
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
        if (rowIdx < 3) winner = checkUp(colArr, rowIdx);
        if (winner) break; 
    }
}

function checkUp(colArr, rowIdx) {
    if (Math.abs(colArr[rowIdx] + colArr[rowIdx +1] + colArr[rowIdx + 2] + colArr[rowIdx + 3]) ===4) {
        return colArr[rowIdx];
    } else {
        return null;
    };
}