// API Base URL
const API_URL = 'http://localhost:8080/api';

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(targetTab).classList.add('active');
        
        // Clear error messages
        clearErrors();
    });
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Clear previous errors
    clearErrors();
    
    // Add loading state
    submitBtn.classList.add('loading');
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token in localStorage
            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            
            // Redirect to dashboard
            window.location.href = '/dashboard.html';
        } else {
            showError('loginError', data.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        showError('loginError', 'Error de conexión. Verifica que el servidor esté ejecutándose.');
    } finally {
        submitBtn.classList.remove('loading');
    }
});

// Register Form Handler
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Basic validation
    if (password.length < 6) {
        showError('registerError', 'La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    // Clear previous errors
    clearErrors();
    
    // Add loading state
    submitBtn.classList.add('loading');
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token in localStorage
            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            
            // Redirect to dashboard
            window.location.href = '/dashboard.html';
        } else {
            showError('registerError', data.message || 'Error al registrarse');
        }
    } catch (error) {
        showError('registerError', 'Error de conexión. Verifica que el servidor esté ejecutándose.');
    } finally {
        submitBtn.classList.remove('loading');
    }
});

// Helper Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
}

// Check if user is already logged in
if (localStorage.getItem('jwtToken')) {
    window.location.href = '/dashboard.html';
}
