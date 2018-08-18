var time = 30;

var timer = setInterval(function() {
    time--;
    if (time < 0) {
        clearInterval(timer)
    } else {
        $('#timer').text(time)

    }
}, 1000);

$('#submit').on('click', function(event) {
    event.preventDefault();
    console.log('I work');
    var selValue = $('input[name=drone]:checked').val();
    console.log(selValue);
    var number = 90;
    var board;
    var gameScore = 0;
    var timer = $("<p>")
    timer.attr("id", "timer")
    var questions = [];
    $(document).ready(function() {
        board = $("#game-zone");

        function makeGameBoard() {
            $.ajax({
                method: "GET",
                url: "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
            }).then(function(data) {
                questions = data.results
                console.log(questions)
                for (i = 0; i < questions.length; i++) {
                    var questionDiv = $("<div>");
                    var questionStem = $("<p>").text(questions[i].question);
                    var answerDiv = $("<div>");
                    var answers = [questions[i].correct_answer].concat(questions[i].incorrect_answers);
                    for (j = 0; j < answers.length; j++) {
                        var radioBtn = $('<input type="radio" name="rbtnCount">' + answers[j] + "</input>");
                        radioBtn.appendTo(answerDiv);
                    }
                    questionDiv.append(questionStem)
                    questionDiv.append(answerDiv)
                    board.append(questionDiv)
                        //key into quesitons object and match to correct answer
                }
            })
        }
        $("#start").on("click", function() {
            $(this).remove()
            makeGameBoard()
        })
    })

});