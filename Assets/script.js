// draw elements from the html
var countdownEl = document.querySelector("#countdown");

var quizContainerEl = document.querySelector("#quiz-container");
var phase1El = document.querySelector("#phase1");
var phase2El = document.querySelector("#phase2");
var phase3El = document.querySelector("#phase3");

var questionNumberEl = document.querySelector("#question-number");
var questionTextEl = document.querySelector("#question-text");

var choiceAel = document.querySelector("#choiceA");
var choiceBel = document.querySelector("#choiceB");
var choiceCel = document.querySelector("#choiceC");
var choiceDel = document.querySelector("#choiceD");
var choice = document.querySelector(".choice");

var startBtn = document.querySelector("#start");

//declare important variables
var questionCurrent = 0;
var userScore = 0;
var yourAnswer = '';

var timeLeft = 100;
var timesUp = 0;

countdownEl.textContent = "0";

//Event Listener
startBtn.addEventListener('click', startGame);

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

    //Start Countdown
    var countDown = setInterval(
        function() {

            countdownEl.textContent = timeLeft;
        
            if(timesUp === timeLeft){
                countdownEl.textContent = "0";
                clearInterval(countDown);
            }
        
            if(timeLeft > timesUp){
                timeLeft--;
                countdownEl.textContent = timeLeft;
            } 
        
        }
        ,1000);

    displayQuestions();

}

//Display Questions from questions.js as a function
function displayQuestions() {
        console.log("Question Number " + questionCurrent + 1);
        questionNumberEl.textContent = questionCurrent + 1;

        console.log(questionList[questionCurrent].question);
        questionTextEl.textContent = questionList[questionCurrent].question;

        console.log(questionList[questionCurrent].choices[0]);
        choiceAel.textContent = questionList[questionCurrent].choices[0];

        console.log(questionList[questionCurrent].choices[1]);
        choiceBel.textContent = questionList[questionCurrent].choices[1];

        console.log(questionList[questionCurrent].choices[2]);
        choiceCel.textContent = questionList[questionCurrent].choices[2];

        console.log(questionList[questionCurrent].choices[3]);
        choiceDel.textContent = questionList[questionCurrent].choices[3];

    }
   
//Store the choice as an answer on button click, then run verification
function storeAnswer () {

    var yourAnswer = choice.val;

    //Check the answer againt the current questions answer
    function verifyAnswer () {
    if (yourAnswer == questionList[questionCurrent].answer) {
        questionCurrent++;
    }
    else {
        timeLeft = timeLeft - 10;
        questionCurrent++;
    }
}
    verifyAnswer();

    if (questionCurrent <= questionList.length) {
        displayQuestions();
    }
    else {
        showResults();
    }
 
}

//Show the results page
function showResults() {
    
}



