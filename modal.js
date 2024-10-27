// Function to open the prompt modal
function openPrompt() {
    document.getElementById('promptModal').style.display = 'flex'; // 'flex' centers the modal
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

// Function to close the modal
function closeModal() {
    document.getElementById('promptModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable background scroll
}

// Redirect based on user selections
function redirectToQuiz() {
    const relationshipStatus = document.getElementById('relationshipStatus').value;
    const gender = document.getElementById('gender').value;

    // Validate that both fields are selected
    if (!relationshipStatus || !gender) {
        alert('Please select both your relationship status and gender.');
        return;
    }

    // Redirect based on selections
    if (relationshipStatus === 'single') {
        window.location.href = 'quiz.html';
    } else if (relationshipStatus === 'married' && gender === 'male') {
        window.location.href = 'love-language-for-him.html';
    } else if (relationshipStatus === 'married' && gender === 'female') {
        window.location.href = 'love-language-for-her.html';
    }

    closeModal(); // Close the modal after redirection
}

// Close modal when clicking outside of it or pressing 'Escape'
window.onclick = function(event) {
    const modal = document.getElementById('promptModal');
    if (event.target === modal) {
        closeModal();
    }
};

window.onkeydown = function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
};
