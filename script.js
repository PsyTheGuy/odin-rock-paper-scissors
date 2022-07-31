function getComputerChoice() {
    choiceList = ['rock', 'paper', 'scissors'];
    choiceIndex = Math.floor(Math.random() * 3);   // determines a random number (0,1 or 2)
    return choiceList[choiceIndex]   // returns the randomly selected list item
}