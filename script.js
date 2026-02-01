// Page Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.page-loader').classList.add('hidden');
    }, 1500);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effect on links
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.background = 'rgba(0, 0, 0, 0.2)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'transparent';
    });
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Observe stat items
document.querySelectorAll('.stat-item').forEach(item => {
    observer.observe(item);
});

// Counter animation for stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + (element.parentElement.querySelector('.stat-label').textContent.includes('%') ? '' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(stat => {
                animateCounter(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect on floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
    });
});

// Active navigation on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.fontWeight = '500';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.fontWeight = 'bold';
        }
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Show success message
    alert(`Thank you ${name}!\n\nYour message has been sent successfully.\nI'll respond to ${email} soon!`);
    
    // Reset form
    contactForm.reset();
});

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Chatbot Functionality
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatSend = document.getElementById('chatSend');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// Chatbot greetings
const greetings = [
    "Hi! 👋 I'm Navraj's AI assistant. How can I help you today?",
    "Hello! Welcome to Navraj's portfolio. What would you like to know?",
    "Hey there! I'm here to answer your questions about Navraj.",
    "Greetings! Ask me anything about Navraj's skills and experience!"
];

// Toggle chat window
chatToggle.addEventListener('click', () => {
    chatWindow.classList.add('active');
    // Random greeting on first open
    if (chatMessages.children.length === 1) {
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        chatMessages.children[0].textContent = randomGreeting;
    }
});

// Close chat window
chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get bot response
function getBotResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();
    
    // Greetings
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        return "Hello! I'm here to help you learn more about Navraj. What would you like to know?";
    }
    
    // Skills
    if (lowerMsg.includes('skill') || lowerMsg.includes('technology') || lowerMsg.includes('programming')) {
        return "Navraj is proficient in Python, C, JavaScript, React.js, Node.js, SAP ABAP, SQL, and modern web technologies. He also has expertise in Data Structures, Algorithms, and Data Analytics!";
    }
    
    // Experience
    if (lowerMsg.includes('experience') || lowerMsg.includes('work') || lowerMsg.includes('job')) {
        return "Navraj is President of the International Students Club, leading 50+ members. He's completed simulations with Deloitte Australia (Data Analytics) and Forage Academy (Data Labeling).";
    }
    
    // Education
    if (lowerMsg.includes('education') || lowerMsg.includes('college') || lowerMsg.includes('study')) {
        return "Navraj is pursuing B.Tech in Computer Engineering at Pimpri Chinchwad College of Engineering, expected graduation in 2026.";
    }
    
    // Projects
    if (lowerMsg.includes('project')) {
        return "Navraj has worked on several projects including a Dynamic Web Application Platform using React.js and Node.js, Algorithm Optimization projects, and Collaborative Software Development using Git and agile methodologies!";
    }
    
    // Leadership
    if (lowerMsg.includes('leadership') || lowerMsg.includes('president') || lowerMsg.includes('club')) {
        return "As President of the International Students Club, Navraj manages a $10K+ budget, orchestrates events for 300+ attendees, and achieved a 150% increase in social media engagement!";
    }
    
    // Contact
    if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone') || lowerMsg.includes('reach')) {
        return "You can reach Navraj at:\n📧 navrajkumaryadav2075@gmail.com\n📱 +91 9049747934\n💼 LinkedIn: linkedin.com/in/navraj-kumar-yadav-960600236";
    }
    
    // Location
    if (lowerMsg.includes('location') || lowerMsg.includes('where')) {
        return "Navraj is based in Pune, Maharashtra, India.";
    }
    
    // LinkedIn
    if (lowerMsg.includes('linkedin')) {
        return "You can connect with Navraj on LinkedIn: linkedin.com/in/navraj-kumar-yadav-960600236";
    }
    
    // Certifications
    if (lowerMsg.includes('certification') || lowerMsg.includes('certificate')) {
        return "Navraj has completed certifications from Deloitte Australia (Data Analytics Job Simulation) and Forage Academy (Data Labeling Job Simulation).";
    }
    
    // Thanks
    if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
        return "You're welcome! Feel free to ask me anything else about Navraj's background, skills, or projects!";
    }
    
    // Default response
    return "That's an interesting question! I can help you with information about Navraj's skills, experience, education, projects, leadership, or contact details. What would you like to know?";
}

// Send message
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Bot response with delay
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 800);
    }
}

// Send button click
chatSend.addEventListener('click', sendMessage);

// Enter key to send
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Particle effect on mouse move (subtle)
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.97) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = '#000';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.opacity = '0.3';
        particle.style.transition = 'all 1s ease';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.transform = 'translateY(30px)';
            particle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
});

// Console message for developers
console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #000;');
console.log('%cWelcome to Navraj\'s Portfolio', 'font-size: 14px; color: #000;');
console.log('%cInterested in collaboration? Contact: navrajkumaryadav2075@gmail.com', 'font-size: 12px; color: #666;');

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > 10) konamiCode.shift();
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s linear';
        
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Congratulations! You found the secret Konami code!\n\nNavraj loves creative developers like you!');
        }, 2000);
        
        konamiCode = [];
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Lazy loading for better performance
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item');
    
    const lazyLoad = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    lazyElements.forEach(el => lazyLoad.observe(el));
}

// Prevent right-click on images (optional - remove if not needed)
// document.addEventListener('contextmenu', (e) => {
//     if (e.target.tagName === 'IMG') {
//         e.preventDefault();
//     }
// });

// Log page load time
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`%cPage loaded in ${Math.round(loadTime)}ms`, 'color: #00ff00; font-weight: bold;');

});

const toggle = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const savedTheme = localStorage.getItem("theme");

/* Apply system theme or saved preference */
if (savedTheme) {
    document.body.classList.toggle("dark", savedTheme === "dark");
} else {
    document.body.classList.toggle("dark", prefersDark.matches);
}

/* Toggle manually */
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
});

/* Listen to system changes */
prefersDark.addEventListener("change", e => {
    if (!localStorage.getItem("theme")) {
        document.body.classList.toggle("dark", e.matches);
    }
});