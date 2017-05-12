$(document).ready(function() {
  console.log("Hello");

  // Call for the bootstrap modal on page load. h/t http://stackoverflow.com/questions/10233550/launch-bootstrap-modal-on-page-load
  $('#myModal').modal('show')

  // aliases!
  var $player1NameText = $("#player-1-name");
  var $player1NameDisplay = $("#player-1-name-display");
  var $player1ScoreDisplay = $("#player-1-score")
  var $player2NameText = $("#player-2-name");
  var $player2NameDisplay = $("#player-2-name-display");
  var $player2ScoreDisplay = $("#player-2-score")
  var $player3NameText = $("#player-3-name");
  var $player3NameDisplay = $("#player-3-name-display");
  var $player3ScoreDisplay = $("#player-3-score")
  var $submitButton = $("#submit-player-names")

  // Userful Variables
  var words = ["Hello World", "Disambiguation", "General Assembly",
    "taco", "JS is short for javascript", "jquery", "spell checker",
    "css", "html",
    "concatenation", ""
  ];
  var letters;
  var player1Score = 0;
  var player2Score = 0;
  var player3Score = 0;
  var turn = "player1"
  var amounts = ["300", "400", "500", "600", "800", "900", "1000"]
  var newValue;
  var consonant = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N",
    "P", "Q", "R", "S", "T", "V", "X", "Z", "W", "Y"
  ]
  var vowels = ["A", "E", "I", "O", "U"]
  var specialChar = [" ", "!", ".", ","]

  // Submit Player Names to be displayed
  $submitButton.on("click", function() {
    $player1NameDisplay.text($player1NameText.val())
    $player1ScoreDisplay.text("0")
    $player2NameDisplay.text($player2NameText.val())
    $player2ScoreDisplay.text("0")
    $player3NameDisplay.text($player3NameText.val())
    $player3ScoreDisplay.text("0")
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
  letters.forEach(function(letter, indexNum) { // index number is passed along in the forEach so we can identify the LI that needs to be revealed.
    if ($.inArray(letter, specialChar) > -1) {
      $("#puzzle-wrapper ul").append(
        `<li class="special-char"><span id="indexNum${indexNum}">${letter} &nbsp; </span></li>`
      )
    } else {
      $("#puzzle-wrapper ul").append(
          `<li><span id="indexNum${indexNum}" class="start">${letter}</span></li>`
        ) // Thank got that we can do this in template literals. Made the id of each LI different for each, so we can identify later. Made the ID longer than just a number to be more descriptive, and I think it's in the AirBNB style guide that we shouldn't use only numbers for id'ing elements.

    }
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


  // **************************
  // **************************
  // **************************

  // Calculate a random amount when the wheel is spun
  var calculateAmount = function() {
    newValue = parseInt(amounts[Math.floor(Math.random() * amounts.length)])
    $("#spin-amount").text(newValue);
  }

  // **************************
  // **************************
  // **************************

  // Spin the wheel!
  var spinWheel = function() {
    $("#wheel").addClass("spin");
    calculateAmount();
    setTimeout(function() {
      $("#spinModal").modal("show")
      $("#wheel").removeClass("spin")
    }, 2200)
  }

  $("#wheel").on("click", spinWheel)

  // **************************
  // **************************
  // **************************

  // Pick a letter
  // Because of the way I designed the turn counter, we have to do this three times. One for each player. If it's player 1's turn, we edit the score for player one. Else if player 2, else if player 3. This could use a refactor, but I wanted it to work first, then go back and make it work well afterwards.
  // Put comments on the first set. But, I'm commenting after I got everything to work, so forgiveness that you don't see the same mess of comments on the second two sets.

  $("#submit-text").on("click", function() {
    if (turn === "player1" && $("#guess-text").val() !== "" && $.inArray(
        $("#guess-text").val().toUpperCase(), consonant) > -1) { // inArray() is totally awesome. It saved me from yet another loop, and was a really happy google find.
      let startScore = player1Score; // Set what the score is before iterating, to see if it goes up later
      letters.forEach(function(letter, indexNum) {
        if ($("#guess-text").val().toUpperCase() === letter) {
          player1Score += newValue;
          $player1ScoreDisplay.text(player1Score)
          $(`#indexNum${indexNum}`).removeClass("start") // index number is passed along in the forEach so we can identify the LI that needs to be revealed.
        }
      })
      $("#guess-text").val(""); // Clear input field
      if (startScore === player1Score) {
        incrementTurn() // if the score stays the same, then it's the next players turn.
      }
    } else if (turn === "player2" && $("#guess-text").val() !== "" &&
      $
      .inArray(
        $("#guess-text").val().toUpperCase(), consonant) > -1) {
      let startScore = player2Score;
      letters.forEach(function(letter, indexNum) {
        if ($("#guess-text").val().toUpperCase() === letter) {
          player2Score += newValue;
          $player2ScoreDisplay.text(player2Score)
          $(`#indexNum${indexNum}`).removeClass("start")
        }
      })
      $("#guess-text").val(""); // Clear input field
      if (startScore === player2Score) {
        incrementTurn()
      }
    } else if (turn === "player3" && $("#guess-text").val() !== "" &&
      $
      .inArray(
        $("#guess-text").val().toUpperCase(), consonant) > -1) {

      let startScore = player3Score;
      letters.forEach(function(letter, indexNum) {
        if ($("#guess-text").val().toUpperCase() === letter) {
          player3Score += newValue;
          $player3ScoreDisplay.text(player3Score)
          $(`#indexNum${indexNum}`).removeClass("start")
        }
      })
      $("#guess-text").val(""); // Clear input field
      if (startScore === player3Score) {
        incrementTurn()
      }
    } else { // The only way you can meet this last condition is if you messed up the input. And, for that, I award you no points, and may God have mercy on your soul.
      alert(
        "You picked a character that's not a consonant. Now, since you're choice is just that annoying, I'm gonna annoy you with an alert window. Yea, I could'a gone with the modal, but that wouldn't be half as annoying as you just were. Also, you lost your turn. Those are the actual rules."
      )
      $("#guess-text").val(""); // Clear input field
      incrementTurn()
    }
  })

  // **************************
  // **************************
  // **************************

  // Buy a Vowel

  $("#submit-vowel").on("click", function() {
      if (turn === "player1" && player1Score > 250 && $
        .inArray($("#vowel-text").val().toUpperCase(), vowels) > -1) {
        player1Score -= 250;
        $player1ScoreDisplay.text(player1Score)
        letters.forEach(function(letter, indexNum) {
          if ($("#vowel-text").val().toUpperCase() === letter) {
            $(`#indexNum${indexNum}`).removeClass("start");
          }
        })
        $("#vowel-text").val("")
      } else if (turn === "player2" && player2Score > 250 && $
        .inArray($("#vowel-text").val().toUpperCase(), vowels) > -1) {
        player2Score -= 250;
        $player2ScoreDisplay.text(player2Score)
        letters.forEach(function(letter, indexNum) {
          if ($("#vowel-text").val().toUpperCase() === letter) {
            $(`#indexNum${indexNum}`).removeClass("start");
          }
        })
        $("#vowel-text").val("")
      } else if (turn === "player3" && player3Score > 250 && $
        .inArray($("#vowel-text").val().toUpperCase(), vowels) > -1) {
        player3Score -= 250;
        $player3ScoreDisplay.text(player3Score)
        letters.forEach(function(letter, indexNum) {
          if ($("#vowel-text").val().toUpperCase() === letter) {
            $(`#indexNum${indexNum}`).removeClass("start");
          }
        })
        $("#vowel-text").val("")
      }

    }) // function end
    // closing brackets are the worst. I spent more time than I should with copy/paste mistakes becuase the closing brackets are hard. I eventaully deleted everything and started over.



  // restart game!
  // $("header").on("click", function() {
  //   window.location.reload(true)
  // })
})
