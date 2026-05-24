/* ========================= */
/* SHOW PASSWORD */
/* ========================= */

const loginPassword = document.getElementById("loginPassword");
const toggleLogin = document.getElementById("toggleLogin");

if (toggleLogin && loginPassword) {
    toggleLogin.addEventListener("click", () => {
        if (loginPassword.type === "password") {
            loginPassword.type = "text";
            toggleLogin.classList.replace("bx-show", "bx-hide");
        } else {
            loginPassword.type = "password";
            toggleLogin.classList.replace("bx-hide", "bx-show");
        }
    });
}

/* ========================= */
/* LOGIN */
/* ========================= */

function login() {

    const email = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPassword").value;
    const robot = document.getElementById("robot");

    const attemptMessage = document.getElementById("attemptMessage");
    const timerMessage = document.getElementById("timerMessage");

    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    let attempts = Number(localStorage.getItem("attempts")) || 0;
    let blockTime = Number(localStorage.getItem("blockTime")) || 0;

    const now = Date.now();

    /* BLOQUEO */
    if (blockTime && now < blockTime) {
        startCountdown(blockTime);
        attemptMessage.textContent = "⛔ Cuenta bloqueada";
        attemptMessage.style.color = "red";
        return;
    }

    /* ROBOT */
    if (robot && !robot.checked) {
        attemptMessage.textContent = "Debes confirmar que no eres robot";
        attemptMessage.style.color = "red";
        return;
    }

    /* LOGIN CORRECTO */
    if (email === savedEmail && password === savedPassword) {

        localStorage.removeItem("attempts");
        localStorage.removeItem("blockTime");

        attemptMessage.textContent = "✔ Acceso correcto";
        attemptMessage.style.color = "green";

        const modal = document.getElementById("welcomeModal");
        modal.style.display = "flex";

        return;
    }

    /* ERROR */
    attempts++;
    localStorage.setItem("attempts", attempts);

    const remaining = 3 - attempts;

    if (attempts >= 3) {

        const block = now + 5 * 60 * 1000;
        localStorage.setItem("blockTime", block);

        startCountdown(block);

        attemptMessage.textContent = "⛔ Cuenta bloqueada por 5 minutos";
        attemptMessage.style.color = "red";

        return;
    }

    attemptMessage.textContent = `❌ Incorrecto. Intentos restantes: ${remaining}`;
    attemptMessage.style.color = "red";
}

/* ========================= */
/* TIMER */
/* ========================= */

function startCountdown(blockTime) {

    const timerMessage = document.getElementById("timerMessage");

    const interval = setInterval(() => {

        const now = Date.now();
        const remaining = blockTime - now;

        if (remaining <= 0) {
            clearInterval(interval);
            localStorage.removeItem("blockTime");
            timerMessage.textContent = "🔓 Desbloqueado";
            timerMessage.style.color = "green";
            return;
        }

        const m = Math.floor(remaining / 60000);
        const s = Math.floor((remaining % 60000) / 1000);

        timerMessage.textContent = `⏳ ${m}m ${s}s`;
        timerMessage.style.color = "orange";

    }, 1000);
}

/* ========================= */
/* MODAL CLOSE */
/* ========================= */

function closeModal() {
    document.getElementById("welcomeModal").style.display = "none";
}