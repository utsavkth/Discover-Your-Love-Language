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
            <p><b>What It Means:</b> Your love language is Words of Affirmation. This means that heartfelt words and expressions from your partner have the power to make you feel truly valued. When she takes the time to acknowledge you or say something supportive, it reinforces the bond between you two, making you feel appreciated in a special way.</p>
            <p><b>What You Value Most:</b> Compliments, words of encouragement, and genuine expressions of love make the biggest impact on you. Whether she tells you how much she respects you or simply says "I love you" out of the blue, these words resonate deeply and make you feel close to her.</p>
            <p><b>How You Can Enhance Your Relationship:</b> Let her know that verbal expressions are meaningful to you. Be open about how affirming words make you feel loved, and express your gratitude when she shows this side of her affection. Similarly, take time to verbally appreciate her as well, sharing how much she means to you.</p>
            <p><b>Ways to Express:</b> Show your love by using affirming words in return. Compliment her, thank her for the little things, or leave a thoughtful message. A simple "I'm grateful for you" can be powerful in reinforcing your connection.</p>
        `,
        "Quality Time": `
            <p><b>What It Means:</b> Your love language is Quality Time, so feeling connected often means sharing meaningful moments with her. Whether it's enjoying a shared activity or just having a quiet conversation, being fully present makes you feel close and valued.</p>
            <p><b>What You Value Most:</b> You cherish the times when she gives you her undivided attention, where distractions are set aside, and it’s just the two of you truly engaging. Simple moments like cooking together or a quiet evening without phones help you feel loved.</p>
            <p><b>How You Can Enhance Your Relationship:</b> Express to her how much you value spending quality time together. Suggest activities or simple routines that allow for these moments, and make it clear that what matters is the presence and focus she brings during those times.</p>
            <p><b>Ways to Express:</b> Show love by planning one-on-one moments. Even a small coffee break, a planned outing, or a shared hobby can make a big difference. What matters is the focus and attention you both bring to these moments together.</p>
        `,
        "Acts of Service": `
            <p><b>What It Means:</b> Acts of Service is your love language, so the things she does to help or support you show love in a profound way. When she takes on a task or goes out of her way to make life easier, you feel her love in these actions.</p>
            <p><b>What You Value Most:</b> Small gestures—like handling a chore, making your favorite meal, or helping with a project—show you that she notices your needs and wants to make things easier for you. It’s not about grand gestures but consistent, thoughtful actions.</p>
            <p><b>How You Can Enhance Your Relationship:</b> Let her know how much her efforts mean to you, and be specific about the kinds of help or actions that make you feel supported. Also, look for ways to reciprocate—doing something thoughtful for her, especially when she’s stressed, reinforces the love between you.</p>
            <p><b>Ways to Express:</b> Look for ways to help her in return. Offer to take on something she’s been meaning to do, or surprise her by handling a task she might not expect. These acts show your appreciation and help deepen your connection.</p>
        `,
        "Receiving Gifts": `
            <p><b>What It Means:</b> Your love language is Receiving Gifts, meaning thoughtful presents or surprises make you feel valued. It’s not about the material value but the thought behind each gift—knowing she was thinking of you when she chose it.</p>
            <p><b>What You Value Most:</b> The effort and intention she puts into a gift, especially if it’s something meaningful or reflective of your relationship, speaks volumes to you. Whether it’s a favorite treat, a memory from a shared experience, or a small token, it’s her thoughtfulness that matters most.</p>
            <p><b>How You Can Enhance Your Relationship:</b> Share how much you appreciate the meaning behind a thoughtful gift. When she goes out of her way to find something personal, it strengthens your connection. In return, think of ways to surprise her with items that show your affection and understanding.</p>
            <p><b>Ways to Express:</b> Show your love by choosing gifts that hold meaning—something that represents an inside joke, a shared memory, or her interests. Surprises don’t have to be extravagant to show love; even a small gesture speaks volumes.</p>
        `,
        "Physical Touch": `
            <p><b>What It Means:</b> Your love language is Physical Touch, so affectionate gestures and physical closeness help you feel loved. Whether it’s a hug, holding hands, or simply a comforting touch, these small actions mean a lot to you.</p>
            <p><b>What You Value Most:</b> You value physical expressions of affection—touches that provide comfort and closeness. Whether she reaches for your hand during a conversation or gives you a warm hug, these moments make you feel emotionally secure.</p>
            <p><b>How You Can Enhance Your Relationship:</b> Communicate your need for physical affection. Let her know that these gestures help you feel connected, and don’t hesitate to show affection through hugs, holding hands, or other comforting gestures. Physical touch builds intimacy and strengthens your bond.</p>
            <p><b>Ways to Express:</b> Show love through meaningful touch. Offer a warm hug when she needs it, hold hands during a walk, or provide a gentle touch to show support. Physical affection doesn’t always have to be romantic; it’s about creating a sense of connection through touch.</p>
        `
    };
    
    return descriptions[language] || '';
}



// Get image for each love language
function getLanguageImage(language) {
    const images = {
        "Words of Affirmation": '<img src="him-words-of-affirmation.png" alt="Words of Affirmation" style="width:100%; height:auto; border-radius:10px;">',
        "Quality Time": '<img src="him-quality-time.png" alt="Quality Time" style="width:100%; height:auto; border-radius:10px;">',
        "Acts of Service": '<img src="him-act-of-service.png" alt="Acts of Service" style="width:100%; height:auto; border-radius:10px;">',
        "Receiving Gifts": '<img src="him-receiving-gifts.png" alt="Receiving Gifts" style="width:100%; height:auto; border-radius:10px;">',
        "Physical Touch": '<img src="him-physical-touch.png" alt="Physical Touch" style="width:100%; height:auto; border-radius:10px;">'
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

// Function to toggle the navigation menu
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("show");
}