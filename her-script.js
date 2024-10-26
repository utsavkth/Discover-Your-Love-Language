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

function updateProgressBar() {
    const progress = (currentQuestion / totalQuestions) * 100;
    console.log("Updating progress:", currentQuestion, totalQuestions);
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

    // Hide FAQ section after all responses are collected
    document.getElementById("faqSection").style.display = "none";

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
            <p><b>What It Means:</b> Your love language is Words of Affirmation. This means that sincere words and expressions from your partner make you feel truly cherished. When he takes the time to acknowledge you or say something supportive, it strengthens your bond, making you feel valued in a special way.</p>
            <p><b>What You Value Most:</b> Compliments, words of encouragement, and loving expressions impact you deeply. Whether he tells you how much he appreciates all you do or surprises you with a heartfelt "I love you," these words resonate deeply and make you feel connected.</p>
            <p><b>How You Can Enhance Your Relationship:</b> Let him know how meaningful affirming words are to you. Share with him that heartfelt words make you feel appreciated, and express your gratitude when he shows this kind of affection. Also, take time to affirm him in return, letting him know how much he means to you.</p>
            <p><b>Ways to Express:</b> Show your love by using thoughtful words. Compliment him, thank him for his support, or leave a sweet message for him to find. Even a simple "I'm so grateful for you" can be incredibly meaningful.</p>
        `,
        "Quality Time": `
            <p><b>What It Means:</b> Your love language is Quality Time, so feeling connected often comes from spending meaningful moments together. Whether it’s enjoying a shared activity or having a heart-to-heart conversation, undivided attention makes you feel close and appreciated.</p>
            <p><b>What You Value Most:</b> You treasure moments when he gives you his full attention, setting aside distractions so it’s just the two of you. Simple activities like cooking dinner together, taking a walk, or sharing a meal make you feel deeply connected.</p>
            <p><b>How You Can Enhance Your Relationship:</b> Let him know how much you value quality time. Suggest activities or routines that allow you to spend meaningful time together, and make it clear that his focused attention during these moments is what makes you feel loved.</p>
            <p><b>Ways to Express:</b> Show love by planning special moments together. Even something as small as a coffee date, a weekend outing, or a shared hobby can mean a lot, as long as you’re fully present in those moments.</p>
        `,
        "Acts of Service": `
            <p><b>What It Means:</b> Acts of Service is your love language, meaning that the things he does to help or support you show love in a deep way. When he takes on a task or goes out of his way to make life easier, you feel loved and cared for.</p>
            <p><b>What You Value Most:</b> Small gestures like handling a chore, preparing your favorite meal, or helping with something on your to-do list show that he notices your needs and wants to make life smoother for you. It’s not about grand gestures, but thoughtful, consistent actions.</p>
            <p><b>How You Can Enhance Your Relationship:</b> Share with him how much his efforts mean to you, and be specific about the kinds of help or actions that make you feel supported. Reciprocate by finding ways to help him, especially during stressful times, to reinforce your love and appreciation.</p>
            <p><b>Ways to Express:</b> Look for ways to show your love by helping him in return. Take on a task he’s been meaning to complete, or surprise him by handling something without being asked. These actions show appreciation and help strengthen your bond.</p>
        `,
        "Receiving Gifts": `
            <p><b>What It Means:</b> Your love language is Receiving Gifts, meaning thoughtful surprises and presents make you feel appreciated. It’s not about the cost but the thoughtfulness behind each gift, knowing he was thinking of you when he chose it.</p>
            <p><b>What You Value Most:</b> When he puts effort into choosing something meaningful or sentimental, it speaks volumes. Small tokens that reflect your relationship, like a favorite treat, a shared memory, or a reminder of an inside joke, make you feel valued and understood.</p>
            <p><b>How You Can Enhance Your Relationship:</b> Let him know how much his thoughtful gifts mean to you. Share that it’s the intention and thought behind the gifts that make you feel loved. Surprise him with small gestures in return, showing your affection through personal gifts.</p>
            <p><b>Ways to Express:</b> Show your love by choosing meaningful gifts for him as well—something that represents a shared experience, a memory, or his interests. Surprises don’t need to be extravagant; even a small token can show love.</p>
        `,
        "Physical Touch": `
            <p><b>What It Means:</b> Your love language is Physical Touch, meaning affectionate gestures and physical closeness help you feel loved. Whether it’s a hug, holding hands, or a comforting touch, these actions make you feel connected and secure.</p>
            <p><b>What You Value Most:</b> You deeply appreciate physical expressions of love, whether it’s holding hands during a walk, a gentle touch on your shoulder, or a warm embrace. These moments make you feel emotionally supported and close to him.</p>
            <p><b>How You Can Enhance Your Relationship:</b> Communicate your need for physical affection to him. Let him know that these small gestures help you feel connected and reassured. Physical closeness builds intimacy and reinforces your bond.</p>
            <p><b>Ways to Express:</b> Show love through meaningful touch. Offer a hug when he needs it, hold hands during a conversation, or place a comforting hand on his shoulder. These gestures, however small, create a strong sense of connection.</p>
        `
    };
    return descriptions[language] || '';
}




// Get image for each love language
function getLanguageImage(language) {
    const images = {
        "Words of Affirmation": '<img src="her-words-of-affirmation.png" alt="Words of Affirmation" style="width:100%; height:auto; border-radius:10px;">',
        "Quality Time": '<img src="her-quality-time.png" alt="Quality Time" style="width:100%; height:auto; border-radius:10px;">',
        "Acts of Service": '<img src="her-act-of-service.png" alt="Acts of Service" style="width:100%; height:auto; border-radius:10px;">',
        "Receiving Gifts": '<img src="her-receiving-gifts.png" alt="Receiving Gifts" style="width:100%; height:auto; border-radius:10px;">',
        "Physical Touch": '<img src="her-physical-touch.png" alt="Physical Touch" style="width:100%; height:auto; border-radius:10px;">'
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

    // Show the progress bar and the first question
    document.querySelector('.progress-container').style.display = 'block';
    document.getElementById('question1').style.display = 'block';
    updateProgressBar();  // Initialize progress bar
}
