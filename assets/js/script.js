var bodyEl = document.querySelector("body");//
var startingPageEl = document.querySelector("#starting-page");//
var questionContainerEl = document.querySelector("#question-container");
var finishScreenEl = document.querySelector("#finish-screen");
var formEl = document.querySelector("#submit-score");//
var highScoreEl = document.querySelector("#high-scores");//
/*var rightOrWrong = document.createElement("h2");

rightOrWrong.textContent = "Correct!";

question2El.appendChild(rightOrWrong);*/

var buttonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches("#view-high-scores")) {
        startingPageEl.className = "display-none";
        questionContainerEl.className = "display-none";
        highScoreEl.classList.remove("display-none");
    }
    else if (targetEl.matches("#go-back")) {
        highScoreEl.className = "display-none";
        startingPageEl.classList.remove("display-none");
    }
    else if (targetEl.matches("#start")) {
        startingPageEl.className = "display-none";
        questionContainerEl.classList.remove("display-none");
    }
};

var submitScore = function() {
    event.preventDefault();
    var nameInput = document.querySelector("input[name='name']").value;
    var scoreListEl = document.querySelector("#score-list");

    if (!nameInput) {
        alert("You need to provide your initials in order to submit your score!");
        return false;
    }

    formEl.reset();

    var scoreItem = {
        name: nameInput,
        //score: variableName
    };

    var scoreItemEl = document.createElement("li");
    scoreItemEl.setAttribute("score", scoreItem.score);
    scoreItemEl.textContent = scoreItem.name + " - " + scoreItem.score;
    scoreListEl.appendChild(scoreItemEl);
};

bodyEl.addEventListener("click", buttonHandler);
formEl.addEventListener("submit", submitScore);