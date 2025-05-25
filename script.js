// Get references to the HTML elements
const rsvpButton = document.getElementById('rsvp-button');
const rsvpForm = document.getElementById('rsvp-form');
const messageBox = document.getElementById('message-box');

// Add an event listener to the RSVP button to show the form
rsvpButton.addEventListener('click', () => {
    rsvpForm.classList.remove('hidden'); // Make the form visible
    rsvpButton.classList.add('hidden'); // Hide the RSVP button
    messageBox.style.display = 'none'; // Hide any previous messages
});

// Add an event listener for the form submission
rsvpForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const data = new FormData(rsvpForm);
    fetch('https://formspree.io/f/mwpodloj', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            rsvpForm.classList.add('hidden');
            document.getElementById('thank-you-message').classList.remove('hidden');
        } else {
            document.getElementById('message-box').textContent = "There was an error. Please try again.";
        }
    }).catch(() => {
        document.getElementById('message-box').textContent = "There was an error. Please try again.";
    });
});

/**
 * Displays a message in the designated message box.
 * @param {string} message - The text content of the message to display.
 * @param {'success' | 'error'} type - The type of message, which determines its styling ('success' for green, 'error' for red).
 */
function showMessage(message, type) {
    messageBox.textContent = message; // Set the message text
    // Remove existing type classes and add the new one
    messageBox.classList.remove('hidden', 'success', 'error');
    messageBox.classList.add(type);
    messageBox.style.display = 'block'; // Ensure the message box is visible
}
