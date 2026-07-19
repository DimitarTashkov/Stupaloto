/* ==========================================================================
   FORM.JS – Contact form validation and submission
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = form.querySelector('#form-name');
  const phoneInput = form.querySelector('#form-phone');
  const messageInput = form.querySelector('#form-message');
  const submitBtn = form.querySelector('.form-submit-btn');
  const formContent = form.querySelector('.form-content');
  const formSuccess = form.querySelector('.form-success');

  // Real-time validation on blur
  [nameInput, phoneInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    if (nameInput && !validateField(nameInput)) isValid = false;
    if (phoneInput && !validateField(phoneInput)) isValid = false;
    if (messageInput && !validateField(messageInput)) isValid = false;

    if (!isValid) return;

    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Изпращане...';
    }

    // Simulate form submission (replace with Formspree or WP endpoint later)
    try {
      await simulateSubmission();

      // Show success message
      if (formContent) formContent.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('visible');

      // Reset form
      form.reset();
    } catch (error) {
      alert('Грешка при изпращане. Моля, опитайте отново или ни се обадете.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Изпрати съобщение';
      }
    }
  });
}

function validateField(input) {
  const errorEl = input.parentElement.querySelector('.form-error-message');

  // Remove existing error
  input.classList.remove('error');
  if (errorEl) errorEl.classList.remove('visible');

  let isValid = true;
  let errorMessage = '';

  // Required check
  if (input.required && !input.value.trim()) {
    isValid = false;
    errorMessage = 'Това поле е задължително';
  }

  // Specific validations
  if (isValid && input.id === 'form-name' && input.value.trim().length < 2) {
    isValid = false;
    errorMessage = 'Моля, въведете поне 2 символа';
  }

  if (isValid && input.id === 'form-phone') {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,15}$/;
    if (input.value.trim() && !phoneRegex.test(input.value.trim())) {
      isValid = false;
      errorMessage = 'Моля, въведете валиден телефонен номер';
    }
  }

  if (isValid && input.id === 'form-message' && input.value.trim().length > 0 && input.value.trim().length < 10) {
    isValid = false;
    errorMessage = 'Моля, въведете поне 10 символа';
  }

  if (!isValid) {
    input.classList.add('error');
    if (errorEl) {
      errorEl.textContent = errorMessage;
      errorEl.classList.add('visible');
    }
  }

  return isValid;
}

// Temporary simulation – replace with actual Formspree/WP endpoint
function simulateSubmission() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1200);
  });
}
