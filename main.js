/*
=========================================
    Endeavorised Portfolio
=========================================
*/

const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav a");

/* =========================================
   MOBILE NAVIGATION
========================================= */

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuBtn.classList.toggle("active");

    if (nav.classList.contains("open")) {
        menuBtn.innerHTML = "✕";
    } else {
        menuBtn.innerHTML = "☰";
    }
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {

        nav.classList.remove("open");
        menuBtn.classList.remove("active");
        menuBtn.innerHTML = "☰";

    });
});

/* =========================================
   HEADER SHADOW
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        header.style.borderBottom = "1px solid rgba(34,211,238,.15)";
        header.style.background = "rgba(9,9,11,.90)";
    } else {
        header.style.borderBottom = "";
        header.style.background = "rgba(9,9,11,.7)";
    }

});

/* =========================================
   SCROLL REVEAL
========================================= */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }

    });

}, {
    threshold: 0.15
});

sections.forEach(section => observer.observe(section));

/* =========================================
   ACTIVE NAVIGATION
========================================= */

const activateNav = () => {

    let current = "";

    sections.forEach(section => {

        const top = window.scrollY;
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;

        if (top >= offset && top < offset + height) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

};

window.addEventListener("scroll", activateNav);

/* =========================================
   PARALLAX BACKGROUND
========================================= */

const background = document.querySelector(".background-grid");

window.addEventListener("mousemove", e => {

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    background.style.transform =
        `translate(${x * 10}px, ${y * 10}px)`;

});

/* =========================================
   FADE HERO
========================================= */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    hero.style.opacity = Math.max(1 - scroll / 600, 0);
    hero.style.transform = `translateY(${scroll * 0.15}px)`;

});

/* =========================================
   SKILL HOVER GLOW
========================================= */

document.querySelectorAll(".skills span").forEach(skill => {

    skill.addEventListener("mouseenter", () => {

        skill.style.boxShadow =
            "0 0 25px rgba(34,211,238,.25)";

    });

    skill.addEventListener("mouseleave", () => {

        skill.style.boxShadow = "";

    });

});

/* =========================================
   CARD TILT EFFECT
========================================= */

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height / 2) / 20;
        const rotateY = (x - rect.width / 2) / 20;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-6px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/* =========================================
   CURRENT YEAR
========================================= */

const footer = document.querySelector("footer p");

if (footer) {
    footer.innerHTML =
        `© ${new Date().getFullYear()} Endeavorised`;
}