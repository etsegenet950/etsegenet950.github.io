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

        // Build a review summary and ask for confirmation before sending
        const summary = [
            'Please review your message:',
            '',
            'Name: ' + (data.name || ''),
            'Email: ' + (data.email || ''),
            (data.subject ? 'Subject: ' + data.subject : null),
            'Message:',
            (data.message || ''),
            '',
            'Send this message?'
        ].filter(Boolean).join('\n');

        const ok = confirm(summary);
        if (ok) {
            // Here you can add code to send the data to a server or handle it as needed
            console.log('Form submitted:', data);
            alert('Thank you, ' + data.name + '! Your message has been sent.');
            contactForm.reset();
        } // else keep the form intact for further edits
    }
});