// Donate form handling
// Validates donation details and bank statement attachment, then shows a confirmation alert.

document.addEventListener('DOMContentLoaded', function () {
  const donateForm = document.getElementById('donate-form');
  const fileInput = document.getElementById('bank-statement');
  const fileNameSpan = document.getElementById('bank-statement-name');
  const clearBtn = document.getElementById('clear-bank-statement');

  if (!donateForm) return;

  // Show selected file name and enable cancel
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      const f = fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
      if (fileNameSpan) fileNameSpan.textContent = f ? f.name : 'No file selected';
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      if (fileInput) {
        fileInput.value = '';
      }
      if (fileNameSpan) fileNameSpan.textContent = 'No file selected';
    });
  }

  donateForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = donateForm.querySelector('#donor-name')?.value?.trim();
    const email = donateForm.querySelector('#donor-email')?.value?.trim();
    const amount = parseFloat(donateForm.querySelector('#donation-amount')?.value);
    const method = donateForm.querySelector('#donation-method')?.value;
    const file = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;

    // Basic validation
    if (!name || !email || !amount || !method) {
      alert('Please fill in all required fields.');
      return;
    }

    // File validation: required, size <= 5MB, allowed types
    if (!file) {
      alert('Please attach your bank statement (PDF/JPG/PNG).');
      return;
    }

    const maxBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxBytes) {
      alert('Attached file is too large. Please upload a file smaller than 5MB.');
      return;
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Please upload a PDF, JPG, or PNG.');
      return;
    }

    // TODO: Integrate with backend or email service here if needed.
    // For now, just show a confirmation and reset the form.
    alert(`Thank you, ${name}! Your donation details were submitted successfully. We will review your bank statement shortly.`);
    donateForm.reset();
    if (fileNameSpan) fileNameSpan.textContent = 'No file selected';
  });
});
