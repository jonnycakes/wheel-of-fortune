$(document).ready(function() {
  console.log("Hello"); // Left here for santiy checks for the 100 times I broke something during this.

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
    "taco", "JS is short for javascript", "jquery",
    "css", "CASCADING STYLE SHEETS", "html",
    "concatenation", "AUTOMAGICALLY",
    "Check your spelling", "palmarius"
  ];
  var letters;
  var player1Score = 0;
  var player2Score = 0;
  var player3Score = 0;


  var amounts = [
    "800", "350", "450", "700", "300", "600", "2500", "300", "600", "300",
    "500", "550", "400", "300", "900", "500", "400", "900", "600", "400",
    "300", "800", "350", "450", "700", "300", "600", "2500", "300", "600",
    "300", "500", "550", "400", "300", "900", "500", "400", "900", "600",
    "400", "300", "10000"
  ]
  var newValue;
  var consonant = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N",
    "P", "Q", "R", "S", "T", "V", "X", "Z", "W", "Y"
  ]
  var vowels = ["A", "E", "I", "O", "U"]
  var specialChar = [" ", "!", ".", ",", "?"]



  // Submit Player Names to be displayed
  $submitButton.on("click", function() {
    $player1NameDisplay.text($player1NameText.val())
    $player1ScoreDisplay.text("0")
    $player2NameDisplay.text($player2NameText.val())
    $player2ScoreDisplay.text("0")
    $player3NameDisplay.text($player3NameText.val())
    $player3ScoreDisplay.text("0")
  })



  // Start the turn randomly

  var randoTurn = ["player1", "player2", "player3"];
  var turn = randoTurn[Math.floor(Math.random() * randoTurn.length)]
  var setFirstPlayer = function() {
    if (turn === "player1") {
      $("#player-1").addClass("player-1-turn")
    } else if (turn === "player2") {
      $("#player-2").addClass("player-2-turn")
    } else {
      $("#player-3").addClass("player-3-turn")
    }
  }
  setFirstPlayer()

  // **************************
  // **************************
  // **************************

  // Program Pseudocode - Choose a random word
  // // CHOOSE a word from the words away randomly
  // // SEPERATE each letter in the word
  // // DISPLAY each letter as an empty box
  // Using https://jsfiddle.net/phollott/x29ym2ag/ as inspitation here, for logic, but styling and how we "split" the puzzle into letters is much different for me.

  var puzzle = words[Math.floor(Math.random() * words.length)]
  var letters = puzzle.toUpperCase().split("") // breaks puzzle down by letter.
  letters.forEach(function(letter, indexNum) { // index number is passed along in the forEach loop so we can identify the LI that needs to be revealed.
    if ($.inArray(letter, specialChar) > -1) { // this first condition will append a green box instead of a white box when there's a space or puncuation. This condition was a refactor in order to allow for multiple words
      $("#puzzle-wrapper ul").append(
        `<li class="special-char"><span id="indexNum${indexNum}">${letter} &nbsp; </span></li>`
      )
    } else { // the else was the original. This will append a LI with identifying information that includes the letter.
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


  // Again, this piece is a three piece if else, one section for the player. Can also do with a refactor.
  $("#submit-vowel").on("click", function() {
      if (turn === "player1" && player1Score > 250 && $
        .inArray($("#vowel-text").val().toUpperCase(), vowels) > -1) { // If player-1 has turn AND player's score is more than 250 AND the data entered is a vowel.
        player1Score -= 250; // Subtract 250 from the score. It's here cause it's a flat 250, no matter how many matches (0 - infinity)
        $player1ScoreDisplay.text(player1Score) // properlly display the new score
        letters.forEach(function(letter, indexNum) { // loop through  letters to reveal any vowels. This is essentially the same loop for consonants, but checking a different input box.
          if ($("#vowel-text").val().toUpperCase() === letter) {
            $(`#indexNum${indexNum}`).removeClass("start");
          }
        })
        $("#vowel-text").val("") // make the vowel input blank. Gotta do this last, otherwise the letter submitted to the loop is always blank.
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
      } else {
        alert(
          "You either entered a consonant or you're score is less than $250. We're gonna move on now, and you get to deal with an annoying alert window. I don't care about UX, if you're not following the rules of the game, you're gonna suffer through a bit!"
        )
        incrementTurn()
      }

    }) // function end
    // closing brackets are the worst. I spent more time than I should with copy/paste mistakes becuase the closing brackets are hard. I eventaully deleted everything and started over.

  $("#submit-solve").on("click", function() {
    if ($("#solve-text").val().toUpperCase() === puzzle.toUpperCase()) {
      alert(
        "Congratulations! You've solved the puzzle! Correctly! Unfortunately, you can't take home your winnings. But, you can brag that you were the winner!"
      );
      window.location.reload(true)
    } else {
      alert(
        "Sorry, you didn't get it correct. It was a very nice try, though. I mean it!"
      );
      incrementTurn()
    }
  })


  console.log("End"); // Left here for santiy checks for the 100 times I broke something during this. I actually removed this for a hot-second and it slowed me down in de-bugging
})
