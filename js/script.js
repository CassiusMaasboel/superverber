document.addEventListener('DOMContentLoaded', () => {
    const tenseButtons = document.querySelectorAll('.tense-button');
    const verbItems = document.querySelectorAll('.verb-item');

    let selectedTense = null;

    // Handle tense selection
    tenseButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'selected' class from all buttons
            tenseButtons.forEach(btn => btn.classList.remove('selected', 'error'));
            // Add 'selected' class to clicked button
            button.classList.add('selected');
            selectedTense = button.getAttribute('data-tense');
        });
    });

    // Handle verb selection
    verbItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!selectedTense) {
                // Add 'error' class to all tense buttons
                tenseButtons.forEach(button => button.classList.add('error'));
            } else {
                const selectedVerb = item.id;
                // Redirect to questions.html with query parameters
                window.location.href = `questions.html?verb=${selectedVerb}&tense=${selectedTense}`;
            }
        });
    });
});
