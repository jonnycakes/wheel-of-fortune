$(document).ready(function() {
  console.log("Hello");

  // Useful Alisas
  var $player1NameText = $("#player-1-name");
  var $player1NameDisplay = $("#player-1-name-display");
  var $player2NameText = $("#player-2-name");
  var $player2NameDisplay = $("#player-2-name-display");
  var $player3NameText = $("#player-3-name");
  var $player3NameDisplay = $("#player-3-name-display");
  var $submitButton = $("#submit-player-names")

  // Submit Player Names
  $submitButton.on("click", function() {
    $player1NameDisplay.text(`Name: ${$player1NameText.val()}`)
    $player2NameDisplay.text(`Name: ${$player2NameText.val()}`)
    $player3NameDisplay.text(`Name: ${$player3NameText.val()}`)
  })


})
