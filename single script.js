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
            <p><b>What It Means:</b> Your love language is Words of Affirmation, meaning that verbal expressions of love, support, and appreciation deeply resonate with you. When someone takes the time to say kind or encouraging words, it makes you feel valued and loved. These words reassure you of your importance in their life and help strengthen your connection.</p>
            <p><b>What You Value Most:</b> You place immense value on compliments, thoughtful encouragement, and verbal appreciation. Whether it’s acknowledging your achievements, expressing gratitude, or giving you a heartfelt compliment, words make you feel special. Even small, daily affirmations or a simple “I love you” hold significant meaning for you.</p>
            <p><b>How You Can Enhance Your Relationships:</b> To deepen your connections, it’s important to express your feelings to others. Let your loved ones know how much you appreciate them through spoken or written words. Be open about what makes you feel valued, and encourage others to communicate with you in this way. In return, be mindful of offering meaningful affirmations to those around you—it will show them that you recognize and care about their efforts.</p>
            <p><b>Ways to Express:</b> You can enhance your relationships by regularly sharing compliments, encouragement, and positive affirmations. For example, write a heartfelt note to your partner, or leave a kind message for a friend. Share what you admire about someone, or express your gratitude when they do something special. Acknowledging even the little things can go a long way in showing your appreciation.</p>
        `,
        "Quality Time": `
            <p><b>What It Means:</b> Your love language is Quality Time, which means that you feel most loved and connected when someone invests their time and attention in being fully present with you. It’s not just about spending time together, but truly engaging in meaningful interactions without distractions. This helps you build deeper emotional bonds with those you care about.</p>
            <p><b>What You Value Most:</b> You value undivided attention, deep conversations, and shared experiences. You’re not just interested in spending a lot of time with someone—you want quality moments where you can connect, share thoughts, and be present with each other. Even a few minutes of focused attention can mean more to you than hours spent together without engagement.</p>
            <p><b>How You Can Enhance Your Relationships:</b> To enhance your relationships, make a conscious effort to carve out quality time with those you care about. Prioritize being fully present by setting aside distractions like phones or TV and engage in meaningful conversations or activities. Let others know that it’s important to you to have time where you can truly connect. Sharing experiences such as going for a walk, cooking a meal together, or having a heartfelt conversation will strengthen your emotional bonds.</p>
            <p><b>Ways to Express:</b> Show your love by making time for one-on-one moments with your loved ones. Plan activities where you can fully engage with each other—whether it’s a special date night, a weekend trip, or even a simple coffee break. It’s not about how much time you spend, but about creating moments where you can bond and enjoy each other’s company without distractions.</p>
        `,
        "Acts of Service": `
            <p><b>What It Means:</b> Your love language is Acts of Service, meaning that actions speak louder than words for you. You feel most appreciated when someone goes out of their way to help you or make your life easier. It’s the small acts of kindness—whether it’s taking care of a task, running an errand, or offering help when you’re overwhelmed—that make you feel truly loved.</p>
            <p><b>What You Value Most:</b> You value thoughtful gestures that demonstrate someone’s willingness to support and care for you. When others take the initiative to do something that eases your burden, it shows you that they’re paying attention to your needs and are invested in your well-being. It’s not necessarily about grand gestures, but consistent, meaningful actions that make your life smoother.</p>
            <p><b>How You Can Enhance Your Relationships:</b> To build stronger connections, look for ways to be helpful to others, especially when they’re feeling overwhelmed. Whether it’s preparing a meal, handling a chore, or offering to assist in some way, these acts of service will show that you’re willing to go the extra mile. Let others know how much their help means to you as well, and be specific about the actions that make you feel supported.</p>
            <p><b>Ways to Express:</b> You can express your love through helpful gestures—big or small. Offer to do something for your partner or friend that lightens their load, like cooking dinner, picking up groceries, or helping them with a project. Being proactive in noticing what needs to be done and stepping in to help without being asked will show how much you care.</p>
        `,
        "Receiving Gifts": `
            <p><b>What It Means:</b> Your love language is Receiving Gifts, which means that tangible symbols of love and affection are important to you. It’s not about the material value of the gift but the thoughtfulness behind it. You feel most loved when someone gives you a gift that shows they were thinking of you, whether it’s for a special occasion or just because.</p>
            <p><b>What You Value Most:</b> You value the meaning behind a gift more than its price. Thoughtful, well-chosen gifts—especially those that reflect your interests or remind you of shared memories—make you feel cherished. For you, receiving a gift is a physical representation of someone’s love, care, and consideration.</p>
            <p><b>How You Can Enhance Your Relationships:</b> To strengthen your relationships, communicate to others that it’s not the gift itself, but the thought behind it that matters to you. Share how much you appreciate small, thoughtful gestures, and encourage your loved ones to express their affection through meaningful tokens. In return, look for ways to show your care by giving thoughtful gifts, whether it’s for a special occasion or a simple surprise.</p>
            <p><b>Ways to Express:</b> Express your love by choosing gifts that have meaning and show you were thinking of the person. It could be something that represents a shared experience, a thoughtful item related to their interests, or even a homemade token. Don’t wait for special occasions—surprising someone with a small, meaningful gift is a powerful way to show love.</p>
        `,
        "Physical Touch": `
            <p><b>What It Means:</b> Your love language is Physical Touch, which means that physical closeness and affectionate touch make you feel most loved. Whether it’s a hug, holding hands, or simply a comforting touch, you feel connected to others through physical expressions of affection.</p>
            <p><b>What You Value Most:</b> You deeply value the warmth and connection that comes from physical affection. Even small gestures, like a pat on the back or a touch on the arm, can provide comfort and reassurance. You feel most emotionally secure when you can physically express your love and receive that same closeness in return.</p>
            <p><b>How You Can Enhance Your Relationships:</b> To strengthen your relationships, communicate your need for physical affection to those around you. Let them know that physical closeness helps you feel connected, and don’t hesitate to show affection through hugs, holding hands, or other comforting gestures. Being open about your need for physical touch will create deeper bonds and emotional intimacy.</p>
            <p><b>Ways to Express:</b> You can express love through touch in simple but meaningful ways. Offer a warm hug when you greet someone, hold hands during a conversation, or provide a gentle touch to show support. Physical affection doesn’t always have to be romantic—it’s about creating a sense of connection and security through touch.</p>
        `
    };
    
    return descriptions[language] || '';
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

    // Show the progress bar and the first question
    document.querySelector('.progress-container').style.display = 'block';
    document.getElementById('question1').style.display = 'block';
    updateProgressBar();  // Initialize progress bar
}
