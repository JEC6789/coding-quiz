var bodyEl = document.querySelector("body");
var timerEl = document.querySelector("#timer");
var startingPageEl = document.querySelector("#starting-page");
var questionContainerEl = document.querySelector("#question-container");
var checkAnswerEl = document.createElement("h2");
var finishScreenEl = document.querySelector("#finish-screen");
var scoreEl = document.querySelector("#score");
var formEl = document.querySelector("#submit-score");
var highScoreEl = document.querySelector("#high-scores");
var scoreListEl = document.querySelector("#score-list");
var questionContent = [
    "<h1>Commonly used data types do not include:</h1><ul><li class='wrong'>1. strings</li><li class='right'>2. alerts</li><li class='wrong'>3. booleans</li><li class='wrong'>4. numbers</li></ul>",
    "<h1>The condition in an if / else statement is enclosed with ________.</h1><ul><li class='wrong'>1. quotes</li><li class='wrong'>2. curly brackets</li><li class='right'>3. parentheses</li><li class='wrong'>4. square brackets</li></ul>",
    "<h1>Arrays in JavaScript can be used to store ________.</h1><ul><li class='wrong'>1. numbers and strings</li><li class='wrong'>2. other arrays</li><li class='wrong'>3. booleans</li><li class='right'>4. all of the above</li></ul>",
    "<h1>String values must be enclosed within ________ when being assigned to variables.</h1><ul><li class='wrong'>1. commas</li><li class='wrong'>2. curly brackets</li><li class='right'>3. quotes</li><li class='wrong'>4. parentheses</li></ul>",
    "<h1>A very useful tool used during development and debugging for printing content to the debugger is:</h1><ul><li class='wrong'>1. JavaScript</li><li class='wrong'>2. terminal / bash</li><li class='wrong'>3. for loops</li><li class='right'>4. console.log</li></ul>"
];
var scores = [];
var scoreIdCounter = 0;
var questionNumber = 1;
var timeLeft = 0;
var finalScore = 0;

var buttonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches("#view-high-scores") && (startingPageEl.className === "display-none" && highScoreEl.className === "display-none")) {
        alert("Please finish your quiz and submit your score first. I don't feel like dealing with all the bugs that could result from you clicking this right now.");
    }
    else if (targetEl.matches("#view-high-scores")) {
        startingPageEl.className = "display-none";
        questionContainerEl.className = "display-none";
        highScoreEl.classList.remove("display-none");
    }
    else if (targetEl.matches("#go-back")) {
        highScoreEl.className = "display-none";
        startingPageEl.classList.remove("display-none");
    }
    else if (targetEl.matches("#clear")) {
        localStorage.removeItem("scores");
        scores = [];
        scoreIdCounter = 0;
        scoreListEl.innerHTML = "";
    }
    else if (targetEl.matches("#start")) {
        startingPageEl.className = "display-none";
        questionContainerEl.classList.remove("display-none");
        timeLeft = 75;
        timerEl.textContent = timeLeft;
        timer();
        quizHandler();
    }
    else if (targetEl.matches(".right")) {
        checkAnswerEl.remove();
        questionNumber++;
        quizHandler();
        checkAnswerEl.textContent = "Correct!";
        questionContainerEl.appendChild(checkAnswerEl);
    }
    else if (targetEl.matches(".wrong")) {
        checkAnswerEl.remove();
        questionNumber++;
        timeLeft = timeLeft - 10;
        quizHandler();
        checkAnswerEl.textContent = "Wrong!";
        questionContainerEl.appendChild(checkAnswerEl);
    }
};

var quizHandler = function() {
    if (questionNumber <= questionContent.length) {
        questionContainerEl.innerHTML = questionContent[questionNumber - 1];
    }
    else {
        finalScore = timeLeft;
        timeLeft = 0;
        questionNumber = 1;
        questionContainerEl.className = "display-none";
        finishScreenEl.classList.remove("display-none");
        scoreEl.textContent = finalScore;
    }
};

var timer = function() {
    var timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        }
        else {
            timerEl.textContent = 0;
            questionNumber = 1;
            questionContainerEl.className = "display-none";
            finishScreenEl.classList.remove("display-none");
            clearInterval(timeInterval);
        }
    }, 1000);
};

var submitScore = function() {
    event.preventDefault();
    var nameInput = document.querySelector("input[name='name']").value;

    if (!nameInput) {
        alert("You need to provide your initials in order to submit your score!");
        return false;
    }

    formEl.reset();

    var scoreItem = {
        name: nameInput,
        score: finalScore
    };

    finishScreenEl.className = "display-none";
    highScoreEl.classList.remove("display-none");

    createScoreItem(scoreItem);
};

var createScoreItem = function(scoreItem) {
    var scoreItemEl = document.createElement("li");
    scoreItemEl.setAttribute("score-id", scoreIdCounter);
    scoreItemEl.textContent = scoreItem.name + " - " + scoreItem.score;
    scoreListEl.appendChild(scoreItemEl);

    scores.push(scoreItem);
    scoreIdCounter++;

    saveScores();
};

var saveScores = function() {
    localStorage.setItem("scores", JSON.stringify(scores));
};

var loadScores = function() {
    var savedScores = localStorage.getItem("scores");
    if (!savedScores) {
        return false;
    }

    savedScores = JSON.parse(savedScores);

    for (var i = 0; i < savedScores.length; i++) {
        createScoreItem(savedScores[i]);
    }
};

bodyEl.addEventListener("click", buttonHandler);
formEl.addEventListener("submit", submitScore);
loadScores();