let userScore = 0;
let compScore = 0;

const userScore_span = document.getElementById("userScore");
const compScore_span = document.getElementById("compScore");
const result_p = document.getElementById("result");

const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");

const userChoiceDisplay = document.getElementById("userChoiceDisplay");
const compChoiceDisplay = document.getElementById("compChoiceDisplay");

const emojis = {
    'rock': '✊',
    'paper': '🖐️',
    'scissors': '✌️'
};

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function updateBattlefield(userChoice, compChoice) {
    userChoiceDisplay.textContent = emojis[userChoice];
    compChoiceDisplay.textContent = emojis[compChoice];
    
    // Reset animations
    userChoiceDisplay.classList.remove('animate');
    compChoiceDisplay.classList.remove('animate');
    
    // Trigger reflow to restart animation
    void userChoiceDisplay.offsetWidth;
    void compChoiceDisplay.offsetWidth;
    
    userChoiceDisplay.classList.add('animate');
    compChoiceDisplay.classList.add('animate');
}

function win(userChoice, compChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = `${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} beats ${compChoice}. You win! 🎉`;
    result_p.className = 'win';
}

function lose(userChoice, compChoice) {
    compScore++;
    compScore_span.innerHTML = compScore;
    result_p.innerHTML = `${compChoice.charAt(0).toUpperCase() + compChoice.slice(1)} beats ${userChoice}. You lose! 😢`;
    result_p.className = 'lose';
}

function draw(userChoice, compChoice) {
    result_p.innerHTML = `${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} equals ${compChoice}. It's a draw. 🤝`;
    result_p.className = 'draw';
}

function game(userChoice) {
    const compChoice = getComputerChoice();
    updateBattlefield(userChoice, compChoice);
    
    const outcome = userChoice + compChoice;
    switch (outcome) {
        case "rockscissors":
        case "paperrock":
        case "scissorspaper":
            win(userChoice, compChoice);
            break;
        case "rockpaper":
        case "paperscissors":
        case "scissorsrock":
            lose(userChoice, compChoice);
            break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
            draw(userChoice, compChoice);
            break;
    }
}

function main() {
    rock_div.addEventListener('click', () => game("rock"));
    paper_div.addEventListener('click', () => game("paper"));
    scissors_div.addEventListener('click', () => game("scissors"));
}

main();
