// ============================================================
// TODD'S KIDNEY JOURNEY — JavaScript v2.0
// Full Engagement Redesign
// ============================================================

// ===== 1. NAVIGATION =====

function setupNavigation() {
    const toggle = document.getElementById('nav-toggle');
    const menu   = document.getElementById('nav-menu');
    const nav    = document.getElementById('site-nav');

    if (!toggle || !menu) return;

    // Toggle mobile menu open/closed
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu when a nav link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (nav && !nav.contains(e.target)) {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Highlight active nav link based on scroll position
    setupActiveNavHighlight();
}

function setupActiveNavHighlight() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${entry.target.id}`
                    );
                });
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(s => observer.observe(s));
}

// ===== 2. SCROLL-REVEAL ANIMATIONS =====

function setupScrollReveal() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    // Immediately reveal everything if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // animate only once
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// ===== 3. ANIMATED STAT COUNTERS =====

function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix   || '';
    const prefix   = el.dataset.prefix   || '';
    const duration = 2000; // ms
    const steps    = 60;

    // Skip animation if motion is reduced
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        return;
    }

    let step = 0;
    const timer = setInterval(() => {
        step++;
        // Cubic ease-out for a natural deceleration feel
        const current = Math.round(target * (1 - Math.pow(1 - step / steps, 3)));
        el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

        if (step >= steps) {
            clearInterval(timer);
            el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        }
    }, duration / steps);
}

function setupCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ===== 4. FAQ ACCORDION =====

function setupFaqAccordion() {
    const triggers = document.querySelectorAll('.faq-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const answerId   = trigger.getAttribute('aria-controls');
            const answer     = document.getElementById(answerId);
            if (!answer) return;

            // Close all other FAQ items
            triggers.forEach(other => {
                if (other === trigger) return;
                const otherId     = other.getAttribute('aria-controls');
                const otherAnswer = document.getElementById(otherId);
                other.setAttribute('aria-expanded', 'false');
                if (otherAnswer) otherAnswer.hidden = true;
            });

            // Toggle clicked item
            trigger.setAttribute('aria-expanded', String(!isExpanded));
            answer.hidden = isExpanded;
        });
    });
}

// ===== 5. SHARE BUTTONS =====

function setupShareButtons() {
    // Wire all share buttons (hero, story section, help section)
    ['share-btn', 'share-btn-story', 'share-btn-help'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', handleShare);
    });
}

async function handleShare() {
    // Use the current page URL so this works correctly in any environment
    // (local dev, staging, or production GitHub Pages).
    const url   = window.location.origin + window.location.pathname;
    const title = 'Help Todd Find a Kidney | A New Chapter';
    const text  = 'Todd Lyman is seeking a living kidney donor. One person can change everything. Please help spread the word!';

    // Use native Web Share API on supported devices (e.g. mobile)
    if (navigator.share) {
        try {
            await navigator.share({ title, text, url });
            showToast('Thanks for sharing! 🙏');
        } catch (err) {
            if (err.name !== 'AbortError') {
                await fallbackCopyToClipboard(url);
            }
        }
    } else {
        await fallbackCopyToClipboard(url);
    }
}

async function fallbackCopyToClipboard(url) {
    try {
        await navigator.clipboard.writeText(url);
        showToast('✓ Campaign link copied! Share it on social media.');
    } catch {
        showToast('Campaign URL: ' + url, 8000);
    }
}

// ===== 6. TOAST NOTIFICATION =====

let toastTimer = null;

function showToast(message, duration = 4000) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ===== 7. PROGRESS BAR =====

function updateProgress(raised = 225, goal = 5000) {
    const percentage    = Math.min((raised / goal) * 100, 100);
    const progressFill  = document.getElementById('progress-fill');
    const raisedAmount  = document.getElementById('raised-amount');
    const progressBar   = document.querySelector('[role="progressbar"]');

    if (progressFill) {
        // Defer to next frame so the CSS transition fires correctly
        requestAnimationFrame(() => {
            progressFill.style.width = `${percentage}%`;
        });
    }

    if (raisedAmount) {
        raisedAmount.textContent = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(raised);
    }

    if (progressBar) {
        progressBar.setAttribute('aria-valuenow', Math.round(percentage));
        progressBar.setAttribute('aria-label',
            `Fundraising progress: ${raised} of ${goal} dollars raised`);
    }
}

// ===== 8. KIDNEY FACTS =====
// Facts are defined inline here since this is a no-build static site.
// To update facts, simply edit this array.
const kidneyFacts = [
    "You keep your old kidneys: In most cases, surgeons leave your original kidneys right where they are and place the new third kidney in the lower abdomen.",
    "The 'Paired Exchange' chain reaction: Mismatched donor and recipient pairs can join a pool to swap kidneys, creating a domino effect that can save dozens of lives.",
    "While dialysis performs about 10–15% of the work of a healthy kidney, a transplanted kidney restores about 50–85% of normal function.",
    "The first successful human organ transplant was a kidney transplant, performed in Boston in 1954 between identical twins.",
    "Dr. Joseph Murray won the Nobel Prize in Medicine in 1990 for his groundbreaking work on the first successful transplant.",
    "Living donors have the same life expectancy as the general population — the remaining kidney grows to handle the full workload.",
    "Blood type is no longer a hard barrier: modern desensitization and paired-exchange programs mean different blood types can still lead to a match.",
    "The oldest known living kidney donor was 84 years old when she successfully donated to her grandson.",
    "The moment new blood vessels are connected during surgery, the transplanted kidney often turns pink and begins working immediately.",
    "Each kidney contains about 1 million filtering units. Stretched end-to-end, they would span over 40 miles!"
];

function setupKidneyFacts() {
    const factBtn     = document.getElementById('fact-btn');
    const factDisplay = document.getElementById('fact-display');

    if (!factBtn || !factDisplay) return;

    let lastIndex = -1;

    factBtn.addEventListener('click', () => {
        // Pick a random fact (avoid immediate repeat)
        let idx;
        do {
            idx = Math.floor(Math.random() * kidneyFacts.length);
        } while (idx === lastIndex && kidneyFacts.length > 1);

        lastIndex = idx;

        // Fade out, swap text, fade in
        factDisplay.style.opacity = '0';
        setTimeout(() => {
            factDisplay.textContent = kidneyFacts[idx];
            factDisplay.style.opacity = '1';
        }, 200);
    });
}

// ===== 9. LAZY LOADING (supplemental) =====

function setupLazyLoading() {
    // Handles any img with data-src for manual lazy loading
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== 10. ACCESSIBILITY HELPER =====

function announceToScreenReader(message) {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.textContent = message;
    Object.assign(el.style, {
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

// ===== 11. ANALYTICS =====

function setupAnalytics() {
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[class*="btn"], a[target="_blank"]');
        if (!target || typeof gtag === 'undefined') return;

        if (target.tagName === 'A') {
            gtag('event', 'external_link_click', {
                link_url:  target.href,
                link_text: target.textContent.trim()
            });
        } else {
            gtag('event', 'button_click', {
                button_text: target.textContent.trim()
            });
        }
    });
}

// ===== 12. PERFORMANCE MONITORING =====

function monitorPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const t        = window.performance.timing;
            const loadTime = t.loadEventEnd - t.navigationStart;
            if (loadTime > 0 && typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', { load_time_ms: loadTime });
            }
        });
    }
}

// ===== INITIALISATION =====

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupScrollReveal();
    setupCounters();
    setupFaqAccordion();
    setupShareButtons();
    setupKidneyFacts();
    setupLazyLoading();
    setupAnalytics();
    monitorPerformance();

    // Animate progress bar on load
    updateProgress(225, 5000);

    announceToScreenReader('Page loaded. Todd Lyman Kidney Campaign.');
    console.log('Kidney Campaign v2.0 initialized');
});

