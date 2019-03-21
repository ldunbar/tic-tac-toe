/**
 * Logic to play Tic-Tac-Toe
 */

var whoIsNext = 'X'    // "X" always starts
var turnNbr = 0        // No one has taken a turn yet
var winningPlayer = '' // No winner yet

// Set the possible winning positions. The arrays contain the element
// IDs for the player's moves that represent a winning position.
const winningPositions = [
  ['a1','a2','a3'],
  ['b1','b2','b3'],
  ['c1','c2','c3'],
  ['a1','b2','c3'],
  ['a3','b2','c1'],
  ['a1','b1','c1'],
  ['a2','b2','c2'],
  ['a3','b3','c3']
]

/**
 * Determine if a winning position has been reached by any player.
 *
 * @param {character} x_o - Either "X" or "O"
 *
 * @returns {character} - Either "" (no winner), "X" (X is the winner),
 *                        or "O" (O is the winner).
 */
function weHaveWinner(x_o) {

  let winner = '' // Initial state is no winner

  // Need at least 5 total moves before a winning position can be reached.
  if (turnNbr < 5) return winner

  // Gather all the element IDs with a class that matches the player's token (X or O).
  let ids = [...document.querySelectorAll('.'+x_o)]
  ids = ids.map((el) => { return el.id })

  // If there are 3 player tokens, then there is something to check. Cannot win if less
  // than 3 tokens on the board.
  if (ids.length >= 3) {

    // See if a winning position is within the gathered player's IDs. If so, then return
    // the wining player's token,
    winningPositions.forEach(arr => {
      let isWinner = ids.every((value) => {
        return (arr.indexOf(value) >= 0)
      })
      if (isWinner) winner = x_o
    })
  }
  // No winner, so return an empty string.
  return winner
}

/**
 * Someone won or it was a draw, so reset the board for another game.
 * Reset all palying values to their default states.
 */
function resetBoard() {
  whoIsNext = 'X'
  turnNbr = 0
  winningPlayer = ''

  // Clear classes added during play.
  cells.forEach(cel => {
    cel.classList.remove('clicked', 'X', 'O')
  })
}

// Gather all elements with a class of 'ttt', These elements are the "board".
const cells = [...document.querySelectorAll('.ttt')]

// Assign a click event on each board cell and the logic to handle the click.
cells.forEach(cel => {
  cel.onclick = (e) => {
    e.preventDefault;

    // If the cell has already been clicked, do nothing.
    if (cel.classList.contains('clicked')) {
      // alert('Cannot click this cell.')
    }
    else {

      // Add classes to indicate that the cell was clicked, and who clicked it.
      cel.classList.add('clicked', whoIsNext)

      // Enter the player's token into the element and increment the number of turns counter.
      cel.innerText = whoIsNext
      turnNbr += 1

      // If there is no winner and all turns have been made, then it is a draw. Tell the
      // player and then reset the board.
      if (winningPlayer === '' && turnNbr === 9) {
        alert("Cat's game!")
        resetBoard()
      }
      else {

        // See if we have a winner. If so, announce who won and then reset the board.
        winningPlayer = weHaveWinner(whoIsNext)
        if (winningPlayer !== '') {
          alert(`${whoIsNext} has won!`)
          resetBoard()
        } else {

          // No winner, so switch to the next player's token.
          whoIsNext = (whoIsNext === 'X') ? 'O' : 'X'
        }
      }
    }
  }
})
