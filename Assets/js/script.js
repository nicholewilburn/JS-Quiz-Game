// draw elements from the html
var countdownEl = document.querySelector("#countdown");

var quizContainerEl = document.querySelector("#quiz-container");
var phase1El = document.querySelector("#phase1");
var phase2El = document.querySelector("#phase2");
var phase3El = document.querySelector("#phase3");

var questionNumberEl = document.querySelector("#question-number");
var questionTextEl = document.querySelector("#question-text");

var correctEl = document.querySelector("#correct");
var wrongEl = document.querySelector("#wrong");

var choiceAel = document.querySelector("#choiceA");
var choiceBel = document.querySelector("#choiceB");
var choiceCel = document.querySelector("#choiceC");
var choiceDel = document.querySelector("#choiceD");

var yourScoreEl = document.querySelector("#your-score");

var startBtn = document.querySelector("#start");
var submitBtn = document.querySelector("#submitScore");

//declare important variables
var questionCurrent = 0;
var userScore = 0;
var yourAnswer = '';

var timeLeft = 60;
var timesUp = 0;
var gameOver = false;

countdownEl.textContent = "0";

//Local storage
var highScores = JSON.parse(localStorage.getItem("highscores"));
if (highScores == null) {
    highScores = [];
}

//Event Listener
startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', storeData);

choiceAel.addEventListener('click', storeAnswer);
choiceBel.addEventListener('click', storeAnswer);
choiceCel.addEventListener('click', storeAnswer);
choiceDel.addEventListener('click', storeAnswer);


//When Start Game btn is clicked
function startGame () {

    //Show Game
    console.log("Game started.");
    phase1El.style.display = "none";
    phase2El.style.display = "block";

    displayQuestions();

    //Start Countdown
    var countDown = setInterval(
        function() {

            countdownEl.textContent = timeLeft;
        
            if(timesUp >= timeLeft){
                countdownEl.textContent = "0";
                clearInterval(countDown);
                showResults();
            }
        
            if(timeLeft > timesUp){
                timeLeft--;
                countdownEl.textContent = timeLeft;
                correctEl.style.display = "none";
                wrongEl.style.display = "none";
            } 

            if (gameOver == true){
                clearInterval(countDown);
            }
        
        }
        ,1000);

}

//Display Questions from questions.js as a function
function displayQuestions() {
        console.log("Question Number " + questionCurrent + 1);
        questionNumberEl.textContent = questionCurrent + 1;

        console.log(questionList[questionCurrent].question);
        questionTextEl.textContent = questionList[questionCurrent].question;

        console.log(questionList[questionCurrent].choices);
        choiceAel.textContent = questionList[questionCurrent].choices[0];
        choiceBel.textContent = questionList[questionCurrent].choices[1];
        choiceCel.textContent = questionList[questionCurrent].choices[2];
        choiceDel.textContent = questionList[questionCurrent].choices[3];

    }
   
//Store the choice as an answer on button click, then run verification
function storeAnswer () {

    var yourAnswer = event.target.textContent;
    console.log(yourAnswer);

    //Check the answer againt the current questions answer
    function verifyAnswer () {
    if (yourAnswer == questionList[questionCurrent].answer) {
        questionCurrent++;
        correctEl.style.display = "block";
    }
    else {
        timeLeft = timeLeft - 20;
        questionCurrent++;
        wrongEl.style.display = "block";
    }
}
    verifyAnswer();

    //Decide if the next question is displayed, or if results are next
    if (questionCurrent < questionList.length) {
        displayQuestions();
    }
    else {
        userScore = timeLeft;
        console.log(userScore);

        gameOver = true;
        showResults();
    }
 
}

//Show the results page
function showResults() {

    console.log("Game over.");
    phase2El.style.display = "none";
    phase3El.style.display = "block";

    yourScoreEl.textContent = userScore;

}

//Store Data, the score and the initials
function storeData() {

    userInitials = document.querySelector("#initials").value;
    console.log(userInitials);

    if (userScore < 0) {
        userScore = 0;
    }

    scoreObject = {
        "user": userInitials,
        "score": userScore,
    }
    console.log(scoreObject);

    highScores.push(scoreObject);

    localStorage.setItem("highscores", JSON.stringify(highScores));

resetGame();

}

//function to make sure the game resets variables correwctly
function resetGame() {
    phase3El.style.display = "none";
    phase1El.style.display = "block";

    questionCurrent = 0;
    userScore = 0;
    yourAnswer = '';

    timeLeft = 60;
    timesUp = 0;
    gameOver = false;

    countdownEl.textContent = "0";
}


