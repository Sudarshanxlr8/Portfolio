// Particles Configuration
tsParticles.load("tsparticles", {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        color: {
            value: ["#4F46E5", "#3B82F6", "#6366F1", "#8B5CF6"]
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.6,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5,
                sync: false
            }
        },
        links: {
            enable: true,
            distance: 150,
            color: "#4F46E5",
            opacity: 0.4,
            width: 1,
            triangles: {
                enable: true,
                opacity: 0.05
            }
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
                default: "bounce"
            },
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "grab"
                },
                onClick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    links: {
                        opacity: 1
                    }
                },
                push: {
                    quantity: 4
                }
            }
        }
    },
    background: {
        color: "#111827"
    },
    detectRetina: true
});

// Scroll to Top Button
const scrollButton = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollButton.classList.remove("hidden");
    } else {
        scrollButton.classList.add("hidden");
    }
});

scrollButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Highlight Active Section
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").slice(1) === current) {
            link.classList.add("active");
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("3pvUYmhZR6dcLS1NP"); // Replace with your EmailJS public key
})();

// Contact Form Handler
const contactForm = document.querySelector('#contactForm');
const submitButton = contactForm.querySelector('button[type="submit"]');
const submitText = document.querySelector('#submitText');
const loadingIcon = document.querySelector('#loadingIcon');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    submitButton.disabled = true;
    submitText.textContent = 'Sending...';
    loadingIcon.classList.remove('hidden');
    
    // Prepare template parameters
    const templateParams = {
        from_name: this.name.value,
        from_email: this.email.value,
        message: this.message.value
    };

    // Send email using EmailJS
    emailjs.send(
        'service_9j2zvan', // Replace with your EmailJS service ID
        'template_e4j5pe7', // Replace with your EmailJS template ID
        templateParams
    )
    .then(function() {
        // Show success message
        submitText.textContent = 'Message Sent!';
        loadingIcon.classList.add('hidden');
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitText.textContent = 'Send Message';
            submitButton.disabled = false;
        }, 3000);
        
        // Show success notification
        showNotification('Message sent successfully!', 'success');
    })
    .catch(function(error) {
        // Show error message
        submitText.textContent = 'Send Message';
        loadingIcon.classList.add('hidden');
        submitButton.disabled = false;
        
        // Show error notification
        showNotification('Failed to send message. Please try again.', 'error');
        console.error('EmailJS Error:', error);
    });
});

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } transform transition-all duration-300 translate-y-full`;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(full)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Text Animation
function animateText() {
    const letters = document.querySelectorAll('#nameText span');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const finalName = 'SUDARSHAN';
    
    letters.forEach((letter, index) => {
        // Reset styles
        letter.style.opacity = '1';
        letter.style.color = 'white';
        
        setTimeout(() => {
            let currentLetterIndex = 0;
            const finalLetter = finalName[index];
            
            const intervalId = setInterval(() => {
                if (alphabet[currentLetterIndex] === finalLetter) {
                    letter.textContent = finalLetter;
                    letter.classList.add('animate-letter');
                    // Add gradient color when letter is final
                    letter.style.background = 'linear-gradient(45deg, #fff, #a855f7)';
                    letter.style.webkitBackgroundClip = 'text';
                    letter.style.webkitTextFillColor = 'transparent';
                    clearInterval(intervalId);
                } else {
                    letter.textContent = alphabet[currentLetterIndex];
                    currentLetterIndex = (currentLetterIndex + 1) % alphabet.length;
                }
            }, 50); // Speed of letter change
        }, index * 500); // Delay between starting each letter animation
    });
}

// Run animation initially and every 5 seconds
animateText();
setInterval(animateText, 5000); 