const arrayOfVariants = ['rock', 'paper', 'scissors'];
const winnerTexts = ['draw', 'user', 'computer'];
const scoreOfPlayers = {
  userScore: 0,
  computerScore: 0,
};

function validateAnswerOfUser() {
  let answer = prompt('Enter a rock, a paper or a scissors');

  if (answer === null) return null;

  while (!arrayOfVariants.includes(answer) && answer !== null && answer === '') {
    answer = prompt('Error! Please enter a rock, a paper or a scissors.');
  }

  return answer.toLowerCase();
}

function computerPlay(answer) {
  if (arrayOfVariants.includes(answer)) {
    const randomIndex = Math.floor(Math.random() * arrayOfVariants.length);

    if (arrayOfVariants.includes(answer)) {
      alert(`Computer enter ${arrayOfVariants[randomIndex]}`);

      return arrayOfVariants[randomIndex];
    }
  } else {
    return null;
  }
}

function playRound(player, computer) {
  if (player === null || computer === null) {
    return null;
  } else if (player === computer) {
    return winnerTexts[0];
  } else if (
    (player === arrayOfVariants[0] && computer === arrayOfVariants[2]) || //Таш кайчыны утат
    (player === arrayOfVariants[2] && computer === arrayOfVariants[1]) || //Кайчы кагазды утат
    (player === arrayOfVariants[1] && computer === arrayOfVariants[0]) //Кагаз ташты утат
  ) {
    return winnerTexts[1];
  } else {
    return winnerTexts[2];
  }
}

function getWinner() {
  if (scoreOfPlayers.userScore > scoreOfPlayers.computerScore) {
    alert(
      `Game over! Congratulations! You won with the score: You ${scoreOfPlayers.userScore}, Computer ${scoreOfPlayers.computerScore}`
    );
  } else if (scoreOfPlayers.userScore < scoreOfPlayers.computerScore) {
    alert(
      `Game over. Unfortunately, you lost with the score: You ${scoreOfPlayers.userScore}, Computer ${scoreOfPlayers.computerScore}`
    );
  } else {
    alert(`Game over. Draw! Score: You ${scoreOfPlayers.userScore}, Computer ${scoreOfPlayers.computerScore}`);
  }
}

function playGame() {
  while (true) {
    const userAnswer = validateAnswerOfUser();
    const computerAnswer = computerPlay(userAnswer);

    const winner = playRound(userAnswer, computerAnswer);

    if (winner === null) {
      getWinner();

      const repeatGame = confirm('Do you want to play again?');

      if (!repeatGame) {
        break;
      }

      playGame();

      break;
    } else if (winner === winnerTexts[1]) {
      scoreOfPlayers.userScore++;

      alert(`You win! Current Score: You ${scoreOfPlayers.userScore}, Computer ${scoreOfPlayers.computerScore}`);
    } else if (winner === winnerTexts[2]) {
      scoreOfPlayers.computerScore++;

      alert(
        `Sorry! The computer won! Current Score: You ${scoreOfPlayers.userScore}, Computer ${scoreOfPlayers.computerScore}`
      );
    } else {
      alert(`Draw! Current Score: You ${scoreOfPlayers.userScore}, Computer ${scoreOfPlayers.computerScore}`);
    }
  }
}

playGame();
