
// REPEATED SCROLL ANIMATIONS
const animatedElements = document.querySelectorAll(
".about-content, .about-img, .card, .skill-card, .project-card, .experience-card"
);

// Initial state
animatedElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(80px)";
    el.style.transition = "all 0.8s ease";
});

function animateOnScroll() {

    animatedElements.forEach(el => {

        const elementTop = el.getBoundingClientRect().top;
        const elementBottom = el.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Element visible
        if (elementTop < windowHeight - 100 && elementBottom > 100) {

            el.style.opacity = "1";
            el.style.transform = "translateY(0)";

        } else {

            // Reset when out of view
            el.style.opacity = "0";
            el.style.transform = "translateY(80px)";
        }

    });
}

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// HERO TYPING EFFECT

const heroTitle = document.querySelector(".hero h1");

if(heroTitle){

    const text = heroTitle.innerText;
    heroTitle.innerText = "";

    let i = 0;

    function typeWriter(){

        if(i < text.length){

            heroTitle.innerHTML += text.charAt(i);
            i++;

            setTimeout(typeWriter, 80);
        }
    }

    typeWriter();
}



// FLOATING PROFILE IMAGE

const profile = document.querySelector(".profile-img");

if(profile){

    let position = 0;
    let direction = 1;

    setInterval(() => {

        position += direction * 0.4;

        if(position > 15) direction = -1;
        if(position < 0) direction = 1;

        profile.style.transform =
        `translateY(-${position}px)`;

    }, 30);
}

// SKILL ICON ANIMATION
document.querySelectorAll(".skill-card i").forEach(icon => {

    icon.addEventListener("mouseenter", () => {

        icon.animate([
            {transform:"scale(1)"},
            {transform:"scale(1.4) rotate(15deg)"},
            {transform:"scale(1.1)"}
        ],{
            duration:500
        });

    });

});

// CARD HOVER EFFECT

document.querySelectorAll(
".skill-card, .project-card, .experience-card, .card"
).forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = "0.4s";
        card.style.transform += " scale(1.03)";
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        card.style.transform.replace(" scale(1.03)", "");
    });

});


// 3D PROJECT CARD EFFECT

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 2) / 20;
        const rotateX = -(y - rect.height / 2) / 20;

        card.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });

});



// SOCIAL ICON HOVER
document.querySelectorAll(".social-icons img").forEach(icon => {

    icon.addEventListener("mouseenter", () => {

        icon.style.transform =
        "scale(1.2) rotate(10deg)";

    });

    icon.addEventListener("mouseleave", () => {

        icon.style.transform = "scale(1)";
    });

});



// NAVBAR ACTIVE LINK
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if(window.scrollY >= sectionTop){
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        if(link.getAttribute("href") === "#" + current){

            link.style.color = "#00cfff";
            link.style.fontWeight = "700";

        }else{

            link.style.color = "";
            link.style.fontWeight = "";
        }

    });

});
//form submission

const form = document.getElementById("form");
const result = document.getElementById("result");
const submitBtn = form.querySelector("button");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    // Your Web3Forms Access Key
    formData.append(
        "access_key",
        "36b41a65-0bdf-46e8-93ee-cf2d81bd59d9"
    );

    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    try {
        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (data.success) {
            result.innerHTML =
                '<div class="alert alert-success">Message sent successfully!</div>';

            form.reset();
        } else {
            result.innerHTML =
                `<div class="alert alert-danger">${data.message}</div>`;
        }
    } catch (error) {
        result.innerHTML =
            '<div class="alert alert-danger">Failed to send message.</div>';
    }

    submitBtn.disabled = false;
    submitBtn.innerText = "Send Message";
});