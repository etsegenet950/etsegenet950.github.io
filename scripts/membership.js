function handleFormSubmit(event) {
    const form = event.target;
    const otherSkillInput = document.getElementById('other-skill');
    const otherEducationInput = document.getElementById('other-education');
    const formMessage = document.getElementById('form-message');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    
    // Handle other education field
    const educationSelect = document.getElementById('education');
    if (educationSelect.value === 'Other' && otherEducationInput.value) {
        // Add hidden input for other education
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'education';
        hiddenInput.value = otherEducationInput.value;
        form.appendChild(hiddenInput);
    }
    
    // Handle other skill field
    const otherSkillCheckbox = document.querySelector('input[name="skills"][value="other"]');
    if (otherSkillCheckbox && otherSkillCheckbox.checked && otherSkillInput.value) {
        // Add hidden input for other skill
        const hiddenSkillInput = document.createElement('input');
        hiddenSkillInput.type = 'hidden';
        hiddenSkillInput.name = 'skills';
        hiddenSkillInput.value = otherSkillInput.value;
        form.appendChild(hiddenSkillInput);
    }
    
    // Let FormSubmit handle the submission
    return true;
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
