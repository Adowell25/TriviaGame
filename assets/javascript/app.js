$(document).ready(function (){

});
var questions;
var questionsObject = {};
var answers = ["A", "A", "C", "B", "A", "D", "B", "C"];

var intervalID;

var triviaObject = {};

//timer object
var timer = {
    time: 120,

    start: function () {
        $("#timer").text("2:00")
        intervalID = setInterval(timer.countDown, 1000);
    },

    countDown: function () {
        timer.time--;
        var realTime = timer.timeConverter(timer.time);
        // console.log(realTime);
        $("#timer").text(realTime);

        if (timer.time === 0) {
            $("#timer").text("Game Over!");
            clearInterval(intervalID);
            $(".Done, #questionsBox").hide();
            scoring();
            $(".results").show();
            $(".Reset").show();
        }
    },

    timeConverter: function (t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    },

    resetTimer: function () {
        timer.time = 120;
        $("#timer").text("2:00");
        clearInterval(intervalID);
    }
};

//Questions function
function questionOptions (){
    return{
q0: { question: "What team has won the most NBA titiles?",
    A: "Boston Celtics",
    B: "San Antonio Spurs",
    C: "LA Lakers",
    D: "Philadelphia 76ers",

},

q1: { question: "Who holds the record for highest scoring average for 1 season?",
   A: "Wilt Chamberlain",
    B: "Bill Russell",
    C: "Michael Jordan",
    D: "Larry Bird",
},

q2: { question: "Who holds the record for most points in a single game?",
    A: "Michael Jordan",
    B: "James Harden",
    C: "Wilt Chamberlain",
    D: "Elgin Baylor",
},

q3: { question: "What year was the 3pt line implemented?",
    A: "1961-62",
    B: "1979-80",
    C: "1995-96",
    D: "2015-16",
},

q4: { question: "What player has won the most NBA championships?",
    A: "Bill Russell",
    B: "Michael Jordan",
    C: "Steph Curry",
    D: "Kareem Abdul-Jabbar",
},

q5: { question: "Which team most recently won back to back Championships?",
    A: "LA Lakers",
    B: "San Antonio Spurs",
    C: "Miami Heat",
    D: "Golden State Warriors",
},

q6: { question: "Who is the all time leader in steals and assists?",
    A: "Allen Iverson",
    B: "John Stockton",
    C: "Isaiah Thomas",
    D: "Chris Paul"
},

q7: { question: "Which player holds the record for the most rebounds?",
    A: "Bill Russell",
    B: "Tim Duncan",
    C: "Wilt Chamberlain",
    D: "Kareem Abdul-Jabbar"
}
}
};

//Game Functions

function startGame() {
    questionsObject = questionOptions();
    triviaObject = gameReset();
    displayQuestions();
};

function gameReset() {
    return {
        correct: 0,
        incorrect: 0,
        unanswered: 0,
    }
};

//Display question function
function displayQuestions(){
    questions = Object.keys(questionsObject);
    for (var i = 0; i < questions.length; i++){
        var questionDesc = questions[i];
        var question = questionsObject[questionDesc];
        var questionArea = createQuestions(question, questionDesc);
        $(".questionBox").append(questionArea).show();
    }
};

function createQuestions(question, key) {
   
    var inputBlock = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "' value='A'><lable>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='B'><lable>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='C'><lable>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='D'><lable>" + question.D + "</label></li>" +
        "</ul>");

    return inputBlock;
};

function scoring() {
    var userAnswers = [$("input:radio[name='q0']:checked").val(),
    $("input:radio[name='q1']:checked").val(),
    $("input:radio[name='q2']:checked").val(),
    $("input:radio[name='q3']:checked").val(),
    $("input:radio[name='q4']:checked").val(),
    $("input:radio[name='q5']:checked").val(),
    $("input:radio[name='q6']:checked").val(),
    $("input:radio[name='q7']:checked").val()];

    for (var u = 0; u < questions.length; u++) {
        if (userAnswers[u] === undefined) {
            triviaObject.unanswered++;
        } else if (userAnswers[u] === answers[u]) {
            triviaObject.correct++;
        } else {
            triviaObject.incorrect++;
        }
        console.log(userAnswers[u]);
    };

    $("#correct").html("Correct: " + triviaObject.correct);
    $("#incorrect").html("Incorrect: " + triviaObject.incorrect);
    $("#unanswered").html("Unanswered: " + triviaObject.unanswered);
}

//Button Click events

$(".startBtn").on("click", function () {
    $(".startBtn").hide();
    timer.start();
    startGame();
    // // showQuestions();
    // $("#questionsBox").show();
    // console.log(questions);
    $(".done").show();
});

$(".done").on("click", function () {
    scoring();
    $(".questionBox").hide();
    $(".done").hide();
    timer.resetTimer();
    $(".score").show();
    $(".reset").show();
});

$(".reset").on("click", function () {
    $(".questionBox").empty();
    $(".startBtn").show();
    $(".reset").hide();
    $(".score").hide();
    timer.resetTimer();
});
