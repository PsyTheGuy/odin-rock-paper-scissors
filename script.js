function getComputerChoice() {
    const choiceList = ['Rock', 'Paper', 'Scissors'];   // create a list of possible choices
    const choiceIndex = Math.floor(Math.random() * 3);   // determines a random number (0,1 or 2)
    return choiceList[choiceIndex]   // returns the randomly selected list item
}

function playRound(playerSelection, computerSelection) {
    const choiceList = ['Rock', 'Paper', 'Scissors'];   // create a list of possible choices
    playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase();   // handle case sensitivity
    const playerWon = choiceList.indexOf(playerSelection) > choiceList.indexOf(computerSelection) || choiceList.indexOf(playerSelection) === 0 && choiceList.indexOf(computerSelection) === 2;   // determine if the player won
    const isTie = choiceList.indexOf(playerSelection) === choiceList.indexOf(computerSelection);   // determine if the game is tied
    if (playerWon) {
        return `You Won! ${playerSelection} beats ${computerSelection}`;
    } else if (isTie) {
        return `It's a tie! Both selected ${playerSelection}`;
    } else {
        return `You Lose! ${computerSelection} beats ${playerSelection}`;
    };   // return who won the round
}
