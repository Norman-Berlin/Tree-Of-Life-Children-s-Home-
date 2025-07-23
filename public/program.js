document.addEventListener('DOMContentLoaded', function() {
    // Loader
   
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Back to top button
    document.querySelector('.back-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Children Stories Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const storyContents = document.querySelectorAll('.story-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            storyContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Photo Gallery
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImg = document.getElementById('main-gallery-img');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
            mainImg.src = thumbnail.src;
        });
    });
    
    // Volunteer Modal
    const volunteerModal = document.getElementById('volunteer-modal');
    const volunteerModalBtn = document.getElementById('volunteer-modal-btn');
    const closeModal = document.querySelector('.close-modal');
    
    volunteerModalBtn.addEventListener('click', () => {
        volunteerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', () => {
        volunteerModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === volunteerModal) {
            volunteerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateCounters();
                }
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-left, .animate-right, .animate-up, .stats').forEach(el => {
        observer.observe(el);
    });
    
    // Form Submissions
    const donationForm = document.getElementById('donationForm');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const volunteerForm = document.getElementById('volunteerForm');
    
    function handleFormSubmit(form, e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show an alert
        
        const formName = form.id.replace('Form', '');
        alert(`Thank you for your ${formName} submission! We'll get back to you soon.`);
        
        form.reset();
        
        // Close volunteer modal if applicable
        if (form === volunteerForm) {
            volunteerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (donationForm) {
        donationForm.addEventListener('submit', (e) => handleFormSubmit(donationForm, e));
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleFormSubmit(contactForm, e));
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => handleFormSubmit(newsletterForm, e));
    }
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => handleFormSubmit(volunteerForm, e));
    }
});