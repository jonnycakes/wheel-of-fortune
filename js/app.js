$(document).ready(function() {
  console.log("Hello");

  // Call for the bootstrap modal on page load. h/t http://stackoverflow.com/questions/10233550/launch-bootstrap-modal-on-page-load
  $('#myModal').modal('show')


  var $player1NameText = $("#player-1-name");
  var $player1NameDisplay = $("#player-1-name-display");
  var $player2NameText = $("#player-2-name");
  var $player2NameDisplay = $("#player-2-name-display");
  var $player3NameText = $("#player-3-name");
  var $player3NameDisplay = $("#player-3-name-display");
  var $submitButton = $("#submit-player-names")



  var words = ["HelloWorld", "Disambiguation", "General", "Assembly"];
  var letters;

  // Submit Player Names to be displayed
  $submitButton.on("click", function() {
    $player1NameDisplay.text(`Name: ${$player1NameText.val()}`)
    $player2NameDisplay.text(`Name: ${$player2NameText.val()}`)
    $player3NameDisplay.text(`Name: ${$player3NameText.val()}`)
  })

  // Program Pseudocode - Choose a random word
  // Choose a word from the words away randomly
  // break down the word into each letter
  // display each letter as an underscore
  // Using https://jsfiddle.net/phollott/x29ym2ag/ to guide me through, but I'm trying to convert as much of it as I can to jQuery

  var puzzle = words[Math.floor(Math.random() * words.length)]
  var letters = puzzle.toUpperCase().split("")
  letters.forEach(function(letter) {
      $("#puzzle-wrapper ul").append(
        `<li><span class="start">${letter}</span></li>`)
    })
    // puzzle.charAt(index).forEach(function(letter) {
    //     $("puzzle-wrapper ul").append(`<li>${letter}</li>")
    //   })

})
