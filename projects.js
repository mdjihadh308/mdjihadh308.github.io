// Projects Page Specific JavaScript

// Filter Projects Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Initialize project animations
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Project Preview Modal
    const previewButtons = document.querySelectorAll('.preview-btn');
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectImage = projectCard.querySelector('img').src;
            const projectDescription = projectCard.querySelector('p').textContent;
            
            // Create modal
            createPreviewModal(projectTitle, projectImage, projectDescription);
        });
    });

    // Pagination functionality
    const pageNumbers = document.querySelectorAll('.page-number');
    pageNumbers.forEach(number => {
        number.addEventListener('click', function(e) {
            e.preventDefault();
            pageNumbers.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would typically make an AJAX request to load the page
            // For now, we'll just show an alert
            const pageNum = this.textContent;
            if (pageNum !== '...') {
                console.log(`Loading page ${pageNum}`);
            }
        });
    });
});

// Create Preview Modal
function createPreviewModal(title, image, description) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.project-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="project-modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${image}" alt="${title}">
                    </div>
                    <div class="modal-description">
                        <p>${description}</p>
                        <div class="modal-features">
                            <h4>Key Features:</h4>
                            <ul>
                                <li>Responsive Design</li>
                                <li>Modern UI/UX</li>
                                <li>Scalable Architecture</li>
                                <li>Optimized Performance</li>
                            </ul>
                        </div>
                        <div class="modal-actions">
                            <a href="#" class="btn"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                            <a href="#" class="btn-outline"><i class="fab fa-github"></i> View Source</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    const modalStyles = `
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: modalFadeIn 0.3s ease;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: var(--card-bg);
            border-radius: 12px;
            width: 90%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            z-index: 10000;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: modalSlideIn 0.3s ease;
        }
        
        @keyframes modalSlideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.5rem;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 2rem;
            cursor: pointer;
            line-height: 1;
            transition: color 0.3s ease;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-close:hover {
            color: var(--primary);
        }
        
        .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 1.5rem;
        }
        
        .modal-image img {
            width: 100%;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .modal-features h4 {
            margin: 1.5rem 0 0.5rem;
        }
        
        .modal-features ul {
            list-style: none;
            padding: 0;
        }
        
        .modal-features li {
            padding: 0.5rem 0;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .modal-features li:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--primary);
            font-weight: bold;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        @media (max-width: 768px) {
            .modal-body {
                grid-template-columns: 1fr;
            }
            
            .modal-content {
                width: 95%;
                max-height: 95vh;
            }
        }
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#modal-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'modal-styles';
        styleElement.textContent = modalStyles;
        document.head.appendChild(styleElement);
    }
    
    // Add close functionality
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.project-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Project hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 50px var(--shadow-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px var(--shadow-color)';
    });
});

// Initialize AOS for project cards
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}