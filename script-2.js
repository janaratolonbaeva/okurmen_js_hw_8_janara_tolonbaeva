// Создаем объект для хранения состояния игры
const game = {
  words: ['apple', 'banana', 'orange', 'strawberry', 'kiwi'], // список слов для угадывания
  guessedWord: '', // загаданное слово
  displayWord: '', // слово с подчеркиваниями
  remainingAttempts: 0, // количество попыток
  guessedLetters: [], // угаданные буквы
};

// Функция для выбора случайного слова из списка
function chooseWord() {
  const randomIndex = Math.floor(Math.random() * game.words.length);
  game.guessedWord = game.words[randomIndex];
  game.displayWord = '_'.repeat(game.guessedWord.length);
}

// Функция для обновления отображаемого слова с угаданными буквами
function updateDisplayWord(letter) {
  let newDisplayWord = '';

  for (let i = 0; i < game.guessedWord.length; i++) {
    if (game.guessedWord[i] === letter || game.displayWord[i] !== '_') {
      newDisplayWord += game.guessedWord[i];
    } else {
      newDisplayWord += '_';
    }
  }

  game.displayWord = newDisplayWord;
}

// Функция для проверки введенной буквы и обновления состояния игры
function checkLetter(letter) {
  if (game.guessedLetters.includes(letter)) {
    alert('You have already guessed that letter. Try another one.');
    game.remainingAttempts++;
    return;
  }

  if (game.guessedWord.includes(letter)) {
    updateDisplayWord(letter);
    game.guessedLetters.push(letter);

    if (game.displayWord === game.guessedWord) {
      alert(
        `Congratulations! You guessed the word "${game.guessedWord}" with ${game.remainingAttempts} attempts left.`
      );

      resetGame();
    }
  } else {
    game.remainingAttempts++;
  }
}

// Функция для сброса состояния игры и начала новой игры
function resetGame() {
  game.guessedLetters = [];
  game.remainingAttempts = 0;

  const index = game.words.indexOf(game.guessedWord);

  if (index !== -1) {
    game.words.splice(index, 1);

    if (game.words.length === 0) {
      alert('No more words to guess. Game over!');
      return;
    }
  }

  chooseWord();
}

// Основной игровой цикл
while (true) {
  chooseWord();

  while (true) {
    const letter = prompt(
      `Current word: ${game.displayWord}\nRemaining attempts: ${game.remainingAttempts}\nEnter a letter:`
    );

    if (!letter) break; // Если пользователь нажал "Отмена", завершаем игру

    if (letter.length !== 1) {
      alert('Please enter a single letter.');
      continue;
    }

    checkLetter(letter.toLowerCase());
  }

  const playAgain = confirm('Do you want to play again?');

  if (!playAgain) break;
}
