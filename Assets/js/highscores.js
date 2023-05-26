
//Load the scores
var highScores = JSON.parse(localStorage.getItem('highscores'));
console.log(highScores);


//connect to the html elements
dataUser = document.querySelector("#names");
dataScore = document.querySelector("#scores");

dataClear = document.querySelector("#clear");

console.log(highScores[0].user);

//Read the Names
function print() {
    for (let i = 0; i < highScores.length; i++) {
    
    var newTab1 = document.createElement("h2");
    dataUser.appendChild(newTab1);
    newTab1.textContent = highScores[i].user;

    var newTab2 = document.createElement("h2");
    dataScore.appendChild(newTab2);
    newTab2.textContent = highScores[i].score;
    
    }
}
print();

//clearData
dataClear.addEventListener('click', resetData);
function resetData () {
    localStorage.removeItem("highscores");
    dataUser.style.display = "none";
    dataScore.style.display = "none";
}