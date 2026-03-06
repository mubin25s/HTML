let cells = document.querySelectorAll('.cell');
let statusText = document.getElementById('status');
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function cellClicked(index) {
    if(options[index] != "" || !running) return;
    options[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    checkWinner();
}

function checkWinner() {
    let roundWon = false;
    for(let i=0; i<winConditions.length; i++) {
        let condition = winConditions[i];
        if(options[condition[0]] != "" && options[condition[0]] == options[condition[1]] && options[condition[1]] == options[condition[2]]) {
            roundWon = true; break;
        }
    }
    if(roundWon) { statusText.textContent = `Player ${currentPlayer} Wins!`; running = false; }
    else if(!options.includes("")) { statusText.textContent = `Draw!`; running = false; }
    else { currentPlayer = currentPlayer == "X" ? "O" : "X"; statusText.textContent = `Player ${currentPlayer}'s turn`; }
}
function restartGame() {
    currentPlayer = "X"; options = ["", "", "", "", "", "", "", "", ""]; statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = ""); running = true;
}
