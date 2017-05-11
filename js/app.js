$(document).ready(function() {
  console.log("Hello");

  // Call for the bootstrap modal on page load. h/t http://stackoverflow.com/questions/10233550/launch-bootstrap-modal-on-page-load
  $('#myModal').modal('show')

  // aliases!
  var $player1NameText = $("#player-1-name");
  var $player1NameDisplay = $("#player-1-name-display");
  var $player2NameText = $("#player-2-name");
  var $player2NameDisplay = $("#player-2-name-display");
  var $player3NameText = $("#player-3-name");
  var $player3NameDisplay = $("#player-3-name-display");
  var $submitButton = $("#submit-player-names")

  // Userful Variables
  var words = ["HelloWorld", "Disambiguation", "General", "Assembly"];
  var letters;
  var player1Score = 0;
  var player2Score = 0;
  var player3Score = 0;
  var turn = "player1"

  // Submit Player Names to be displayed
  $submitButton.on("click", function() {
    $player1NameDisplay.text(`Name: ${$player1NameText.val()}`)
    $player2NameDisplay.text(`Name: ${$player2NameText.val()}`)
    $player3NameDisplay.text(`Name: ${$player3NameText.val()}`)
  })

  // **************************
  // **************************
  // **************************

  // Program Pseudocode - Choose a random word
  // // CHOOSE a word from the words away randomly
  // // SEPERATE each letter in the word
  // // DISPLAY each letter as an empty box
  // Using https://jsfiddle.net/phollott/x29ym2ag/ as inspitation here, for logic, but styling and how we "split" the puzzle into letters is much different for me.

  var puzzle = words[Math.floor(Math.random() * words.length)]
  var letters = puzzle.toUpperCase().split("")
  letters.forEach(function(letter) {
    $("#puzzle-wrapper ul").append(
      `<li><span class="start">${letter}</span></li>`)
  })

  // **************************
  // **************************
  // **************************

  // Increment the turn
  var incrementTurn = function() {
    if (turn === "player1") {
      turn = "player2";
      $("#player-1").removeClass("player-1-turn")
      $("#player-2").addClass("player-2-turn")
    } else if (turn === "player2") {
      turn = "player3";
      $("#player-2").removeClass("player-2-turn")
      $("#player-3").addClass("player-3-turn")
    } else {
      turn = "player1"
      $("#player-3").removeClass("player-3-turn")
      $("#player-1").addClass("player-1-turn")
    }
  }
  $("#increment").on("click", incrementTurn)
})
