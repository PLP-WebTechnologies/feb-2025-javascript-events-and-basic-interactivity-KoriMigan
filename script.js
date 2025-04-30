document.addEventListener('DOMContentLoaded', function() {
    // =====================================================
    // EVENT HANDLING SECTION
    // =====================================================
    
    // Key press detection
    document.addEventListener('keydown', function(event) {
        const keyDisplay = document.getElementById('key-display');
        keyDisplay.textContent = `Key pressed: ${event.key} (Code: ${event.code})`;
        keyDisplay.classList.add('pulse');
        
        // Remove animation class after animation ends
        setTimeout(() => {
            keyDisplay.classList.remove('pulse');
        }, 500);
    });
    
    // Button click events
    const colorChangeBtn = document.getElementById('color-change-btn');
    const textChangeBtn = document.getElementById('text-change-btn');
    const secretBtn = document.getElementById('secret-btn');
    
    // Color change button click event
    colorChangeBtn.addEventListener('click', function() {
        // Generate a random color
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        this.style.backgroundColor = randomColor;
    });
    
    // Text change button click event
    const buttonTexts = ['Click Me!', 'Again!', 'One More Time!', 'Keep Going!', 'Almost There!', 'You Got It!'];
    let textIndex = 0;
    
    textChangeBtn.addEventListener('click', function() {
        textIndex = (textIndex + 1) % buttonTexts.length;
        this.textContent = buttonTexts[textIndex];
    });
    
    // Secret button double-click event (bonus)
    secretBtn.addEventListener('dblclick', function() {
        this.classList.add('spin');
        this.textContent = '🎉 Secret Unlocked! 🎉';
        
        // Remove animation after it completes
        setTimeout(() => {
            this.classList.remove('spin');
        }, 1000);
    });
    
    // Hover effects are implemented using CSS, but we can add JavaScript effects too
    const hoverBox = document.querySelector('.hover-box');
    
    hoverBox.addEventListener('mouseenter', function() {
        this.textContent = 'Hover Detected!';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        this.textContent = 'Hover over me!';
    });
    
    // =====================================================
    // INTERACTIVE ELEMENTS SECTION
    // =====================================================
    
    // Image Gallery
    const thumbs = document.querySelectorAll('.thumb');
    const mainImage = document.getElementById('main-image');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image with the source of the clicked thumbnail
            mainImage.src = this.src;
            
            // Apply a subtle animation
            mainImage.classList.add('pulse');
            setTimeout(() => {
                mainImage.classList.remove('pulse');
            }, 500);
        });
    });
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show the corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on the header
            this.classList.toggle('active');
            
            // Toggle active class on the content
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });
    
    // =====================================================
    // FORM VALIDATION SECTION
    // =====================================================
    
    const form = document.getElementById('validation-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation feedback
    // Username validation
    username.addEventListener('input', function() {
        if (this.value.trim() === '') {
            setError(this, usernameError, 'Username is required');
        } else {
            setSuccess(this, usernameError, '');
        }
    });
    
    // Email validation
    email.addEventListener('input', function() {
        if (this.value.trim() === '') {
            setError(this, emailError, 'Email is required');
        } else if (!isValidEmail(this.value)) {
            setError(this, emailError, 'Please enter a valid email address');
        } else {
            setSuccess(this, emailError, '');
        }
    });
    
    // Password validation with strength indicator
    password.addEventListener('input', function() {
        const value = this.value.trim();
        
        if (value === '') {
            setError(this, passwordError, 'Password is required');
            updatePasswordStrength(0);
        } else if (value.length < 8) {
            setError(this, passwordError, 'Password must be at least 8 characters long');
            updatePasswordStrength(1);
        } else {
            const strength = calculatePasswordStrength(value);
            
            if (strength === 1) {
                setError(this, passwordError, 'Password is weak');
            } else {
                setSuccess(this, passwordError, '');
            }
            
            updatePasswordStrength(strength);
        }
        
        // Check if confirmation matches
        if (confirmPassword.value.trim() !== '') {
            validatePasswordMatch();
        }
    });
    
    // Confirm password validation
    confirmPassword.addEventListener('input', validatePasswordMatch);
    
    // Submit form validation
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        // Username validation
        if (username.value.trim() === '') {
            setError(username, usernameError, 'Username is required');
            isValid = false;
        }
        
        // Email validation
        if (email.value.trim() === '') {
            setError(email, emailError, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            setError(email, emailError, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Password validation
        if (password.value.trim() === '') {
            setError(password, passwordError, 'Password is required');
            isValid = false;
        } else if (password.value.length < 8) {
            setError(password, passwordError, 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        // Confirm password validation
        if (confirmPassword.value.trim() === '') {
            setError(confirmPassword, confirmPasswordError, 'Please confirm your password');
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            setError(confirmPassword, confirmPasswordError, 'Passwords do not match');
            isValid = false;
        }
        
        if (isValid) {
            // In a real app, we would submit the form or make an AJAX request
            alert('Form submitted successfully!');
            form.reset();
            
            // Reset validation UI
            resetValidation();
        }
    });
    
    // =====================================================
    // HELPER FUNCTIONS
    // =====================================================
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to calculate password strength
    function calculatePasswordStrength(password) {
        // This is a simple password strength calculator
        
        // Check for length
        if (password.length < 8) return 1; // Weak
        
        let strength = 0;
        
        // Check for mixed case
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        
        // Check for numbers
        if (/\d/.test(password)) strength++;
        
        // Check for special characters
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        return strength; // 0-3 (weak, medium, strong)
    }
    
    // Helper function to update password strength UI
    function updatePasswordStrength(strength) {
        // Remove all classes
        strengthBar.classList.remove('weak', 'medium', 'strong');
        
        // Set strength based on the calculated value
        if (strength === 0) {
            strengthText.textContent = 'Password strength';
        } else if (strength === 1) {
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Weak';
        } else if (strength === 2) {
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Medium';
        } else {
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Strong';
        }
    }
    
    // Helper function to validate password match
    function validatePasswordMatch() {
        if (password.value !== confirmPassword.value) {
            setError(confirmPassword, confirmPasswordError, 'Passwords do not match');
        } else {
            setSuccess(confirmPassword, confirmPasswordError, '');
        }
    }
    
    // Helper function to set error state
    function setError(input, errorElement, message) {
        input.classList.remove('valid');
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    // Helper function to set success state
    function setSuccess(input, errorElement, message) {
        input.classList.remove('error');
        input.classList.add('valid');
        errorElement.textContent = message;
    }
    
    // Helper function to reset validation UI
    function resetValidation() {
        const inputs = form.querySelectorAll('input');
        const errorMessages = form.querySelectorAll('.error-message');
        
        inputs.forEach(input => {
            input.classList.remove('error', 'valid');
        });
        
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        updatePasswordStrength(0);
    }
});