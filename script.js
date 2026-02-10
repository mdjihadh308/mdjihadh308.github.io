// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon?.classList.remove('fa-moon');
    themeIcon?.classList.add('fa-sun');
} else {
    // Default to dark theme
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon?.classList.remove('fa-moon');
    themeIcon?.classList.add('fa-sun');
}

themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        menuToggle?.querySelector('i').classList.add('fa-bars');
        menuToggle?.querySelector('i').classList.remove('fa-times');
    });
});

// Header Shrink on Scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header?.classList.add('shrink');
    } else {
        header?.classList.remove('shrink');
    }
});

// Typed Effect
const typedTextSpan = document.querySelector('.typed-text');
if (typedTextSpan) {
    const texts = ['Python Developer', 'AI Enthusiast', 'Web Developer'];
    let textIndex = 0, charIndex = 0, isDeleting = false;
    
    function type() {
        const current = texts[textIndex];
        if (!isDeleting) {
            typedTextSpan.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, 1600);
                return;
            }
        } else {
            typedTextSpan.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
        setTimeout(type, isDeleting ? 80 : 150);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
        
        // Close other open FAQs
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Reset errors
        document.querySelectorAll('.form-error').forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
        
        let isValid = true;
        
        // Validate name
        if (!name.value.trim()) {
            showError('nameError', 'Name is required');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate subject
        if (!subject.value.trim()) {
            showError('subjectError', 'Subject is required');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.value.length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If valid, submit form (simulated)
        if (isValid) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#10b981';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
                
                // Show success message (you could use a toast notification here)
                alert('Thank you for your message! I\'ll get back to you soon.');
            }, 1500);
        }
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// AOS Animation Initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 80
    });
}

// VanillaTilt Initialization for Project Cards
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
        max: 8,
        speed: 400,
        glare: true,
        'max-glare': 0.08,
        scale: 1.02
    });
}

// Particle Background (Optional - only on home page)
if (typeof tsParticles !== 'undefined' && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    tsParticles.load('tsparticles', {
        fpsLimit: 60,
        particles: {
            number: { value: 12, density: { enable: true, value_area: 800 } },
            color: { value: ['#6c63ff', '#8dd3ff', '#ffd6e0'] },
            shape: { type: 'circle' },
            opacity: { value: 0.09, random: false },
            size: { value: 3, random: { enable: true, min: 1, max: 5 } },
            move: { enable: true, speed: 0.6, direction: 'none', random: true, outModes: 'out' }
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: 'grab' },
                onClick: { enable: false }
            }
        },
        detectRetina: true
    });
}

// Scroll Progress Indicator
const progressBar = document.getElementById('progressBar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Animate skills on scroll
const skills = document.querySelectorAll('.skill');
if (skills.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    skills.forEach(skill => {
        skill.style.opacity = 0;
        skill.style.transform = 'translateY(20px)';
        skill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(skill);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only process internal anchor links
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add active class to current page in navigation
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});