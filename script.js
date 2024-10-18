let currentQuestion = 1;
const totalQuestions = 30;

// Function to show the next question
function nextQuestion(questionNumber) {
    if (questionNumber <= totalQuestions) {
        // Hide current question
        document.getElementById(`question${currentQuestion}`).style.display = 'none';
        // Show next question
        document.getElementById(`question${questionNumber}`).style.display = 'block';
        currentQuestion = questionNumber;
        updateProgressBar();

        // If it's the last question, show the Submit button
        if (currentQuestion === totalQuestions) {
            document.getElementById("submitBtn").style.display = 'block';
        }
    }
}

// Function to show the previous question
function previousQuestion(questionNumber) {
    if (questionNumber > 0) {
        // Hide current question
        document.getElementById(`question${currentQuestion}`).style.display = 'none';
        // Show previous question
        document.getElementById(`question${questionNumber}`).style.display = 'block';
        currentQuestion = questionNumber;
        updateProgressBar();
    }
}

// Function to enable the "Next" button, change the color, and update the progress bar when an option is selected
function optionSelected(questionNumber) {
    const nextButton = document.getElementById(`nextBtn${questionNumber}`);
    nextButton.disabled = false;  // Enable the button
    nextButton.style.backgroundColor = '#4A90E2';  // Change button color to active (e.g., blue)
    nextButton.style.color = 'white';  // Ensure text color is visible
    updateProgressBar();  // Update the progress bar
}

// Progress Bar Update Function
function updateProgressBar() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById("progressBar").style.width = progress + "%";
}

// Submit answers and show results
function submitAnswers() {
    const responses = {};
    
    // Collect responses from the quiz
    for (let i = 1; i <= totalQuestions; i++) {
        const radios = document.getElementsByName(`q${i}`);
        let answered = false;
        for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
                responses[`q${i}`] = radios[j].value;
                answered = true;
                break;
            }
        }
        if (!answered) {
            alert(`Please answer Question ${i} before submitting.`);
            return;
        }
    }

    // Count the frequency of each love language
    const languageCount = {};
    Object.values(responses).forEach(language => {
        languageCount[language] = (languageCount[language] || 0) + 1;
    });

    // Sort love languages by their count (frequency)
    const sortedLanguages = Object.entries(languageCount).sort((a, b) => b[1] - a[1]);

    // Select top 2 as primary love languages and next 2 as secondary love languages
    const primaryLanguages = sortedLanguages.slice(0, 2).map(lang => lang[0]);
    const secondaryLanguages = sortedLanguages.slice(2, 4).map(lang => lang[0]);

    // Display the results for primary love languages
    const resultDiv = document.getElementById("result");
    const resultLanguagesDiv = document.getElementById("resultLanguages");
    resultLanguagesDiv.innerHTML = `<p><b style="color: #333333;">Your Primary Love Languages:</b></p>`;

    primaryLanguages.forEach(language => {
        resultLanguagesDiv.innerHTML += `<h3>${language}</h3>`;
        resultLanguagesDiv.innerHTML += getLanguageDescription(language);
        resultLanguagesDiv.innerHTML += getLanguageImage(language);  // Add image based on love language
    });

    // Display the results for secondary love languages
    resultLanguagesDiv.innerHTML += `<p><b style="color: #333333;">Your Secondary Love Languages:</b></p>`;
    secondaryLanguages.forEach(language => {
        resultLanguagesDiv.innerHTML += `<h3>${language}</h3>`;
        resultLanguagesDiv.innerHTML += getLanguageDescription(language);
        resultLanguagesDiv.innerHTML += getLanguageImage(language);  // Add image based on love language
    });

    // Show the result section and reset button
    resultDiv.style.display = "block";
    document.getElementById("resetBtn").style.display = "block";
    document.getElementById("downloadBtn").style.display = "block";  // Show download button
    document.getElementById("whatsappBtn").style.display = "block";  // Show WhatsApp button

    // Show the feedback section after results
    document.querySelector(".feedback-container").style.display = "block";

    // Hide all questions and progress bar
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`question${i}`).style.display = 'none';
    }
    document.querySelector(".progress-container").style.display = 'none';
    document.getElementById("submitBtn").style.display = 'none';
}

// Function to download the result as an image
function downloadResult() {
    const resultDiv = document.getElementById('result');
    html2canvas(resultDiv).then(function(canvas) {
        const link = document.createElement('a');
        link.download = 'Love_Language_Result.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// Function to share the result via WhatsApp
function shareToWhatsapp() {
    const resultText = document.getElementById('resultLanguages').innerText;
    const quizLink = "Check your love language here: https://utsavkth.github.io/love-languages-quiz/";
    const whatsappUrl = `https://api.whatsapp.com/send?text=Check out my Love Language result: ${encodeURIComponent(resultText)}%0A%0A${encodeURIComponent(quizLink)}`;
    window.open(whatsappUrl, '_blank');
}

// Get description for each love language
function getLanguageDescription(language) {
    const descriptions = {
        "Words of Affirmation": `
            <p><b>What It Means:</b> Your love language is Words of Affirmation, which means you feel most appreciated when someone takes the time to say something thoughtful or kind to you.</p>
            <p><b>What You Value Most:</b> You value receiving sincere compliments, words of encouragement, and verbal acknowledgments.</p>
            <p><b>How You Can Enhance Your Relationships:</b> Express your own feelings verbally to those you care about.</p>
        `,
        "Quality Time": `
            <p><b>What It Means:</b> Your primary love language is Quality Time, which means nothing is more meaningful to you than having someone’s full attention.</p>
            <p><b>What You Value Most:</b> You value quality over quantity.</p>
            <p><b>How You Can Enhance Your Relationships:</b> Plan intentional time with your loved ones.</p>
        `,
        "Acts of Service": `
            <p><b>What It Means:</b> Your love language is Acts of Service, meaning actions speak louder than words for you.</p>
            <p><b>What You Value Most:</b> You value helpful actions that make your life easier.</p>
            <p><b>How You Can Enhance Your Relationships:</b> You can build stronger connections by offering thoughtful help to your loved ones in return.</p>
        `,
        "Receiving Gifts": `
            <p><b>What It Means:</b> Your love language is Receiving Gifts. For you, a thoughtful gift is a symbol of love and appreciation.</p>
            <p><b>What You Value Most:</b> You value small, meaningful tokens of love.</p>
            <p><b>How You Can Enhance Your Relationships:</b> Share with others how much small, thoughtful gestures mean to you.</p>
        `,
        "Physical Touch": `
            <p><b>What It Means:</b> Your primary love language is Physical Touch, which means you feel most connected to others through physical closeness.</p>
            <p><b>What You Value Most:</b> You value the warmth and comfort that comes from affectionate touch.</p>
            <p><b>How You Can Enhance Your Relationships:</b> You can enhance your relationships by expressing your need for physical closeness.</p>
        `
    };
    return descriptions[language] || "";
}

// Get image for each love language
function getLanguageImage(language) {
    const images = {
        "Words of Affirmation": '<img src="https://www.simplypsychology.org/wp-content/uploads/showing-words-of-affirmation-1536x1536.jpeg" alt="Words of Affirmation" style="width:100%; height:auto; border-radius:10px;">',
        "Quality Time": '<img src="https://www.simplypsychology.org/wp-content/uploads/couple-eating-dinner-1536x1024.jpeg" alt="Quality Time" style="width:100%; height:auto; border-radius:10px;">',
        "Acts of Service": '<img src="https://www.simplypsychology.org/wp-content/uploads/acts-of-service-cup-of-tea-1536x1536.jpeg" alt="Acts of Service" style="width:100%; height:auto; border-radius:10px;">',
        "Receiving Gifts": '<img src="https://www.simplypsychology.org/wp-content/uploads/suprise-gift-1.jpg" alt="Receiving Gifts" style="width:100%; height:auto; border-radius:10px;">',
        "Physical Touch": '<img src="https://www.simplypsychology.org/wp-content/uploads/Couple-hugging-1536x1536.jpeg" alt="Physical Touch" style="width:100%; height:auto; border-radius:10px;">'
    };
    return images[language] || "";
}

// Reset the quiz
function resetQuiz() {
    // Hide result, feedback, and reset button
    document.getElementById("result").style.display = "none";
    document.getElementById("resetBtn").style.display = "none";
    document.getElementById("downloadBtn").style.display = "none";  // Hide download button
    document.getElementById("whatsappBtn").style.display = "none";  // Hide WhatsApp button
    document.getElementById("feedback-section").style.display = "none";  // Hide feedback section

    // Reset progress bar
    document.getElementById("progressBar").style.width = "0%";
    document.querySelector(".progress-container").style.display = 'block';

    // Reset and hide all questions
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`question${i}`).style.display = 'none';
        const radios = document.getElementsByName(`q${i}`);
        radios.forEach(radio => radio.checked = false);
    }
    currentQuestion = 1;  // Reset to the first question
    document.getElementById(`question1`).style.display = 'block';
}

// Initialize by showing the first question
window.onload = function() {
    document.getElementById(`question1`).style.display = 'block';
    updateProgressBar();  // Update progress bar to reflect current progress
}

function startQuiz() {
    // Hide instructions and show quiz questions
    document.querySelector('.quiz-instructions').style.display = 'none';
    document.querySelector('.reminder').style.display = 'none';
    document.getElementById('quizQuestions').style.display = 'block';
    document.getElementById('startQuizBtn').style.display = 'none';
    // Show the first question
    document.getElementById('question1').style.display = 'block';
}