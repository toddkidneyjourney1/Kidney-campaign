// ========================================
// KIDNEY CAMPAIGN - JavaScript Functions
// ========================================

// Update progress bar (simulated)
function updateProgress(raised, goal = 50000) {
    const percentage = (raised / goal) * 100;
    const progressFill = document.getElementById('progress-fill');
    const raisedAmount = document.getElementById('raised-amount');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (raisedAmount) {
        raisedAmount.textContent = '$' + raised.toLocaleString();
    }
    
    // Update progress bar aria attributes
    const progressBar = document.querySelector('[role="progressbar"]');
    if (progressBar) {
        progressBar.setAttribute('aria-valuenow', Math.round(percentage));
    }
}

// Share functionality
function setupShareButton() {
    const shareBtn = document.getElementById('share-btn');
    
    if (!shareBtn) return;
    
    shareBtn.addEventListener('click', () => {
        const url = window.location.href;
        const title = 'WANTED: A KIDNEY - Help Todd Find a Living Donor';
        const text = 'Todd Lyman is seeking a living kidney donor. Please share and help spread the word!';
        
        // Check if Web Share API is supported
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: url
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard! Share it on social media.');
            }).catch(err => {
                console.error('Failed to copy:', err);
                // Last resort fallback
                promptShareFallback(url);
            });
        }
    });
}

// Fallback share prompt
function promptShareFallback(url) {
    const message = `Share this link:\n\n${url}`;
    alert(message);
}

// Fetch and update fundraising data from external source (if available)
async function fetchFundraisingData() {
    try {
        // Example: Fetch from GoFundMe API or your own backend
        // This is a placeholder - replace with actual API endpoint
        const response = await fetch('/api/fundraising-data');
        
        if (response.ok) {
            const data = await response.json();
            updateProgress(data.raised, data.goal);
        }
    } catch (error) {
        console.log('Could not fetch fundraising data:', error);
        // Initialize with default values
        updateProgress(0, 50000);
    }
}

// Email validation for contact forms
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', () => {
    setupShareButton();
    fetchFundraisingData();
    
    // Log initialization
    console.log('Kidney Campaign website loaded successfully');
});

// Handle accessibility announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}