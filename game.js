/*global document*/
/*eslint-disable no-console*/
'use strict';

// build array of questions + answers
var answeredQuestions = [];

function AnsweredQuestion(question, answera, answerb, answerc, answerd, correct) {
    this.question = question;
    this.answera = answera;
    this.answerb = answerb;
    this.answerc = answerc;
    this.answerd = answerd;
    this.correct = correct;
}

function addAnsweredQuestion(question, answera, answerb, answerc, answerd, correct) {
    var aq = new AnsweredQuestion(question, answera, answerb, answerc, answerd, correct);
    answeredQuestions.push(aq);
}

addAnsweredQuestion('What is\ncos(' + '\u03C0' + 'π)?', '0', '-1', '+1', '1/2', 'B');
addAnsweredQuestion('What is the\ndiameter of\n the earth?', '40.000 km', '6.350 km', '12.700 km', '20.000 m', 'C');
addAnsweredQuestion('What is the\ncapital\nof Canada?', 'Toronto', 'Ottawa', 'Montreal', 'Quebec', 'B');
addAnsweredQuestion('What is the\ncapital\nof Australia?', 'Perth', 'Melbourne', 'Sydney', 'Canberra', 'D');
addAnsweredQuestion('Northern\nIreland\nbelongs to...?', 'England', 'Great Britain', 'the United\nKingdom', 'none of these', 'C');
addAnsweredQuestion('... is not a\nneighbouring\ncountry of\nGermany.', 'Poland', 'Slovakia', 'Czechia', 'Luxembourg', 'B');

// get DOM elements
var question = document.getElementById('question');
var answerA = document.getElementById('answer-a');
var answerB = document.getElementById('answer-b');
var answerC = document.getElementById('answer-c');
var answerD = document.getElementById('answer-d');
var answerBoardA = document.getElementById('answer-board-a');
var answerBoardB = document.getElementById('answer-board-b');
var answerBoardC = document.getElementById('answer-board-c');
var answerBoardD = document.getElementById('answer-board-d');
var nextBoard = document.getElementById('next-board');
var nextText = document.getElementById('next-text');
var scoreText = document.getElementById('score-text');

// current question number;
var questNum = 0;
// board with correct answer
var rightAnswerBoard;
// score
var score = 0;

// assign the right answer board to the variable rightAnswerBoard
function setRightAnswer() {
    if (answeredQuestions[questNum].correct === 'A') {
        rightAnswerBoard = answerBoardA;
    } else if (answeredQuestions[questNum].correct === 'B') {
        rightAnswerBoard = answerBoardB;
    } else if (answeredQuestions[questNum].correct === 'C') {
        rightAnswerBoard = answerBoardC;
    } else if (answeredQuestions[questNum].correct === 'D') {
        rightAnswerBoard = answerBoardD;
    }
}

// default state at start / after a question was answered
function resetQuestions() {
    answerBoardA.setAttribute('color', '#555555');
    answerBoardB.setAttribute('color', '#555555');
    answerBoardC.setAttribute('color', '#555555');
    answerBoardD.setAttribute('color', '#555555');
    nextBoard.setAttribute('class', 'not-clickable');
    question.setAttribute('value', answeredQuestions[questNum].question);
    answerA.setAttribute('value', answeredQuestions[questNum].answera);
    answerBoardA.setAttribute('class', 'clickable');
    answerB.setAttribute('value', answeredQuestions[questNum].answerb);
    answerBoardB.setAttribute('class', 'clickable');
    answerC.setAttribute('value', answeredQuestions[questNum].answerc);
    answerBoardC.setAttribute('class', 'clickable');
    answerD.setAttribute('value', answeredQuestions[questNum].answerd);
    answerBoardD.setAttribute('class', 'clickable');
    setRightAnswer();
    // ToJa
    score = 0;
    questNum = 0;
    answerA.setAttribute('position', '-2.3 3 -3.98');
    answerBoardA.setAttribute('position', '-2.3 3 -3.99');
    answerB.setAttribute('position', '2.3 3 -3.98');
    answerBoardB.setAttribute('position', '2.3 3 -3.99');
    answerC.setAttribute('position', '-2.3 0.6 -3.98');
    answerBoardC.setAttribute('position', '-2.3 0.6 -3.99');
    answerD.setAttribute('position', '2.3 0.6 -3.98');
    answerBoardD.setAttribute('position', '2.3 0.6 -3.99');
    nextBoard.setAttribute('position', '0 -1.8 -4.01');
    nextText.setAttribute('position', '0 -1.8 -4.01');
}

// check whether chosen board was correct and take appropriate actions
// board: chosen board
// c: chosen answer (A, B, C, D)
//function checkAnswerOLD(board, c) {
//    answerBoardA.setAttribute('class', 'not-clickable');
//    answerBoardB.setAttribute('class', 'not-clickable');
//    answerBoardC.setAttribute('class', 'not-clickable');
//    answerBoardD.setAttribute('class', 'not-clickable');
//    if (c === answeredQuestions[questNum].correct) {
//        board.setAttribute('color', 'green');
//    } else {
//        board.setAttribute('color', 'red');
//        rightAnswerBoard.setAttribute('color', 'blue');
//    }
//    questNum = (questNum + 1) % answeredQuestions.length;
//}

function checkAnswer(board, c) {
    answerBoardA.setAttribute('class', 'not-clickable');
    answerBoardB.setAttribute('class', 'not-clickable');
    answerBoardC.setAttribute('class', 'not-clickable');
    answerBoardD.setAttribute('class', 'not-clickable');
    if (c === answeredQuestions[questNum].correct) {
        board.setAttribute('color', 'green');
        score += 10;
    } else {
        board.setAttribute('color', 'red');
        rightAnswerBoard.setAttribute('color', 'blue');
        score -= 10;
    }
    questNum += 1;
    if (questNum < answeredQuestions.length) {
        nextBoard.setAttribute('class', 'clickable');
    } else {
        scoreBoard.setAttribute('visible', 'true');
    }
}

// Initialization
resetQuestions();
document.write('\u03C0');

// Set up event handling

// answer boards react on click event
answerBoardA.addEventListener('click', function () {
    checkAnswer(answerBoardA, 'A');
});
answerBoardB.addEventListener('click', function () {
    checkAnswer(answerBoardB, 'B');
});
answerBoardC.addEventListener('click', function () {
    checkAnswer(answerBoardC, 'C');
});
answerBoardD.addEventListener('click', function () {
    checkAnswer(answerBoardD, 'D');
});

// next board reacts on click event
nextBoard.addEventListener('click', function () {
    resetQuestions();
});

