const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");
const siteHeader = document.querySelector("#siteHeader");
const year = document.querySelector("#year");
const form = document.querySelector("#requestForm");

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxClose = document.querySelector("#lightboxClose");
const galleryButtons = document.querySelectorAll("[data-lightbox]");

const revealElements = document.querySelectorAll("[data-reveal]");

/* Menu mobile */
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("open");
    }
  });
});

/* Header che cambia quando scorri */
function updateHeaderState() {
  if (!siteHeader) return;

  if (window.scrollY > 40) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState);

/* Anno automatico nel footer */
if (year) {
  year.textContent = new Date().getFullYear();
}

/* Animazioni leggere allo scroll */
if ("IntersectionObserver" in window && revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -70px 0px",
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

/* Lightbox galleria */
function openLightbox(imageUrl, altText) {
  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = imageUrl;
  lightboxImage.alt = altText || "Foto ingrandita";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const imageUrl = button.getAttribute("data-image");
    const img = button.querySelector("img");
    const altText = img ? img.alt : "Foto ingrandita";

    if (imageUrl) {
      openLightbox(imageUrl, altText);
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

/* Modulo WhatsApp intelligente */
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);

    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const apartment = data.get("apartment") || "";
    const arrival = data.get("arrival") || "";
    const departure = data.get("departure") || "";
    const adults = data.get("adults") || "0";
    const children = data.get("children") || "0";
    const pets = data.get("pets") || "Non specificato";
    const message = data.get("message") || "Nessuna richiesta particolare";

    const text =
      `Ciao, vorrei informazioni sugli appartamenti a Cardedu.\n\n` +
      `Nome: ${name}\n` +
      `Email: ${email}\n` +
      `Appartamento: ${apartment}\n` +
      `Arrivo: ${arrival}\n` +
      `Partenza: ${departure}\n` +
      `Adulti: ${adults}\n` +
      `Bambini: ${children}\n` +
      `Animali: ${pets}\n` +
      `Messaggio: ${message}`;

    const whatsappUrl = `https://wa.me/393406291315?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, "_blank");
  });
}
