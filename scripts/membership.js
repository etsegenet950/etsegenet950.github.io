function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const otherSkillInput = document.getElementById('other-skill');
    const formMessage = document.getElementById('form-message');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    
    // Get all form values
    const formData = new FormData(form);
    let submissionText = 'New Membership Application Details:\n\n';
    
    // Add form fields to submission text
    for (let [key, value] of formData.entries()) {
        if (key === 'skills' || key === 'other_skill' || key === 'other_education') continue;
        
        const label = document.querySelector(`label[for="${key}"]`);
        const displayName = label ? label.textContent.replace('*', '').trim() : key;
        
        if (value) {
            submissionText += `${displayName}: ${value}\n`;
        }
    }
    
    // Add other education if specified
    const otherEducation = formData.get('other_education');
    if (otherEducation) {
        submissionText += `Educational Background: ${otherEducation}\n`;
    }
    
    // Add skills
    const skills = Array.from(document.querySelectorAll('input[name="skills"]:checked'))
        .map(cb => cb.value === 'other' ? otherSkillInput.value : cb.value);
    
    if (skills.length > 0) {
        submissionText += `\nSkills: ${skills.join(', ')}`;
    }
    
    // Create a results div to show the submission
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'submission-results';
    resultsDiv.style.marginTop = '20px';
    resultsDiv.style.padding = '15px';
    resultsDiv.style.border = '1px solid #ddd';
    resultsDiv.style.borderRadius = '5px';
    resultsDiv.style.backgroundColor = '#f9f9f9';
    resultsDiv.style.whiteSpace = 'pre-line';
    
    // Add the submission text
    resultsDiv.textContent = submissionText;
    
    // Create a copy button
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.style.marginTop = '10px';
    copyButton.style.padding = '8px 15px';
    copyButton.style.backgroundColor = '#4CAF50';
    copyButton.style.color = 'white';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '4px';
    copyButton.style.cursor = 'pointer';
    
    copyButton.onclick = function() {
        navigator.clipboard.writeText(submissionText).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy to Clipboard';
            }, 2000);
        });
    };
    
    // Add elements to the page
    form.parentNode.insertBefore(resultsDiv, form.nextSibling);
    form.parentNode.insertBefore(copyButton, resultsDiv.nextSibling);
    
    // Reset form
    form.reset();
    otherSkillInput.style.display = 'none';
    btnLoader.style.display = 'none';
    btnText.style.display = 'inline-block';
    
    // Show success message
    formMessage.textContent = 'Form submitted successfully! Copy the text above and send it to fanoslehulucharityorg@gmail.com';
    formMessage.className = 'form-message success';
    
    return false;
}

// Handle form field visibility
document.addEventListener('DOMContentLoaded', function() {
    const otherSkillInput = document.getElementById('other-skill');
    const educationSelect = document.getElementById('education');
    const otherEducationContainer = document.getElementById('other-education-container');
    const otherEducationInput = document.getElementById('other-education');
    
    // Handle skills 'Other' option
    document.querySelectorAll('input[name="skills"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.value === 'other' && this.checked) {
                otherSkillInput.style.display = 'block';
                otherSkillInput.required = true;
            } else if (this.value === 'other' && !this.checked) {
                otherSkillInput.style.display = 'none';
                otherSkillInput.required = false;
                otherSkillInput.value = '';
            }
        });
    });
    
    // Handle education 'Other' option
    if (educationSelect) {
        educationSelect.addEventListener('change', function() {
            if (this.value === 'Other') {
                otherEducationContainer.style.display = 'block';
                otherEducationInput.required = true;
            } else {
                otherEducationContainer.style.display = 'none';
                otherEducationInput.required = false;
                otherEducationInput.value = '';
            }
        });
    }
    
    // Terms modal
    const termsLink = document.getElementById('terms-link');
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('By submitting this form, you agree to our terms and conditions.');
        });
    }
});
