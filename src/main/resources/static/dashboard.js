// API Base URL
const API_URL = 'http://localhost:8080/api';

// Check authentication on page load
const token = localStorage.getItem('jwtToken');
if (!token) {
    window.location.href = '/index.html';
}

// Load user profile
async function loadProfile() {
    try {
        const response = await fetch(`${API_URL}/users/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayProfile(data);
        } else {
            // Token invalid or expired
            logout();
        }
    } catch (error) {
        console.error('Error loading profile:', error);
        showError('Error al cargar el perfil');
    }
}

// Display profile information
function displayProfile(data) {
    const username = data.username;
    const initial = username.charAt(0).toUpperCase();
    const createdDate = new Date(data.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const profileHTML = `
        <div class="profile-header">
            <div class="profile-avatar">${initial}</div>
            <div class="profile-info">
                <h2>${data.username}</h2>
                <p>${data.email}</p>
            </div>
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">ID de Usuario</div>
                <div class="info-value">#${data.id}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Rol</div>
                <div class="info-value">${data.role}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Miembro desde</div>
                <div class="info-value">${createdDate}</div>
            </div>
        </div>
        
        <div class="actions">
            <button class="btn-secondary" onclick="window.location.reload()">
                🔄 Actualizar
            </button>
            <button class="btn-danger" onclick="logout()">
                🚪 Cerrar Sesión
            </button>
        </div>
    `;

    document.getElementById('profileContent').innerHTML = profileHTML;
}

// Logout function
function logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    window.location.href = '/index.html';
}

// Show error message
function showError(message) {
    document.getElementById('profileContent').innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <p style="color: var(--error); font-size: 1.2rem;">❌ ${message}</p>
            <button class="btn-danger" style="margin-top: 20px;" onclick="logout()">
                Volver al inicio
            </button>
        </div>
    `;
}

// Load profile on page load
loadProfile();
