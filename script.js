
/* =========================================
   PORTFOLIO UI INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const themeBtn = document.getElementById("themeBtn");
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const sections = document.querySelectorAll("main section");

    /* =========================================
       NAVBAR SCROLL EFFECT
       ========================================= */

    let lastScroll = 0;

    function updateNavbar() {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        lastScroll = currentScroll;
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });


    /* =========================================
       ACTIVE NAVIGATION LINK
       ========================================= */

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.getAttribute("id");

                    navLinks.forEach((link) => {
                        link.classList.remove("active");

                        if (link.getAttribute("href") === `#${currentId}`) {
                            link.classList.add("active");
                        }
                    });
                }

            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* =========================================
       DARK / LIGHT MODE
       ========================================= */

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.textContent = "☀";
    } else {
        themeBtn.textContent = "☼";
    }

    themeBtn.addEventListener("click", () => {

        const isDark = document.body.classList.toggle("dark-mode");

        themeBtn.textContent = isDark ? "☀" : "☼";

        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

    });


    /* =========================================
       MOBILE MENU
       ========================================= */

    function openMenu() {

        navMenu.classList.add("active");
        menuBtn.classList.add("active");

        menuBtn.setAttribute("aria-expanded", "true");
        menuBtn.setAttribute("aria-label", "Close menu");

        document.body.classList.add("menu-open");
    }

    function closeMenu() {

        navMenu.classList.remove("active");
        menuBtn.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");

        document.body.classList.remove("menu-open");
    }

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", () => {

        if (navMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* =========================================
       CLOSE MENU WHEN LINK IS CLICKED
       ========================================= */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* =========================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ========================================= */

    document.addEventListener("click", (event) => {

        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            closeMenu();
        }

    });


    /* =========================================
       CLOSE MENU WITH ESCAPE
       ========================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =========================================
       SCROLL REVEAL ANIMATION
       ========================================= */

    const revealElements = document.querySelectorAll(
        ".about-container, " +
        ".skills-header, " +
        ".skill-item, " +
        ".projects-header, " +
        ".project-card, " +
        ".education-header, " +
        ".timeline-item, " +
        ".contact-container"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =========================================
       PREVENT BODY SCROLL WHEN MOBILE MENU OPEN
       ========================================= */

    const style = document.createElement("style");

    style.textContent = `
        @media (max-width: 768px) {
            body.menu-open {
                overflow: hidden;
            }
        }
    `;

    document.head.appendChild(style);

});

