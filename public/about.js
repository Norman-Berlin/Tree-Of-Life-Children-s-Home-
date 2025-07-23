      // Scroll to section
      function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    // Animate team members on scroll
    const teamMembers = document.querySelectorAll('.team-member');
    
    function checkTeamMembers() {
        teamMembers.forEach((member, index) => {
            const memberPosition = member.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (memberPosition < screenPosition) {
                setTimeout(() => {
                    member.classList.add('show');
                }, index * 200);
            }
        });
    }

    // Animate stats on scroll
    const statItems = document.querySelectorAll('.stat-item');
    let statsAnimated = false;
    
    function checkStats() {
        const statsPosition = document.querySelector('.stats').getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (statsPosition < screenPosition && !statsAnimated) {
            statItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 300);
            });
            
            animateStats();
            statsAnimated = true;
        }
    }

    // Animate counting numbers
    function animateStats() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Testimonial slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('show'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentTestimonial = index;
        testimonials[currentTestimonial].classList.add('show');
        dots[currentTestimonial].classList.add('active');
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);


    // Check elements on page load and scroll
    window.addEventListener('load', () => {
        checkTeamMembers();
        checkStats();
    });
    
    window.addEventListener('scroll', () => {
        checkTeamMembers();
        checkStats();
    });

    console.log('Form submit event triggered');
    document.getElementById('contactForm').addEventListener('submit', async function(e) {
        e.preventDefault(); // This is crucial
        
        const form = e.target;
        const messageElement = document.getElementById('form-message');
        
        try {
            messageElement.textContent = 'Sending message...';
            messageElement.style.display = 'block';
            messageElement.className = 'form-message sending';
            
            const response = await fetch('http://localhost:3030/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.name.value,
                    email: form.email.value,
                    subject: form.subject.value,
                    message: form.message.value
                })
            });
    
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }
    
            messageElement.textContent = 'Message sent successfully!';
            messageElement.className = 'form-message success';
            form.reset();
            
        } catch (error) {
            console.error('Error:', error);
            messageElement.textContent = 'Error: ' + error.message;
            messageElement.className = 'form-message error';
        }
    });

