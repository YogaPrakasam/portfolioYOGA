
// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Navigation Smooth Scroll
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
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



/*-----------------------------------------------------*/


