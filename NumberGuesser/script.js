//Game values
let min = 4,
  max = 10,
  winningNum = calculateRandomNumber(min, max),
  guessesLeft = 3;

//DOM Variables
console.log(winningNum);

const $game = document.querySelector('#game'),
  $minNum = document.querySelector('.min-num'),
  $maxNum = document.querySelector('.max-num'),
  $guessBtn = document.querySelector('#guess-button'),
  $guessInput = document.querySelector('#guess-input'),
  $message = document.querySelector('.message');

//Assign min and max numbers in the User Interface

$minNum.textContent = min;
$maxNum.textContent = max;

//Event Listeners

$game.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});

$guessBtn.addEventListener('click', () => {
  let guess = parseInt($guessInput.value);

  //Validate the input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please input a number between ${min} and ${max}`, 'red');
  }

  //Check if it is the winning number

  if (guess === winningNum) {
    gameOver(true, `You win!!! ${winningNum} is the correct number!`);
  } else {
    //Decrement guesses left
    guessesLeft--;

    if (guessesLeft === 0) {
      gameOver(false, `You lose!!! ${winningNum} was the correct number!`);
    } else {
      //Make the border red
      $guessInput.style.borderColor = 'red';
      //Clear the input
      $guessInput.value = '';
      //Inform the user
      setMessage(
        `Wrong guess! You have ${guessesLeft} ${
          guessesLeft === 1 ? 'guess' : 'guesses'
        } left.`,
        'red'
      );
    }
  }
});

function setMessage(msg, color) {
  $message.textContent = msg;
  $message.style.color = color;
}

function gameOver(won, msg) {
  let color = won ? 'green' : 'red';
  //Disable the input
  $guessInput.setAttribute('disabled', 'true');
  //Make the border green
  $guessInput.style.borderColor = 'color';
  //Inform the user they have won
  setMessage(msg, color);
  //Play again
  $guessBtn.value = 'Play again';
  $guessBtn.classList.add('play-again');
}

function calculateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
