// =========================
// IMAGE LIGHTBOX
// =========================

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");

let previousFocus = null;


// =========================
// CHECK THAT LIGHTBOX EXISTS
// =========================

if (
    lightbox &&
    lightboxImage &&
    lightboxCaption &&
    closeButton
) {

    // =========================
    // OPEN IMAGE PREVIEW
    // =========================

    document.querySelectorAll(".image-trigger, .project-image").forEach(trigger => {

        trigger.addEventListener("click", () => {

            previousFocus = document.activeElement;

            lightboxImage.src =
                trigger.dataset.image || trigger.src;

            lightboxImage.alt =
                trigger.dataset.caption || trigger.alt || "Image preview";

            lightboxCaption.textContent =
                trigger.dataset.caption || trigger.alt || "";

            lightbox.classList.add("active");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "lightbox-open"
            );

            closeButton.focus();

        });

    });


    // =========================
    // CLOSE LIGHTBOX
    // =========================

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "lightbox-open"
        );

        lightboxImage.removeAttribute("src");

        lightboxCaption.textContent = "";

        if (previousFocus) {
            previousFocus.focus();
        }

    }


    // =========================
    // CLOSE USING X
    // =========================

    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    // =========================
    // CLOSE OUTSIDE IMAGE
    // =========================

    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        }
    );


    // =========================
    // KEYBOARD CONTROLS
    // =========================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains("active")
            ) {
                closeLightbox();
            }

            if (
                event.key === "Tab" &&
                lightbox.classList.contains("active")
            ) {

                event.preventDefault();

                closeButton.focus();

            }

        }
    );

}
// =========================
// MOBILE NAVIGATION
// =========================

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    // Close menu after selecting a link
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });

    });

}