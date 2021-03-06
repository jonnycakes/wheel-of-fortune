$(document).ready(function() {
  console.log("Hello"); // Left here for santiy checks for the 100 times I broke something during this.

  // Call for the bootstrap modal on page load. h/t http://stackoverflow.com/questions/10233550/launch-bootstrap-modal-on-page-load
  $('#myModal').modal('show')
  $("#introMusic").get(0).play() // Audio, Mark gave me this idea.

  // aliases and init settings!
  var $player1NameText = $("#player-1-name");
  var $player1NameDisplay = $("#player-1-name-display");
  var $player1ScoreDisplay = $("#player-1-score")
  var player1Score = 0;
  $player1ScoreDisplay.text("0")
  var $player2NameText = $("#player-2-name");
  var $player2NameDisplay = $("#player-2-name-display");
  var $player2ScoreDisplay = $("#player-2-score")
  var player2Score = 0;
  $player2ScoreDisplay.text("0")
  var $player3NameText = $("#player-3-name");
  var $player3NameDisplay = $("#player-3-name-display");
  var $player3ScoreDisplay = $("#player-3-score")
  var player3Score = 0;
  $player3ScoreDisplay.text("0")

  var $submitButton = $("#submit-player-names")



  // Userful Variables
  var words = ["Hello World", "Disambiguation", "General Assembly",
    "taco", "JS is short for javascript", "jquery",
    "css", "CASCADING STYLE SHEETS", "html",
    "concatenation", "AUTOMAGICALLY",
    "Check your spelling", "palmarius", "palmarius students",
    "git commit"
  ];
  var letters;

  var amounts = [100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 650, 700, 800, 900, 100, 150,
      200, 250, 300, 350, 400, 450, 500, 600, 650, 700, 800, 900, 2500, 3500, 5000, 10000,
      "loseTurn", "bankrupt"
    ] // to implement the bankrupt, I had to refactor this array. Because I was being stupid, I made every item a string, even if it was a number. So, I had to retype all the values correctly. Then, I could drop the parseInt later down in the calculateAmount function.

  var newValue;


  var consonant = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N",
    "P", "Q", "R", "S", "T", "V", "X", "Z", "W", "Y"
  ]
  var vowels = ["A", "E", "I", "O", "U"]
  var specialChar = [" ", "!", ".", ",", "?"]
  var usedLetters = []

  // Submit Player Names to be displayed
  $submitButton.on("click", function() {
    $player1NameDisplay.text($player1NameText.val())
    $player2NameDisplay.text($player2NameText.val())
    $player3NameDisplay.text($player3NameText.val())
  })
  $(".player-name").on("keypress", function(key) {
    if (key.which === 13) {
      $player1NameDisplay.text($player1NameText.val())
      $player2NameDisplay.text($player2NameText.val())
      $player3NameDisplay.text($player3NameText.val())
      $('#myModal').modal('hide')
    }
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
    newValue = amounts[Math.floor(Math.random() * amounts.length)]
    $("#spin-amount").text(newValue);
  }

  // **************************
  // **************************
  // **************************

  // Spin the wheel!
  var spinWheel = function() {
    $("#audio").get(0).play()
    $("#wheel").addClass("spin");
    calculateAmount();
    console.log(newValue)

    // Check if it's landed on a number or a string
    // Added this part towards the end. Lose a turn and bankrupt are now values it can land on
    setTimeout(function() {
      if (newValue === "loseTurn") {
        $("#lostTurnModal").modal("show")
        $("#wheel").removeClass("spin")
        $("#bankrupt").get(0).play()
        incrementTurn()
      } else if (newValue === "bankrupt") {
        if (turn === "player1") {
          player1Score = 0;
          $player1ScoreDisplay.text(0)
        } else if (turn === "player2") {
          player2Score = 0;
          $player2ScoreDisplay.text(0)
        } else if (turn === "player3") {
          player3Score = 0;
          $player3ScoreDisplay.text(0)
        }
        $("#bankruptModal").modal("show")
        $("#wheel").removeClass("spin")
        $("#bankrupt").get(0).play()
        incrementTurn();
      } else {
        $("#spinModal").modal("show")
        $("#wheel").removeClass("spin")
        $("#wedge").replaceWith(
          `<span id="wedge"><img src="assets/${newValue}.png" height="125px"/></span>` // this will show the image of the wedge you land on.
        )
      }
    }, 5900)
  }

  // Listen for click on the wheel to call the spin wheel function.
  $("#wheel").on("click", spinWheel)

  // **************************
  // **************************
  // **************************

  // Player Picks a Letter
  // REFACTORED!!!!!!! Check my comments on the earlier commits. But, I pulled out the logic into a new function called consonantCheck. My biggest pain points were a) keeping track of close brackets, and b) names that include dollar signs. But, it's a whole lot more clearner now! (It may not seem like it with the verbose comments, but whatevas)
  var consonantCheck = function(playerXScore, $playerXScoreDisplay) {
    let startScore = playerXScore; // Set what the score is before iterating, to see if it goes up later
    letters.forEach(function(letter, indexNum) {
      if ($("#guess-text").val().toUpperCase() === letter) {
        playerXScore += newValue;
        $playerXScoreDisplay.text(playerXScore)
        $(`#indexNum${indexNum}`).addClass("letter-match")
        $(`#indexNum${indexNum}`).removeClass("start")
          // index number is passed along in the forEach so we can identify the LI that needs to be revealed.
        $("#ding").get(0).play()
        setTimeout(function() {
          $(`#indexNum${indexNum}`).removeClass("letter-match")
        }, 2000)
        if (turn === "player1") {
          player1Score = playerXScore;
        } else
        if (turn === "player2") {
          player2Score = playerXScore;
        } else
        if (turn === "player3") {
          player3Score = playerXScore;
        }
      }
    })
    usedLetters.push($("#guess-text").val().toUpperCase()) // push chosen letter into used letters array.
    $("#guess-text").val(""); // Clear input field
    if (startScore === playerXScore) {
      $("#buzz").get(0).play()
      incrementTurn() // if the score stays the same, then it's the next players turn.
    }
  }


  // seperate this out to it's own function make the if statements when listening for consonant submission less verbose
  // inArray() is totally awesome. It saved me from yet another loop, and was a really happy google find.
  var consonantTrue = function(guess) {
    if (guess !== "" && $.inArray(guess, consonant) > -1 && $.inArray(guess, usedLetters) < 0) {
      return true
    }
  }


  // Listener for consonant submission
  $("#submit-text").on("click", function() {
    let $guessText = $("#guess-text").val().toUpperCase()
    if (turn === "player1" && consonantTrue($guessText)) {
      consonantCheck(player1Score, $player1ScoreDisplay)
    } else if (turn === "player2" && consonantTrue($guessText)) {
      consonantCheck(player2Score, $player2ScoreDisplay)
    } else if (turn === "player3" && consonantTrue($guessText)) {
      consonantCheck(player3Score, $player3ScoreDisplay)
    } else if ($.inArray(
        $("#guess-text").val().toUpperCase(), usedLetters) > -1) {
      alert("You've chosen a letter that's already been played.")
      $("#guess-text").val("")
      incrementTurn()
    } else { // The only way you can meet this last condition is if you messed up the input. And, for that, I award you no points, and may God have mercy on your soul.
      alert(
        "You picked a character that's not a consonant. Now, since you're choice is just that annoying, I'm gonna annoy you with an alert window. Yea, I could'a gone with the modal, but that wouldn't be half as annoying as you just were. Also, you lost your turn. Those are the actual rules."
      )
      $("#guess-text").val(""); // Clear input field
      incrementTurn()
    }
  })

  // Now I can add in a keyPress listener because the text is easy peasy now that I've got the function!

  $("#guess-text").on("keypress", function(key) {
    let $guessText = $("#guess-text").val().toUpperCase()
    if (key.which === 13 && turn === "player1" && consonantTrue(
        $guessText)) {
      consonantCheck(player1Score, $player1ScoreDisplay),
        $('#spinModal').modal('hide')
    } else if (key.which === 13 && turn === "player2" && consonantTrue(
        $guessText)) {
      consonantCheck(player2Score, $player2ScoreDisplay)
      $('#spinModal').modal('hide')
    } else if (key.which === 13 && turn === "player3" && consonantTrue(
        $guessText)) {
      consonantCheck(player3Score, $player3ScoreDisplay)
      $('#spinModal').modal('hide')
    }
  })


  // **************************
  // **************************
  // **************************

  // Buy a Vowel

  var vowelCheck = function(playerXScore, $playerXScoreDisplay) {

    playerXScore -= 250; // Subtract 250 from the score. It's here cause it's a flat 250, no matter how many matches (0 - infinity)
    $playerXScoreDisplay.text(playerXScore) // properlly display the new score

    // update player score correctly hack
    if (turn === "player1") {
      player1Score = playerXScore;
    } else
    if (turn === "player2") {
      player2Score = playerXScore;
    } else
    if (turn === "player3") {
      player3Score = playerXScore;
    }

    // Placed here because we still charge the 250, but we need to move the turn and not invoke the rest of this function
    if ($.inArray($("#vowel-text").val().toUpperCase(), letters) <
      0) {
      $("#buzz").get(0).play()
      incrementTurn()
      return;
    }

    letters.forEach(function(letter, indexNum) { // loop through  letters to reveal any vowels. This is essentially the same loop for consonants, but checking a different input box.
      if ($("#vowel-text").val().toUpperCase() === letter) {
        $(`#indexNum${indexNum}`).addClass("letter-match")
        $(`#indexNum${indexNum}`).removeClass("start")
          // index number is passed along in the forEach so we can identify the LI that needs to be revealed.
        $("#ding").get(0).play()
        setTimeout(function() {
          $(`#indexNum${indexNum}`).removeClass("letter-match")
        }, 2000)
      }
    })
    $("#vowel-text").val("") // make the vowel input blank. Gotta do this last, otherwise the letter submitted to the loop is always blank.

  }

  // Listener
  $("#submit-vowel").on("click", function() {
      if (turn === "player1" && player1Score > 250 && $
        .inArray($("#vowel-text").val().toUpperCase(), vowels) > -1
      ) { // If player-1 has turn AND player's score is more than 250 AND the data entered is a vowel.
        vowelCheck(player1Score, $player1ScoreDisplay)
      } else if (turn === "player2" && player2Score > 250 && $
        .inArray($("#vowel-text").val().toUpperCase(), vowels) > -1
      ) {
        vowelCheck(player2Score, $player2ScoreDisplay)
      } else if (turn === "player3" && player3Score > 250 && $
        .inArray($("#vowel-text").val().toUpperCase(), vowels) > -1
      ) {
        vowelCheck(player3Score, $player3ScoreDisplay)
      } else {
        alert(
          "You either entered a consonant or you're score is less than $250. We're gonna move on now, and you get to deal with an annoying alert window. I don't care about UX, if you're not following the rules of the game, you're gonna suffer through a bit!"
        )
        $("#vowel-text").val("")
        incrementTurn()
      }
    }) // function end
    // closing brackets are the worst. I spent more time than I should with copy/paste mistakes becuase the closing brackets are hard. I eventaully deleted everything and started over.

  //keypress vowel listener
  $("#vowel-text").on("keypress", function(key) {
    if (key.which === 13 && turn === "player1" && player1Score > 250 &&
      $
      .inArray($("#vowel-text").val().toUpperCase(), vowels) > -1
    ) { // If player-1 has turn AND player's score is more than 250 AND the data entered is a vowel.
      vowelCheck(player1Score, $player1ScoreDisplay)
      $('#vowelModal').modal('hide')
    } else if (key.which === 13 && turn === "player2" && player2Score >
      250 && $
      .inArray($("#vowel-text").val().toUpperCase(), vowels) > -1
    ) {
      vowelCheck(player2Score, $player2ScoreDisplay)
      $('#vowelModal').modal('hide')
    } else if (key.which === 13 && turn === "player3" && player3Score >
      250 && $
      .inArray($("#vowel-text").val().toUpperCase(), vowels) > -1
    ) {
      vowelCheck(player3Score, $player3ScoreDisplay)
      $('#vowelModal').modal('hide')
    }

  })


  // **************************
  // **************************
  // **************************

  // Solve the Puzzle!

  $("#submit-solve").on("click", function() {
    if ($("#solve-text").val().toUpperCase() === puzzle.toUpperCase()) {
      alert(
        "Congratulations! You've solved the puzzle! Correctly! Unfortunately, you can't take home your winnings. But, you can brag that you were the winner!. Now, lets all play again!"
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
