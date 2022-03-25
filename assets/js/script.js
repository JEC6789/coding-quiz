var bodyEl = document.querySelector("body");
var articleEl = document.querySelector("article");
var startingPageEl = document.querySelector("#starting-page");
var question2El = document.querySelector("#question-2");
var question3El = document.querySelector("#question-3");
var question4El = document.querySelector("#question-4");
var question5El = document.querySelector("#question-5");
var finishScreenEl = document.querySelector("#finish-screen");
var highScoreEl = document.querySelector("#high-scores")
/*var rightOrWrong = document.createElement("h2");

rightOrWrong.textContent = "Correct!";

question2El.appendChild(rightOrWrong);*/

var buttonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches("#view-high-scores")) {
        articleEl.className = "display-none";
        highScoreEl.classList.remove("display-none");
    }
    else if (targetEl.matches("#go-back")) {
        highScoreEl.className = "display-none";
        startingPageEl.classList.remove("display-none");
    }
};

var submitScore = function() {
    event.preventDefault();
};

bodyEl.addEventListener("click", buttonHandler);
//finishScreenEl.addEventListener("submit", submitScore);