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
rsvpForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Retrieve values from the form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const guests = document.getElementById('guests').value;

    // Basic validation to ensure all required fields are filled
    if (!name || !email || !guests) {
        showMessage('Please fill in all fields.', 'error'); // Display an error message
        return; // Stop the function execution
    }

    // Simulate sending data to a server (in a real application, you would use fetch() or XMLHttpRequest here)
    console.log('RSVP Submitted:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Guests: ${guests}`);

    // Display a success message to the user
    showMessage(`Thank you, ${name}! Your RSVP for ${guests} person(s) has been received. We look forward to seeing you!`, 'success');

    // Hide the form and show the RSVP button again after successful submission
    rsvpForm.classList.add('hidden');
    rsvpButton.classList.remove('hidden');
    rsvpForm.reset(); // Clear the form fields
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

// Example of how you could dynamically update movie details here if needed
// For example:
// document.getElementById('movie-title').textContent = "The New Sci-Fi Epic";
// document.getElementById('movie-date').textContent = "Friday, July 5th";
// document.getElementById('movie-time').textContent = "8:30 PM EST";
// document.getElementById('movie-location').textContent = "Virtual Screening Link";
