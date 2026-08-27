const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwWGU9zU_g5hOQtku2JeLapamUo5RoGG82q7kkXIAVsm4kkik2s__NZS4GW5gfftDpO/exec";

/* ==========================================
   MATRIMONIO ALICE & MICHELE
   script.js
========================================== */

/* ========= COUNTDOWN ========= */

const weddingDate = new Date("June 26, 2027 15:30:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {

        if (daysEl) {
            daysEl.textContent = "0";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
        }

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    if (daysEl) {

        daysEl.textContent = days;
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");

    }

}

updateCountdown();
setInterval(updateCountdown, 1000);


/* ========= COPIA IBAN ========= */

const copyBtn = document.getElementById("copyIban");

if (copyBtn) {

    copyBtn.addEventListener("click", () => {

        navigator.clipboard.writeText("IT74S0899524202000000226200");

        const msg = document.getElementById("copyMessage");

        if (msg) {

            msg.classList.add("show");

            setTimeout(() => {

                msg.classList.remove("show");

            }, 2500);

        }

    });

}


/* ========= HEADER ========= */

const header = document.querySelector(".header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.style.background = "rgba(255,255,255,.95)";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

        } else {

            header.style.background = "rgba(255,255,255,.75)";
            header.style.boxShadow = "none";

        }

    });

}


/* ========= ANIMAZIONE SCROLL ========= */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.2

});

document.querySelectorAll(
".story-card,.schedule-card,.location-card,.countdown-box,.gift-card,.faq details,.gallery-grid img"
).forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = ".8s ease";

    observer.observe(el);

});


/* ========= GALLERY ========= */

document.querySelectorAll(".gallery-grid img").forEach(img => {

    img.addEventListener("click", () => {

        const overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.left = "0";
        overlay.style.top = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,.9)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.cursor = "zoom-out";
        overlay.style.zIndex = "99999";

        const image = document.createElement("img");

        image.src = img.src;
        image.style.maxWidth = "90%";
        image.style.maxHeight = "90%";
        image.style.borderRadius = "15px";

        overlay.appendChild(image);

        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {

            overlay.remove();

        });

    });

});

/* ========= SCROLL MENU ========= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

console.log("❤️ Alice & Michele - Wedding Website Ready");


/* ========= ESIGENZE ALIMENTARI ========= */

const dieta = document.getElementById("dieta");
const campoAllergie = document.getElementById("campo-allergie");

if (dieta && campoAllergie) {

    dieta.addEventListener("change", function () {

        if (this.value === "Altre allergie o intolleranze") {

            campoAllergie.style.display = "block";

        } else {

            campoAllergie.style.display = "none";

        }

    });

}

console.log("Test URL:", SCRIPT_URL);


/* ========= FORM RSVP ========= */

const form = document.getElementById("rsvpForm");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const dati = {

            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            partecipazione: document.getElementById("partecipazione").value,
            invitati: document.getElementById("invitati").value,
            dieta: document.getElementById("dieta").value,
            allergie: document.getElementById("allergie")?.value || "",
            bambini: form.elements["bambini"].value,
            numeroBambini: form.elements["numero-bambini"].value,
            menuBambini: form.elements["menu-bambini"].value,
            messaggio: form.elements["messaggio"].value

        };

                console.log(dati);
                submitBtn.disabled = true;
submitBtn.innerHTML = "⏳ Invio in corso...";

        fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(dati)
        })

        .then(async (response) => {

            const testo = await response.text();

            console.log("Status:", response.status);
            console.log("Risposta:", testo);

            if (!response.ok) {
                throw new Error("Errore HTTP: " + response.status);
            }

            successMessage.classList.add("show");

setTimeout(() => {
    successMessage.classList.remove("show");
},3000);

form.reset();

submitBtn.disabled = false;
submitBtn.innerHTML = "Invia conferma";

            // Nasconde nuovamente il campo allergie dopo il reset
            if (campoAllergie) {
                campoAllergie.style.display = "none";
            }

        })

       .catch(error => {
    console.error("ERRORE COMPLETO:", error);
    alert(error.message);
    submitBtn.disabled = false;
submitBtn.innerHTML = "Invia conferma";
});

    });

}
