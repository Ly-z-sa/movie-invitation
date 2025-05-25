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

const EMAILJS_SERVICE_ID = 'service_i3aliph';
const EMAILJS_TEMPLATE_ID = 'template_jb0adnv'; // Replace with your template ID
const EMAILJS_PUBLIC_KEY = '6YJYhziQkiK7P8aHU';   // Replace with your EmailJS public key

// Add an event listener for the form submission
rsvpForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Submit to Formspree
    const data = new FormData(rsvpForm);
    fetch('https://formspree.io/f/mwpodloj', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            // 2. Send confirmation email via EmailJS
            const name = rsvpForm.elements['name'].value;
            const email = rsvpForm.elements['email'].value;
            const guests = rsvpForm.elements['guests'].value;
        
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                name: name,
                email: email,
                guests: guests,
                movietitle: movietitle,
                moviedate: moviedate
            }, EMAILJS_PUBLIC_KEY)
            .then(function() {
                rsvpForm.classList.add('hidden');
                document.getElementById('thank-you-message').classList.remove('hidden');
            }, function(error) {
                rsvpForm.classList.add('hidden');
                document.getElementById('thank-you-message').classList.remove('hidden');
                // Optionally show a warning that confirmation email failed
            });
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

const movietitle = document.getElementById('movie-title').textContent;
const moviedate = document.getElementById('movie-date').textContent;
