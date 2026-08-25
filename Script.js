
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

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance <= 0){

        if(daysEl){

            daysEl.innerHTML="0";
            hoursEl.innerHTML="00";
            minutesEl.innerHTML="00";
            secondsEl.innerHTML="00";

        }

        return;

    }

    const days=Math.floor(distance/(1000*60*60*24));

    const hours=Math.floor(
        (distance%(1000*60*60*24))/(1000*60*60)
    );

    const minutes=Math.floor(
        (distance%(1000*60*60))/(1000*60)
    );

    const seconds=Math.floor(
        (distance%(1000*60))/1000
    );

    if(daysEl){

        daysEl.innerHTML=days;

        hoursEl.innerHTML=String(hours).padStart(2,"0");

        minutesEl.innerHTML=String(minutes).padStart(2,"0");

        secondsEl.innerHTML=String(seconds).padStart(2,"0");

    }

}

updateCountdown();

setInterval(updateCountdown,1000);

/* ========= COPIA IBAN ========= */

const copyBtn = document.getElementById("copyIban");

if(copyBtn){

    copyBtn.addEventListener("click", () => {

        navigator.clipboard.writeText("IT74S0899524202000000226200");

        const msg = document.getElementById("copyMessage");

        msg.classList.add("show");

        setTimeout(() => {
            msg.classList.remove("show");
        },2500);

    });

}
/* ========= HEADER ========= */

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        header.style.background="rgba(255,255,255,.95)";

        header.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

    }else{

        header.style.background="rgba(255,255,255,.75)";

        header.style.boxShadow="none";

    }

});

/* ========= ANIMAZIONE SCROLL ========= */

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity=1;

            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:.2
});

document.querySelectorAll(
".story-card,.schedule-card,.location-card,.countdown-box,.gift-card,.faq details,.gallery-grid img"
).forEach(el=>{

    el.style.opacity=0;

    el.style.transform="translateY(50px)";

    el.style.transition=".8s ease";

    observer.observe(el);

});

/* ========= GALLERY ========= */

document.querySelectorAll(".gallery-grid img").forEach(img=>{

    img.addEventListener("click",()=>{

        const overlay=document.createElement("div");

        overlay.style.position="fixed";
        overlay.style.left="0";
        overlay.style.top="0";
        overlay.style.width="100%";
        overlay.style.height="100%";
        overlay.style.background="rgba(0,0,0,.9)";
        overlay.style.display="flex";
        overlay.style.alignItems="center";
        overlay.style.justifyContent="center";
        overlay.style.cursor="zoom-out";
        overlay.style.zIndex="99999";

        const image=document.createElement("img");

        image.src=img.src;

        image.style.maxWidth="90%";

        image.style.maxHeight="90%";

        image.style.borderRadius="15px";

        overlay.appendChild(image);

        document.body.appendChild(overlay);

        overlay.addEventListener("click",()=>{

            overlay.remove();

        });

    });

});

/* ========= SCROLL MENU ========= */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({

                behavior:"smooth"

            });

    });

});

console.log("❤️ Alice & Michele - Wedding Website Ready");