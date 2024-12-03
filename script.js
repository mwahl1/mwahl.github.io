// Initialize AOS
AOS.init({
    duration: 1000, // Animation duration
    once: false,     // Whether animation should happen only once
});

// Fetch GitHub Repositories
const username = 'YOUR_USERNAME'; // Replace with your GitHub username
const reposContainer = document.getElementById('repos');

fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
    .then(response => response.json())
    .then(data => {
        data.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.classList.add('repo');
            repoDiv.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description provided.'}</p>
                <p>⭐ ${repo.stargazers_count} | Forks: ${repo.forks_count}</p>
            `;
            reposContainer.appendChild(repoDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching repositories:', error);
        reposContainer.innerHTML = '<p>Unable to load repositories at this time.</p>';
    });

// Handle Contact Form Submission with EmailJS
const contactForm = document.getElementById('contact-form');
const formMessages = document.getElementById('form-messages');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    // Basic validation
    if (!name || !email || !message) {
        formMessages.innerHTML = '<p class="error">Please fill in all fields.</p>';
        return;
    }

    // Send email using EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        formMessages.innerHTML = '<p class="success">Thank you! Your message has been sent.</p>';
        contactForm.reset();
    }, function(error) {
        console.log('FAILED...', error);
        formMessages.innerHTML = '<p class="error">Something went wrong. Please try again later.</p>';
    });
});

// Handle Navigation Bar Style on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Update Progress Bar
    const progressBar = document.getElementById('progress-bar');
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const offsetTop = targetSection.offsetTop - 60; // Adjust for fixed nav height

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

// Update Progress Bar on Scroll
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progress-bar');
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});
