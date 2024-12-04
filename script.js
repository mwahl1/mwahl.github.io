// Initialize AOS with enhanced settings
AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: false,    // Allow animations to happen multiple times
    offset: 120,    // Offset (in px) from the original trigger point
    easing: 'ease', // Default easing for AOS animations
    mirror: false,  // Whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // Defines which position of the element regarding to window should trigger the animation
});

// GitHub Username
const username = 'mwahl1'; 
const reposContainer = document.getElementById('repos');

// Verify that the repos container exists
if (!reposContainer) {
    console.error("Repos container not found. Ensure there is a <div id='repos'> in your HTML.");
}

// Fetch GitHub Repositories
fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
    headers: {
        'Accept': 'application/vnd.github.mercy-preview+json' // Needed to fetch topics
    }
})
    .then(response => {
        console.log('Fetch response status:', response.status);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Repositories fetched:', data);
        if (data.length === 0) {
            reposContainer.innerHTML = '<p>No repositories found.</p>';
            return;
        }
        data.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.classList.add('repo');
            repoDiv.setAttribute('data-aos', 'fade-up'); // Add AOS attribute

            repoDiv.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description provided.'}</p>
                <p>⭐ ${repo.stargazers_count} | Forks: ${repo.forks_count} | 🛠️ ${repo.language || 'N/A'}</p>
                ${repo.homepage ? `<p><a href="${repo.homepage}" target="_blank">Live Demo</a></p>` : ''}
                <div class="repo-topics">
                    ${repo.topics ? repo.topics.map(topic => `<span class="topic-badge">${topic}</span>`).join('') : ''}
                </div>
            `;
            reposContainer.appendChild(repoDiv);
        });
        AOS.refresh(); // Refresh AOS to recognize new elements
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
    emailjs.send("service_e3l4axz", "template_96ng71h", { // Replace with your Service ID and Template ID
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
        if (!targetSection) {
            console.error(`Target section with id "${targetId}" not found.`);
            return;
        }
        const offsetTop = targetSection.offsetTop - 60; // Adjust for fixed nav height

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});
