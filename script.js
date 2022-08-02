const choiceList = ['Rock', 'Paper', 'Scissors'];

function getComputerChoice() {
    //  roll a random number to determine choice (0, 1 or 2)
    const choiceIndex = Math.floor(Math.random() * 3);
    //  return the choice
    return choiceList[choiceIndex];
}

function playRound(playerSelection, computerSelection) {
    //  convert arguments to numbers
    playerSelection = choiceList.indexOf(playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase());
    computerSelection = choiceList.indexOf(computerSelection);

    //  create object to store results
    let result = {};

    //  determine the result and save it to the result object
    if (playerSelection > computerSelection || playerSelection === 0 && computerSelection === 2) {
        result.message = `You Won! ${choiceList[playerSelection]} beats ${choiceList[computerSelection]}`;
        result.winner = "player";
    } else if (playerSelection === computerSelection) {
        result.message = `It's a tie! Both selected ${choiceList[playerSelection]}`;
        result.winner = null;
    } else {
        result.message = `You Lose! ${choiceList[computerSelection]} beats ${choiceList[playerSelection]}`;
        result.winner = "computer";
    };

    //  return the result object
    return result;
}

function game() {

    //  create variable to store player score
    let playerScore = 0;
    //  create variable to store computer score
    let computerScore = 0;

    //  loop trough 5 rounds of the game
    for (let numberOfRounds = 0; numberOfRounds < 5; numberOfRounds++) {
    //  get the player's choice and store it in a variable
        let playerSelection = prompt('Choose one! (Rock, Paper or Scissors)');
    //  get the computer's choice and store it in a variable
        let computerSelection = getComputerChoice();
    //  play the round and store the result in a variable
        let result = playRound(playerSelection, computerSelection);
    
    //  announce the result of the round
        console.log(result.message);
    //  if player won increase score
        if (result.winner == "player") {
            playerScore += 1;
        };
        
    //  if computer won increase score
        if (result.winner == "computer") {
            computerScore += 1;
        };
    };

    //  announce the result of the game
    if (playerScore > computerScore) {
        console.log(`You won the game! Player: ${playerScore}, Computer: ${computerScore}`);
    } else if (computerScore > playerScore) {
        console.log(`You lost the game! Player: ${playerScore}, Computer: ${computerScore}`);
    } else {
        console.log(`It's a tie! Player: ${playerScore}, Computer: ${computerScore}`);
    };
}