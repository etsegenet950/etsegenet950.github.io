// This file contains JavaScript code specific to the contact page.
// It includes functions for handling form submissions and user interactions on the contact section.

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleFormSubmit();
        });
    }

    function handleFormSubmit() {
        const formData = new FormData(contactForm);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Basic validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Here you can add code to send the data to a server or handle it as needed
        console.log('Form submitted:', data);
        alert('Thank you for contacting us, ' + data.name + '!');
        contactForm.reset();
    }
});