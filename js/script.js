// script.js

/* ========================= */
/* SHOW PASSWORD LOGIN */
/* ========================= */

const loginPassword =
document.getElementById("loginPassword");

const toggleLogin =
document.getElementById("toggleLogin");

if(toggleLogin){

    toggleLogin.addEventListener("click", () => {

        if(loginPassword.type === "password"){

            loginPassword.type = "text";

            toggleLogin.classList.replace(
                "bx-show",
                "bx-hide"
            );

        }else{

            loginPassword.type = "password";

            toggleLogin.classList.replace(
                "bx-hide",
                "bx-show"
            );
        }

    });

}

/* ========================= */
/* SHOW PASSWORD REGISTER */
/* ========================= */

const registerPassword =
document.getElementById("registerPassword");

const toggleRegister =
document.getElementById("toggleRegister");

if(toggleRegister){

    toggleRegister.addEventListener("click", () => {

        if(registerPassword.type === "password"){

            registerPassword.type = "text";

            toggleRegister.classList.replace(
                "bx-show",
                "bx-hide"
            );

        }else{

            registerPassword.type = "password";

            toggleRegister.classList.replace(
                "bx-hide",
                "bx-show"
            );
        }

    });

}

/* ========================= */
/* PASSWORD VALIDATION */
/* ========================= */

const message =
document.getElementById("message");

if(registerPassword){

    registerPassword.addEventListener("keyup", () => {

        const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if(regex.test(registerPassword.value)){

            message.style.color = "#00ff99";

            message.innerHTML =
            "Strong Password";

        }else{

            message.style.color = "red";

            message.innerHTML =
            "Min 8 chars, uppercase, lowercase, number and symbol";
        }

    });

}

/* ========================= */
/* LOGIN ATTEMPTS */
/* ========================= */

let attempts = 0;

function login(){

    const robot =
    document.getElementById("robot");

    const attemptMessage =
    document.getElementById("attemptMessage");

    if(!robot.checked){

        alert("Please verify CAPTCHA");

        return;
    }

    attempts++;

    if(attempts >= 3){

        attemptMessage.innerHTML =
        "Account blocked for 5 minutes";

    }else{

        attemptMessage.innerHTML =
        "Incorrect password. Attempts: " + attempts;
    }

}