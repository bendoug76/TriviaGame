// start button to begin timer and quiz
// questions laid out with multiple choice answers
//either timer ends or player uses stop button
// display results and message

var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;

function nextQuestion(){
    const isQuestionOver = (triviaQuestions.length - 1) === currentQuestion;
    if(isQuestionOver){
        console.log("Game Over!");
        displayResult();
    } else {

    currentQuestion++;
    loadQuestion();
    
    }

}
function timeUp(){
    clearInterval(timer);

    lost++;
    preloadImage("lost");
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown(){
    counter--;
    $("#time").html("Time: " + counter);

    if (counter === 0){
        timeUp();
    }
}

function loadQuestion(){
    counter = 30;
    timer = setInterval(countDown, 1000);


    const question = triviaQuestions[currentQuestion].question; 
    const answers = triviaQuestions[currentQuestion].answers; 


    $("#timer").html("Timer: " + counter);
    $("#game").html(`
        <h4>${question}</h4>
        ${loadChoices(answers)}
        
    `);
    
}

function loadChoices(answers){
    var result = "";
    for (let i = 0; i < answers.length; i++) {
        result += `<p class="choice" data-answer="${answers[i]}">${answers[i]}</p>`;
    }
    return result;  
}

$(document).on("click", ".choice", function(){
    clearInterval(timer);
    const selectedAnswer =$(this).attr("data-answer");
    const correctAnswer = triviaQuestions[currentQuestion].correctAnswer;

    if(correctAnswer === selectedAnswer){
        score++;
        console.log("winner")
        preloadImage("win");
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log("loser!");
        preloadImage("lost");
        setTimeout(nextQuestion, 3 * 1000);
    }
    console.log("stuff", selectedAnswer);
});

function displayResult() {
    const result = `
    <p>You Got ${score} Question (s) Right!!</p>
    <p>You Got ${lost} Question (s) Wrong. SAD FACE</p>
    <p>Total Questions ${triviaQuestions.length} Question (s) Right!!</p>
    <button class "btn btn-dark" id="reset">Reset Game</button>
    `;
    $("#game").html(result);
}

$(document).on("click", "#reset", function(){
    location.reload(true);
});

function randomImage(images) {
    const random = Math.floor(Math.random()* images.length);
    const randomImage = images[random];
    return randomImage;
}

function preloadImage(status) {
    const correctAnswer = triviaQuestions[currentQuestion].correctAnswer;

    if(status === "win"){
        $("#game").html(`
            <p class="preload-image">Correct!</p>
            <p class="preload-image">The correct answer is: <b>${correctAnswer}</b></p>
            <img src="${randomImage(rightAnswers)}" />
        
            `);
    } else{
        $("#game").html(`
            <p class="preload-image">Wrong!</p>
            <p class="preload-image">The correct answer is: <b>${correctAnswer}</b></p>
            <img src="${randomImage(wrongAnswers)}" />
            `);

    }
}


$("#start").click(function() {
    $("#start").remove();
    $("#time").html(counter);
    loadQuestion();
});
 


