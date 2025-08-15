// This file contains JavaScript code specific to the home page.
// It may include functions to handle user interactions and dynamic content for the home section.

document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = 'Welcome to our website!';
    }

    const button = document.getElementById('home-button');
    if (button) {
        button.addEventListener('click', () => {
            alert('Home button clicked!');
        });
    }
});