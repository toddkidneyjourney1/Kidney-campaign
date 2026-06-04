// ========================================
// KIDNEY CAMPAIGN - JavaScript Functions
// ========================================

// Toast notification system
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Update progress bar with real data
function updateProgress(raised, goal = 50000) {
    const percentage = Math.min((raised / goal) * 100, 100);
    const progressFill = document.getElementById('progress-fill');
    const raisedAmount = document.getElementById('raised-amount');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (raisedAmount) {
        raisedAmount.textContent = '$' + Math.round(raised).toLocaleString();
    }
    
    // Update progress bar aria attributes
    const progressBar = document.querySelector('[role="progressbar"]');
    if (progressBar) {
        progressBar.setAttribute('aria-valuenow', Math.round(percentage));
        progressBar.setAttribute('aria-label', `Fundraising progress: $${Math.round(raised).toLocaleString()} of $${goal.toLocaleString()} dollars raised`);
    }
}

// Share functionality with improved UX
function setupShareButton() {
    const shareBtn = document.getElementById('share-btn');
    
    if (!shareBtn) return;
    
    shareBtn.addEventListener('click', async () => {
        const url = window.location.href;
        const title = 'WANTED: A KIDNEY - Help Todd Find a Living Donor';
        const text = 'Todd Lyman is seeking a living kidney donor. Every share increases the chances of finding a match. Please help spread the word!';
        
        // Check if Web Share API is supported
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: url
                });
                showToast('Thanks for sharing!');
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log('Error sharing:', err);
                    fallbackCopyToClipboard(url);
                }
            }
        } else {
            // Fallback: Copy to clipboard
            fallbackCopyToClipboard(url);
        }
    });
}

// Fallback clipboard functionality
async function fallbackCopyToClipboard(url) {
    try {
        await navigator.clipboard.writeText(url);
        showToast('✓ Link copied to clipboard! Share it on social media.');
    } catch (err) {
        console.error('Failed to copy:', err);
        // Last resort: show URL in toast
        showToast('Campaign URL: ' + url);
    }
}

// Fetch and update fundraising data from external source
async function fetchFundraisingData() {
    try {
        // Try to fetch from GoFundMe API alternative or your backend
        // This is a placeholder - can be replaced with real API
        const response = await fetch('/api/fundraising-data');
        
        if (response.ok) {
            const data = await response.json();
            updateProgress(data.raised, data.goal);
        } else {
            // Use default values
            updateProgress(0, 50000);
        }
    } catch (error) {
        console.log('Could not fetch fundraising data:', error);
        // Initialize with default values
        updateProgress(0, 50000);
    }
}

// Email validation helper
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

// Lazy load images for better performance
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Keyboard navigation enhancement for details elements
function setupDetailsKeyboardNav() {
    const detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach(details => {
        const summary = details.querySelector('summary');
        if (summary) {
            summary.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    details.open = !details.open;
                }
            });
        }
    });
}

// Initialize analytics tracking
function setupAnalytics() {
    // Track key user interactions
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        // Track button clicks
        if (target.matches('[class*="btn"]')) {
            const buttonText = target.textContent.trim();
            console.log('Button clicked:', buttonText);
            
            // Send to Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'button_click', {
                    'button_text': buttonText,
                    'timestamp': new Date().toISOString()
                });
            }
        }
        
        // Track external links
        if (target.matches('a[target="_blank"]')) {
            const href = target.href;
            console.log('External link clicked:', href);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'external_link_click', {
                    'link_url': href,
                    'link_text': target.textContent.trim()
                });
            }
        }
    });
    
    // Track time on page
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - window.pageLoadTime) / 1000);
        console.log('Time on page:', timeOnPage + 's');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_exit', {
                'time_on_page': timeOnPage
            });
        }
    });
    
    // Record page load time
    window.pageLoadTime = Date.now();
}

// Print page functionality
function setupPrintButton() {
    // Add print functionality if needed
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'p' || e.metaKey && e.key === 'p') {
            announceToScreenReader('Print dialog opened');
        }
    });
}

// Performance monitoring
function monitorPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', pageLoadTime + 'ms');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    'load_time_ms': pageLoadTime
                });
            }
        });
    }
}

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    setupShareButton();
    fetchFundraisingData();
    setupLazyLoading();
    setupDetailsKeyboardNav();
    setupAnalytics();
    setupPrintButton();
    monitorPerformance();
    
    // Accessibility announcement
    announceToScreenReader('Page loaded successfully. Todd Lyman Kidney Campaign website is ready.');
    
    console.log('Kidney Campaign website initialized successfully');
});

// Refresh progress bar every 5 minutes for real-time updates
setInterval(() => {
    fetchFundraisingData();
}, 5 * 60 * 1000);
