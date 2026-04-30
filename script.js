
// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Navigation Smooth Scroll
const links = document.querySelectorAll('.nav-links a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.classList.remove('active');
    
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetId === 'home' ? 0 : targetSection.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Section fade-in animation on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = '0s';
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});



const scriptURL = 'https://script.google.com/macros/s/AKfycbwF7FFsTym3Fj64nPI4LaGGNzFpPr7fDyByDq2SIZJDKlNnJ4meO2fJO3QXcjmU2cB80Q/exec'


// const form = document.forms['submit-to-google-sheet']

// form.addEventListener('submit', e => {
//   e.preventDefault()
//   fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//     .then(response => alert("Thank you! your form is submitted successfully.😊"))
//     .then(() => {window.location.reload(); })
//     .catch(error => console.error('Error!', error.message))
// })



const form = document.querySelector("form");

function sendMessageToTelegram() {
    const chatId = "5124941419";
    const botToken = "8019778607:AAHsf7KpNjjc_mhDzcvYH84raZloov6Uyvk";
    const message = `
Name: ${document.getElementById("name").value}
Email: ${document.getElementById("email").value}
Phone No: ${document.getElementById("phonenumber").value}
Subject: ${document.getElementById("subject").value}
Message: ${document.getElementById("message").value}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
            });
            form.reset();
        } else {
            Swal.fire({
                title: "Error!",
                text: "Message not sent. Try again.",
                icon: "error"
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: "Error!",
            text: "An error occurred. Please try again.",
            icon: "error"
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessageToTelegram();
});

// Certification Slider Navigation
const certArrowLeft = document.getElementById('certArrowLeft');
const certArrowRight = document.getElementById('certArrowRight');
const certificationsGrid = document.getElementById('certificationsGrid');

let currentSlide = 0;
const totalCertifications = 7;
let visibleCertifications = 3;
let maxSlide = Math.max(0, totalCertifications - visibleCertifications);

function updateSliderPosition() {
    const certItems = certificationsGrid.querySelectorAll('.certification-item');
    if (certItems.length === 0) return;
    
    const containerWidth = document.querySelector('.certifications-container').offsetWidth;
    const padding = 120; // 60px left + 60px right padding
    const visibleWidth = containerWidth - padding;
    
    const firstItemWidth = certItems[0].offsetWidth;
    const gap = 32; // 2rem gap in pixels
    const slideDistance = (firstItemWidth + gap) * currentSlide;
    
    certificationsGrid.style.transform = `translateX(-${slideDistance}px)`;
    
    // Update arrow states
    certArrowLeft.style.opacity = currentSlide === 0 ? '0.5' : '1';
    certArrowLeft.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
    
    certArrowRight.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';
    certArrowRight.style.cursor = currentSlide >= maxSlide ? 'not-allowed' : 'pointer';
}

certArrowLeft.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSliderPosition();
    }
});

certArrowRight.addEventListener('click', () => {
    if (currentSlide < maxSlide) {
        currentSlide++;
        updateSliderPosition();
    }
});

// Initialize slider position after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        updateSliderPosition();
        adjustVisibleCertifications();
    }, 100);
});

// Responsive: adjust visible certifications based on screen width
function adjustVisibleCertifications() {
    const container = document.querySelector('.certifications-container');
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const padding = 120; // 60px left + 60px right padding
    const visibleWidth = containerWidth - padding;
    
    const certItems = certificationsGrid.querySelectorAll('.certification-item');
    if (certItems.length === 0) return;
    
    const firstItemWidth = certItems[0].offsetWidth;
    const gap = 32; // 2rem gap in pixels
    const itemWithGap = firstItemWidth + gap;
    
    const calculatedVisible = Math.floor(visibleWidth / itemWithGap);
    let newVisible = Math.max(1, Math.min(3, calculatedVisible));
    
    if (newVisible !== visibleCertifications) {
        visibleCertifications = newVisible;
        maxSlide = Math.max(0, totalCertifications - visibleCertifications);
        currentSlide = Math.min(currentSlide, maxSlide); // Ensure current slide is within bounds
        setTimeout(() => updateSliderPosition(), 50);
    }
}

window.addEventListener('resize', adjustVisibleCertifications);

/*-----------------------------------------------------*/


