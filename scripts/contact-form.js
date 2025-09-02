async function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formMessage = document.getElementById('form-message');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            formMessage.textContent = '✅ Message sent successfully! We\'ll get back to you soon.';
            formMessage.className = 'form-message success';
            form.reset();
        } else {
            throw new Error(data.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = `❌ ${error.message || 'Failed to send message. Please try again later.'}`;
        formMessage.className = 'form-message error';
    } finally {
        // Reset button state
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    return false;
}

// Add event listener for form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});
