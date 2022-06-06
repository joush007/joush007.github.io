// Create all of the questions
const questions = {
    "question1": {
        "question": "Who are we?",
        "answers": [
            "Danko",
            "Officeworks",
            "Danko and Officeworks",
            "Bunnings Warehouse"
        ],
        "correct": "Danko"
    },
    "question2": {
        "question": "Do you like air fryers?",
        "answers": [
            "Yes",
            "No"
        ],
        "correct": "Yes"
    },
    "question3": {
        "question": "Is Danko the best company you've ever seen?",
        "answers": [
            "Yes",
            "No",
            "Didn't they out-pizza the hut?"
        ],
        "correct": "No"
    },
    "question4": {
        "question": "Is it possible to out-pizza the hut?",
        "answers": [
            "Yes",
            "No",
            "I tried and they burned my house down.."
        ],
        "correct": "No"
    }
}

// Define useful variables
let score = 0;
const qHeading = document.getElementById("question");
const qnum = document.getElementById("qnum");
const numOfQuestions = Object.keys(questions).length;
let questionNum = 0;
const answerForm = document.getElementById("answers");
let selected = null;
let answersArray = new Array()
let first = true;

// This function is used to go through all of the questions
function nextQuestion(questionNum) {
    if (questionNum+1 < numOfQuestions) {
        if (!first) {
            questionNum++;
        }
        else {
            first = false;
        }
        // Define the question and answers
        let question = questions[`question${questionNum+1}`];
        let answers = question["answers"];
        let correct = question["correct"];

        // Set the question number and question on the page
        qnum.innerHTML = `Question ${questionNum + 1}/${numOfQuestions}`;
        qHeading.innerHTML = question["question"];

        // Create the buttons for the different answers
        for (let i = 0; i < answers.length; i++) {
            let answer = answers[i];
            let Button = document.createElement("input");
            Button.setAttribute("type", "radio");
            Button.setAttribute("name", "answer");
            
            if (answer == correct) {
                Button.setAttribute("value", "correct");
            } else {
                Button.setAttribute("value", "incorrect");
            }
            // Select the answer when the user clicks on it
            Button.onclick = () => {
                selected = answer;
            }
            answerForm.appendChild(Button);
            let label = document.createElement("label");
            label.innerHTML = answer;
            answerForm.appendChild(label);
            answerForm.appendChild(document.createElement("br"));
        }
        // Create the submit button
        let submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit";
        // Don't reload page on submit form
        submitButton.onclick = (e) => {
            e.preventDefault()
            if (selected == null) {
                alert("Please select an answer");
            } else {
                answersArray.push(selected);
                selected = null;
                answerForm.innerHTML = "";
                nextQuestion(questionNum);
            }
        }
        answerForm.append(submitButton);
    }
    // Once all questions have been answered, calculate score and compare answers
    else {
        checkAnswers();
        return;
    }
}

function checkAnswers() {
    // Go through all individual answers
    for (let i = 0; i < answersArray.length; i++) {
        let answer = answersArray[i];
        if (answer == questions[`question${i + 1}`]["correct"]) {
            score++;
        }
    }
    qHeading.innerHTML = `Finished`;
    qnum.innerHTML = `Score: ${score}/${numOfQuestions}`;
    let qAndA = ""
    let correctAnswers = ""
    for (let i = 0; i < numOfQuestions; i++) {
        qAndA += `<br>Question ${i+1}: ${answersArray[i]}<br>`;
    }
    for (let i = 0; i < numOfQuestions; i++) {
        correctAnswers += `<br>Question ${i+1}: ${questions[`question${i+1}`]["correct"]}<br>`;

    answerForm.innerHTML = `Your Answers: <br> ${qAndA} <br><br> Correct Answers: <br>${correctAnswers}`;
}
}

nextQuestion(questionNum);